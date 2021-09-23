
var exec = require('cordova/exec');

var PLUGIN_NAME = 'AutoinstallPlugin';

var AutoinstallPlugin =
{
    check: function(obj, successCallback, errorCallback)
    {
        exec(successCallback, errorCallback, PLUGIN_NAME, "checkAccessibility", [obj]);
    },
    
    register : function( successCallback, errorCallback)
    {
        exec(successCallback, errorCallback, PLUGIN_NAME, "setCallback", null);
    },
    
    clickButton : function(obj, successCallback, errorCallback)
    {
        exec(successCallback, errorCallback, PLUGIN_NAME, "clickButton", [obj]);
    },
    
    open: function(successCallback, errorCallback)
    {
        exec(successCallback, errorCallback, PLUGIN_NAME, "openAccessibility", null);
    },
    
    service:
    {
        check: function(successCallback, errorCallback){
            exec(successCallback, errorCallback, PLUGIN_NAME, "checkService", null);
        },
    }
};

module.exports = AutoinstallPlugin;
