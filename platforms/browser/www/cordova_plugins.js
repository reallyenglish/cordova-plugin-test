cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/org.apache.cordova.test-framework/www/tests.js",
        "id": "org.apache.cordova.test-framework.cdvtests"
    },
    {
        "file": "plugins/org.apache.cordova.test-framework/www/jasmine_helpers.js",
        "id": "org.apache.cordova.test-framework.jasmine_helpers"
    },
    {
        "file": "plugins/org.apache.cordova.test-framework/www/medic.js",
        "id": "org.apache.cordova.test-framework.medic"
    },
    {
        "file": "plugins/org.apache.cordova.test-framework/www/main.js",
        "id": "org.apache.cordova.test-framework.main"
    },
    {
        "file": "plugins/com.reallyenglish.cordova.plugin.browser-media-recorder/www/lib/media-recorder.js",
        "id": "com.reallyenglish.cordova.plugin.browser-media-recorder.MediaRecorder",
        "clobbers": [
            "window.com.reallyenglish.cordova.plugin.browsermediarecorder.lib.MediaRecorder"
        ],
        "runs": true
    },
    {
        "file": "plugins/com.reallyenglish.cordova.plugin.browser-media-recorder/www/BrowserMediaRecorder.js",
        "id": "com.reallyenglish.cordova.plugin.browser-media-recorder.BrowserMediaRecorder",
        "clobbers": [
            "window.Recorder"
        ]
    },
    {
        "file": "plugins/com.reallyenglish.cordova.plugin.browser-media-recorder/src/browser/MediaRecorderProxy.js",
        "id": "com.reallyenglish.cordova.plugin.browser-media-recorder.MediaRecorderProxy",
        "runs": true
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "org.apache.cordova.test-framework": "0.1",
    "com.reallyenglish.cordova.plugin.browser-media-recorder": "0.0.1"
}
// BOTTOM OF METADATA
});