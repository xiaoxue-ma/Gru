#!/usr/bin/env node

var pluginlist = [
    "cordova-plugin-inappbrowser",
    "cordova-plugin-file",
    "cordova-plugin-camera",
    "cordova-plugin-console",
    "cordova-plugin-contacts",
    "cordova-plugin-datepicker",
    "cordova-plugin-device",
    "cordova-plugin-file-transfer",
    "cordova-plugin-geolocation",
    "cordova-plugin-media",
    "ionic-plugin-keyboard",
/*    "com.synconset.imagepicker",*/
    "https://github.com/alongubkin/phonertc.git"
];

// no need to configure below

var fs = require('fs');
var path = require('path');
var sys = require('sys')
var exec = require('child_process').exec;

function puts(error, stdout, stderr) {
    sys.puts(stdout)
}

pluginlist.forEach(function(plug) {
    exec("cordova plugin add " + plug, puts);
    //exec("ionic browser add crosswalk"); // run manually later
});