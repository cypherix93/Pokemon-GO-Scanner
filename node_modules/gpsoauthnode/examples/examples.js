/**
 * Created by billy on 7/17/16.
 */

var GoogleOauth = require("../oauth");

var EMAIL = 'your_google_email';
var PASSWORD = 'your_email_password';
var ANDROID_ID = 'your_android_id'
var SERVICE = 'your_service'
var APP = 'your_android'
var CLIENT_SIG = 'your_client_sig'

var google = new GoogleOauth();
google.login(EMAIL, PASSWORD, ANDROID_ID, function (err, data) {
    if (data) {
        google.oauth(EMAIL, data.masterToken, data.androidId, SERVICE, APP, CLIENT_SIG, function (err, data) {
            console.log(data);
        });
    }
});
