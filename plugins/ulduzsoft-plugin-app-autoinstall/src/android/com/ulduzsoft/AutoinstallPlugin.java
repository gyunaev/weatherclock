package com.ulduzsoft;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.PluginResult;
import org.apache.cordova.PluginResult.Status;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.net.Uri;
import android.os.PowerManager;
import android.os.StrictMode;
import android.provider.Settings;
import android.text.TextUtils;
import android.util.Log;
import android.content.Context;
import android.content.Intent;
import android.widget.Toast;

public class AutoinstallPlugin extends CordovaPlugin {

    private static final String TAG = "AutoinstallPlugin";
    public static AutoinstallPlugin instance = null;
    
    //fixme
    protected Context context = null;

    public void initialize(CordovaInterface cordova, CordovaWebView webView)
    {
        super.initialize(cordova, webView);
        context = super.cordova.getActivity().getApplicationContext();
        Log.d(TAG, "Inicializando AccessibilityPlugin");
        instance = this;
    }

    public boolean execute(String action, JSONArray args, final CallbackContext callbackContext) throws JSONException
    {
        Log.d(TAG, "execute called " + action);
  
        switch ( action )
        {
            case "setCallback":
                Log.d(TAG, "setCallback called");
                AutoinstallService.setCallback( callbackContext );
                break;
        
            case "clickButton":
                AutoinstallService.clickButton( args, callbackContext );
                break;

            case "openAccessibility":
                Intent intent = new Intent(android.provider.Settings.ACTION_ACCESSIBILITY_SETTINGS);
                intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
                intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                super.cordova.getActivity().startActivity(intent);
                callbackContext.sendPluginResult(new PluginResult(Status.OK));
                break;
        
            case "isConnected":
                callbackContext.sendPluginResult( new PluginResult( AutoinstallService.mConnected ? Status.OK : Status.ERROR ) );
                break;

            default:
                callbackContext.sendPluginResult(new PluginResult(Status.ERROR));
                break;
        }

        return true;
    }
}
