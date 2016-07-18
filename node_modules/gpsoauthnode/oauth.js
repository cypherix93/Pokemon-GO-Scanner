var https = require('https');
var querystring = require('querystring');
var url = require('url');
var CryptoJS = require("crypto-js");
var crypto = require('crypto');


var AUTH_URL = 'https://android.clients.google.com/auth';

var USER_AGENT = 'Dalvik/2.1.0 (Linux; U; Android 5.1.1; Andromax I56D2G Build/LMY47V';

var oauthUtil = {};
oauthUtil.parseKeyValues = function (body) {
    var obj = {};
    body.split("\n").forEach(function (line) {
        var pos = line.indexOf("=");
        if (pos > 0) obj[line.substr(0, pos)] = line.substr(pos + 1);
    });
    return obj;
};
oauthUtil.Base64 = {
    _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
    stringify: CryptoJS.enc.Base64.stringify,
    parse: CryptoJS.enc.Base64.parse
};
oauthUtil.salt = function (len) {
    return Array.apply(0, Array(len)).map(function () {
        return (function (charset) {
            return charset.charAt(Math.floor(Math.random() * charset.length));
        }('abcdefghijklmnopqrstuvwxyz0123456789'));
    }).join('');
};

var GoogleOauth = function () {
};


GoogleOauth.prototype.request = function (options, callback) {
    var opt = url.parse(options.url);
    opt.headers = {};
    opt.method = options.method || "GET";
    if (typeof options.options === "object") {
        Object.keys(options.options).forEach(function (k) {
            opt[k] = options.options[k];
        });
    }
    if (typeof this._token !== "undefined") opt.headers.Authorization = "GoogleLogin auth=" + this._token;
    opt.headers['User-Agent'] = USER_AGENT;
    opt.headers["Content-type"] = options.contentType || "application/x-www-form-urlencoded";
    var req = https.request(opt, function (res) {

        res.setEncoding('utf8');
        var body = "";
        res.on('data', function (chunk) {
            body += chunk;
        });
        res.on('end', function () {
            var err;
            if (res.statusCode >= 400) {
                console.dir(err);
                err = new Error(res.statusCode + " error from server");
                err.statusCode = res.statusCode;
                err.response = res;
            }

            var contentType = (typeof res.headers["content-type"] !== "string") ? null : res.headers["content-type"].split(";", 1)[0].toLowerCase();
            var response = body;
            try {
                if (contentType === "application/json") {
                    response = JSON.parse(response);
                }
            } catch (e) {
                if (typeof callback === "function") callback(new Error("unable to parse json response: " + e), null, res);
            }
            if (typeof callback === "function") callback(err, response, res);
        });
        res.on('error', function (error) {
            var err = new Error("Error making https request");
            err.error = error;
            err.response = res;
            if (typeof callback === "function") callback(err, body, res);
        });
    });
    if (typeof options.data !== "undefined") req.write(options.data);
    req.end();
};


GoogleOauth.prototype.oauth = function (email, master_token, android_id, service, app, client_sig, callback) {

    var data = {
        accountType: "HOSTED_OR_GOOGLE",
        Email: email,
        EncryptedPasswd: master_token,
        has_permission: 1,
        service: service,
        source: "android",
        androidId: android_id,
        app: app,
        client_sig: client_sig,
        device_country: "us",
        operatorCountry: "us",
        lang: "en",
        sdk_version: "17"
    };

    this.request({
        method: "POST",
        url: AUTH_URL,
        contentType: "application/x-www-form-urlencoded",
        data: querystring.stringify(data),
        headers: {
        }
    }, function (err, data) {
        callback(err, err ? null : oauthUtil.parseKeyValues(data));
    });
};
GoogleOauth.prototype.login = function (email, password, android_id, callback) {
    var data = {
        accountType: "HOSTED_OR_GOOGLE",
        Email: email.trim(),
        has_permission: "1",
        add_account: "1",
        Passwd: password,
        service: "ac2dm",
        source: "android",
        androidId: android_id,
        device_country: "us",
        operatorCountry: "us",
        lang: "en",
        sdk_version: "17"
    };
    this.request({
        method: "POST",
        url: AUTH_URL,
        contentType: "application/x-www-form-urlencoded",
        data: querystring.stringify(data)
    }, function (err, data) {
        var response = oauthUtil.parseKeyValues(data);
        callback(err, err ? null : {androidId: android_id, masterToken: response.Token});
    });
};

module.exports = exports = GoogleOauth;