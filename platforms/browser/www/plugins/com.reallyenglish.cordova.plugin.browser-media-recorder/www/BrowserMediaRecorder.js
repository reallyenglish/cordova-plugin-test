cordova.define("com.reallyenglish.cordova.plugin.browser-media-recorder.BrowserMediaRecorder", function(require, exports, module) { var argscheck = require('cordova/argscheck'),
    utils = require('cordova/utils'),
    exec = require('cordova/exec');

var mediaObjects = {};

/**
 * This class provides access to the device media, interfaces to both sound and video
 *
 * @constructor
 * @param successCallback       The callback to be called when the file is done playing or recording.
 *                                  successCallback()
 * @param errorCallback         The callback to be called if there is an error.
 *                                  errorCallback(int errorCode) - OPTIONAL
 */
var MediaRecorder = function(successCallback, errorCallback) {
    argscheck.checkArgs('FF', 'MediaRecorder', arguments);
    this.id = utils.createUUID();
    mediaObjects[this.id] = this;
    this.successCallback = successCallback;
    this.errorCallback = errorCallback;
    exec(null, this.errorCallback, "BrowserMediaRecorder", "create", [this.id, this.src]);
};

// "static" function to return existing objs.
MediaRecorder.get = function(id) {
    return mediaObjects[id];
};

/**
 * Start recording.
 */
MediaRecorder.prototype.startRecord = function() {
    exec(null, this.errorCallback, "BrowserMediaRecorder", "startRecordingAudio", [this.id]);
};

/**
 * Stop recording.
 */
MediaRecorder.prototype.stopRecord = function() {
    exec(null, this.errorCallback, "BrowserMediaRecorder", "stopRecordingAudio", [this.id]);
};

/**
 * Play recording.
 */
MediaRecorder.prototype.playRecord = function() {
    exec(null, this.errorCallback, "BrowserMediaRecorder", "playRecordingAudio", [this.id]);
};

/**
 * Release the resources.
 */
MediaRecorder.prototype.release = function() {
    exec(null, this.errorCallback, "BrowserMediaRecorder", "release", [this.id]);
};

module.exports = MediaRecorder;

});
