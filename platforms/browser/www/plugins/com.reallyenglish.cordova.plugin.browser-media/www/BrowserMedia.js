cordova.define("com.reallyenglish.cordova.plugin.browser-media.BrowserMedia", function(require, exports, module) { var argscheck = require('cordova/argscheck'),
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
var Media = function(src, successCallback, errorCallback, statusCallback) {
    argscheck.checkArgs('SFFF', 'BrowserMedia', arguments);
    this.id = utils.createUUID();
    mediaObjects[this.id] = this;
    this.src = src;
    this.successCallback = successCallback;
    this.errorCallback = errorCallback;
    this.statusCallback = statusCallback;
    this._duration = -1;
    this._position = -1;
    exec(null, this.errorCallback, "BrowserMedia", "create", [this.id, this.src]);
};

// "static" function to return existing objs.
Media.get = function(id) {
    return mediaObjects[id];
};

/**
 * Start recording.
 */
Media.prototype.startRecord = function() {
    exec(null, this.errorCallback, "BrowserMedia", "startRecordingAudio", [this.id]);
};

/**
 * Stop recording.
 */
Media.prototype.stopRecord = function() {
    exec(null, this.errorCallback, "BrowserMedia", "stopRecordingAudio", [this.id]);
};

/**
 * Play recording.
 */
Media.prototype.playRecord = function() {
    exec(null, this.errorCallback, "BrowserMedia", "playRecordingAudio", [this.id]);
};

/**
 * Release the resources.
 */
Media.prototype.release = function() {
    exec(null, this.errorCallback, "BrowserMedia", "release", [this.id]);
};

module.exports = Media;

});
