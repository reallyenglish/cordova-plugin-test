cordova.define("com.reallyenglish.cordova.plugin.browser-media.MediaProxy", function(require, exports, module) { /*global Windows:true */

var cordova = require('cordova'),
    BrowserMedia = require('com.reallyenglish.cordova.plugin.browser-media.BrowserMedia');
    MRecorder = require('com.reallyenglish.cordova.plugin.browser-media.MediaRecorder');

var Recorder = {

    // Initiates the audio file
    create:function(win, lose, args) {
        var id = args[0];
        var thisM = BrowserMediaRecorder.get(id);
        thisM.recorder = MRecorder.getInstance({swfSrc: 'scripts/recorder.swf'});
    },

    // Start recording audio
    startRecordingAudio:function(win, lose, args) {
        var id = args[0];
        var thisM = BrowserMediaRecorder.get(id);
        thisM.recorder.record();
    },

    // Stop recording audio
    stopRecordingAudio:function(win, lose, args) {
        var id = args[0];
        var thisM = BrowserMediaRecorder.get(id);
        thisM.recorder.stop();
    },

    // play back recording audio
    playRecordingAudio:function(win, lose, args) {
        var id = args[0];
        var thisM = BrowserMediaRecorder.get(id);
        thisM.recorder.play();
    },

    // Release the media object
    release:function(win, lose, args) {
        var id = args[0];
        var thisM = BrowserMediaRecorder.get(id);
        try {
            delete thisM.recorder;
        } catch (err) {
            lose("Failed to release: "+err);
        }
    }
};

module.exports = Recorder;
require("cordova/exec/proxy").add("BrowserMedia",module.exports);

});
