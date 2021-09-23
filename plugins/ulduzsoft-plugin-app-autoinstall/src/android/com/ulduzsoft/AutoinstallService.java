package com.ulduzsoft;

import android.accessibilityservice.AccessibilityService;
import android.accessibilityservice.AccessibilityServiceInfo;
import android.annotation.TargetApi;
import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.Context;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.accessibility.AccessibilityEvent;
import android.view.accessibility.AccessibilityNodeInfo;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.PluginResult;
import org.apache.cordova.PluginResult.Status;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.List;

public class AutoinstallService extends AccessibilityService {

    private final String TAG = this.getClass().getName();
    
    // The instance of this service
    private static AutoinstallService mInstance = null;
    
    // Whether the accessibility service is connected
    public static boolean mConnected = false;
    
    // The Cordoba callback
    private CallbackContext callbackContext = null;

    public static void setCallback( CallbackContext c ) {
        mInstance.callbackContext = c;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        mInstance = this;
    }

    @Override
    protected void onServiceConnected() {
        super.onServiceConnected();
        AccessibilityServiceInfo info = new AccessibilityServiceInfo();
        info.eventTypes = AccessibilityEvent.TYPES_ALL_MASK;
        //AccessibilityEvent.TYPE_WINDOWS_CHANGED
        info.feedbackType = AccessibilityServiceInfo.FEEDBACK_GENERIC;
        info.feedbackType = AccessibilityServiceInfo.FEEDBACK_GENERIC;

        info.flags = AccessibilityServiceInfo.DEFAULT;
        info.flags = AccessibilityServiceInfo.FLAG_REPORT_VIEW_IDS;
        info.flags = AccessibilityServiceInfo.FLAG_RETRIEVE_INTERACTIVE_WINDOWS;

        info.notificationTimeout = 0;
        this.setServiceInfo(info);
        mConnected = true;
    }

    private JSONObject getWindowContent( AccessibilityNodeInfo wnd ) throws JSONException
    {
        JSONObject winfo = new JSONObject();
        
        winfo.put( "actions", wnd.getActions() );
        winfo.put( "className",  wnd.getClassName() );
        winfo.put( "packageName",  wnd.getPackageName() );
        winfo.put( "wid",  wnd.getWindowId() );

        if ( wnd.getText() != null )
            winfo.put( "text", wnd.getText() );
        
        JSONArray flags = new JSONArray();
        
        if ( wnd.isCheckable() )
            flags.put( "checkable" );

        if ( wnd.isChecked() )
            flags.put( "checked" );
            
        if ( wnd.isClickable() )
            flags.put( "clickable" );

        if ( wnd.isContentInvalid() )
            flags.put( "invalid" );
            
        if ( wnd.isDismissable() )
            flags.put( "dismissable" );

        if ( wnd.isEditable() )
            flags.put( "editable" );

        if ( !wnd.isEnabled() )
            flags.put( "disabled" );

        if ( wnd.isFocusable() )
            flags.put( "focusable" );

        if ( wnd.isFocused() )
            flags.put( "focused" );

        if ( wnd.isLongClickable() )
            flags.put( "long-clickable" );
 	
        if ( wnd.isMultiLine() )
            flags.put( "multiline" );

        if ( wnd.isPassword() )
            flags.put( "password" );

        if ( wnd.isSelected() )
            flags.put( "selected" );
        
        if ( flags.length() > 0 )
            winfo.put( "flags", flags );

        if ( wnd.getChildCount() > 0 )
        {
            JSONArray children = new JSONArray();
            
            for ( int i = 0; i < wnd.getChildCount(); i++ )
            {
                AccessibilityNodeInfo child = wnd.getChild( i );
                
                if ( child == null )
                    continue;
                    
                children.put( getWindowContent( child) );
                child.recycle();
            }
            
            if ( children.length() > 0 )
                winfo.put( "children", children );
        }

        return winfo;
    }

    private JSONObject getRootWindowContent() throws JSONException
    {
        AccessibilityNodeInfo root = mInstance.getRootInActiveWindow();
        
        if ( root == null )
            return null;
        else
            return getWindowContent( root );
    }
    
    @Override
    public void onAccessibilityEvent(AccessibilityEvent event) {
        
        if ( callbackContext == null )
            return;
            
        final int eventType = event.getEventType();
        
        if ( eventType == AccessibilityEvent.TYPE_WINDOWS_CHANGED )
        {
            //Log.v( TAG, "***** onAccessibilityEvent TYPE_WINDOWS_CHANGED" + event.getText().size() );
            
            try
            {
                JSONObject ret = new JSONObject();
            
                ret.put( "type", "TYPE_WINDOWS_CHANGED" );
                ret.put( "root", getRootWindowContent() );
                PluginResult pluginResult = new PluginResult( PluginResult.Status.OK, ret );
                pluginResult.setKeepCallback( true );
                callbackContext.sendPluginResult( pluginResult );
            }
            catch ( JSONException ex )
            {
                Log.v( TAG, "JSONException", ex );
            }
        
        }
    }

    static public void clickButton( JSONArray args, final CallbackContext callbackContext ) throws JSONException
    {
        String text = args.getString(0);
        Log.d( mInstance.TAG, "clickButton called: " + text );
        
        List<AccessibilityNodeInfo> nodes = mInstance.getRootInActiveWindow().findAccessibilityNodeInfosByText( text );

        if ( nodes == null || nodes.size() < 1 )
        {
            callbackContext.sendPluginResult( new PluginResult( PluginResult.Status.ERROR, "No such view" ) );
            return;
        }
        
        PluginResult pluginResult = null;
        
        // Free the nodes
        for ( AccessibilityNodeInfo node : nodes )
        {
            if ( node.getText().equals( text ) )
            {
                node.performAction( AccessibilityNodeInfo.ACTION_CLICK );
                pluginResult = new PluginResult( PluginResult.Status.OK );
                Log.d( mInstance.TAG, "view found: " + nodes.toString() );
            }
            
            node.recycle();
        }
        
        if ( pluginResult == null )
            pluginResult = new PluginResult( PluginResult.Status.ERROR, "Multiple views found but no such node" );
            
        callbackContext.sendPluginResult( pluginResult );
    }
            
    @Override
    public void onInterrupt()
    {
    }
}
