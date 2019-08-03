//
// Self-updates the app, checking for the update periodically

var appupdater = {
 
    // Private data storage
    lastcheckresult : "not started",
    lastchecktime : null,

    checkForUpdates : function()
    {
        if ( typeof appUpdaterIndexURL === 'undefined' )
            return;
            
        let appUpdate = cordova.require('cordova-plugin-app-update.AppUpdate');

        if ( appUpdate != null )
        {
            appUpdate.checkAppUpdate( function onSuccess() {

                lastcheckresult = "success";
                lastchecktime = moment();                

            }, function onFail() {

                lastcheckresult = "error";
                lastchecktime = moment();
            },
            
            
            appUpdaterIndexURL,
            
            {
                'skipPromptDialog' : true,
                'skipProgressDialog' : true
            } );
        }
        else
            this.lastcheckresult = "disabled";
    }
};
