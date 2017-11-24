/*!
 * Initiative JavaScript Library v1.0.0
 * http://initiati-ve.ca
 *
 * Copyright 2017, Kenny Tchu
 * Dual licensed under the MIT.
 *
 * Date: Nov 23 2017 -0400
 * 
 */

//base64js
(function(r){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=r()}else if(typeof define==="function"&&define.amd){define([],r)}else{var e;if(typeof window!=="undefined"){e=window}else if(typeof global!=="undefined"){e=global}else if(typeof self!=="undefined"){e=self}else{e=this}e.base64js=r()}})(function(){var r,e,t;return function r(e,t,n){function o(i,a){if(!t[i]){if(!e[i]){var u=typeof require=="function"&&require;if(!a&&u)return u(i,!0);if(f)return f(i,!0);var d=new Error("Cannot find module '"+i+"'");throw d.code="MODULE_NOT_FOUND",d}var c=t[i]={exports:{}};e[i][0].call(c.exports,function(r){var t=e[i][1][r];return o(t?t:r)},c,c.exports,r,e,t,n)}return t[i].exports}var f=typeof require=="function"&&require;for(var i=0;i<n.length;i++)o(n[i]);return o}({"/":[function(r,e,t){"use strict";t.byteLength=c;t.toByteArray=v;t.fromByteArray=s;var n=[];var o=[];var f=typeof Uint8Array!=="undefined"?Uint8Array:Array;var i="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";for(var a=0,u=i.length;a<u;++a){n[a]=i[a];o[i.charCodeAt(a)]=a}o["-".charCodeAt(0)]=62;o["_".charCodeAt(0)]=63;function d(r){var e=r.length;if(e%4>0){throw new Error("Invalid string. Length must be a multiple of 4")}return r[e-2]==="="?2:r[e-1]==="="?1:0}function c(r){return r.length*3/4-d(r)}function v(r){var e,t,n,i,a;var u=r.length;i=d(r);a=new f(u*3/4-i);t=i>0?u-4:u;var c=0;for(e=0;e<t;e+=4){n=o[r.charCodeAt(e)]<<18|o[r.charCodeAt(e+1)]<<12|o[r.charCodeAt(e+2)]<<6|o[r.charCodeAt(e+3)];a[c++]=n>>16&255;a[c++]=n>>8&255;a[c++]=n&255}if(i===2){n=o[r.charCodeAt(e)]<<2|o[r.charCodeAt(e+1)]>>4;a[c++]=n&255}else if(i===1){n=o[r.charCodeAt(e)]<<10|o[r.charCodeAt(e+1)]<<4|o[r.charCodeAt(e+2)]>>2;a[c++]=n>>8&255;a[c++]=n&255}return a}function l(r){return n[r>>18&63]+n[r>>12&63]+n[r>>6&63]+n[r&63]}function h(r,e,t){var n;var o=[];for(var f=e;f<t;f+=3){n=(r[f]<<16)+(r[f+1]<<8)+r[f+2];o.push(l(n))}return o.join("")}function s(r){var e;var t=r.length;var o=t%3;var f="";var i=[];var a=16383;for(var u=0,d=t-o;u<d;u+=a){i.push(h(r,u,u+a>d?d:u+a))}if(o===1){e=r[t-1];f+=n[e>>2];f+=n[e<<4&63];f+="=="}else if(o===2){e=(r[t-2]<<8)+r[t-1];f+=n[e>>10];f+=n[e>>4&63];f+=n[e<<2&63];f+="="}i.push(f);return i.join("")}},{}]},{},[])("/")});

//TextEncoderLite 
function TextEncoderLite(){}function TextDecoderLite(){}(function(){'use strict';function utf8ToBytes(a,b){b=b||Infinity;for(var c,d=a.length,e=null,f=[],g=0;g<d;g++){if(c=a.charCodeAt(g),!(55295<c&&57344>c))e&&(-1<(b-=3)&&f.push(239,191,189),e=null);else if(e){if(56320>c){-1<(b-=3)&&f.push(239,191,189),e=c;continue}else c=65536|(e-55296<<10|c-56320),e=null;}else if(56319<c){-1<(b-=3)&&f.push(239,191,189);continue}else if(g+1===d){-1<(b-=3)&&f.push(239,191,189);continue}else{e=c;continue}if(128>c){if(0>(b-=1))break;f.push(c)}else if(2048>c){if(0>(b-=2))break;f.push(192|c>>6,128|63&c)}else if(65536>c){if(0>(b-=3))break;f.push(224|c>>12,128|63&c>>6,128|63&c)}else if(2097152>c){if(0>(b-=4))break;f.push(240|c>>18,128|63&c>>12,128|63&c>>6,128|63&c)}else throw new Error('Invalid code point')}return f}function utf8Slice(a,b,c){var d='',e='';c=Math.min(a.length,c||Infinity),b=b||0;for(var f=b;f<c;f++)127>=a[f]?(d+=decodeUtf8Char(e)+String.fromCharCode(a[f]),e=''):e+='%'+a[f].toString(16);return d+decodeUtf8Char(e)}function decodeUtf8Char(a){try{return decodeURIComponent(a)}catch(b){return String.fromCharCode(65533)}}TextEncoderLite.prototype.encode=function(a){var b;return b='undefined'==typeof Uint8Array?utf8ToBytes(a):new Uint8Array(utf8ToBytes(a)),b},TextDecoderLite.prototype.decode=function(a){return utf8Slice(a,0,a.length)}})();

function base64EncodingUTF8(str) {
    var encoded = new TextEncoderLite('utf-8').encode(str);        
    var b64Encoded = base64js.fromByteArray(encoded);
    return b64Encoded;
}

/**
 * Create the jic object.
 * @constructor
 */

var kt = {
    /**
     * Compress an Image Object and upload it to the server via ajax
     * @param {params} compressed_img_obj The Compressed Image Object
     * @param {f} The server side url to send the POST request
     * @param {function} successCallback The callback to trigger when the upload is succesful.
     * @param {function} (OPTIONAL) errorCallback The callback to trigger when the upload failed.
     * @param {function} (OPTIONAL) duringCallback The callback called to be notified about the image's upload progress.
     * @param {Object} (OPTIONAL) customHeaders An object representing key-value  properties to inject to the request header.
     */
    compress : function(params, f, successCallback, errorCallback, duringCallback, customHeaders){
        
        if(f.files.length == 0){
            alert('Not file to compress');
            return;
        }
        
        var fType = f.files[0].type;
        var file = f.files[0];
        var img = new Image();
        
        if (!fType.match('image.*')) {
            alert('Only images allowed for upload')
            return;
        }

        var quality = params.quality;
        var uploadlink = params.uploadLink;
        
        if (fType === "image/png") {
            ext = ".png";
        } else if (fType === "image/webp") {
            ext = ".webp";
        } else if (fType === "image/bmp" || fType === "image/x-windows-bmp") {
            ext = ".bmp";
        } else if (fType === "image/tiff" || fType === "image/x-tiff") {
            ext = ".tiff";
        } else {
            ext = ".jpg";
        }
        
        var reader = new FileReader();
        reader.onload = function (e) {
            img.src = reader.result;
            //Compression
            img.onload = function (e) {
                e.stopPropagation();
                var mime_type;
                var cvs = document.createElement('canvas');
                mime_type = fType;

                cvs.width = this.naturalWidth;
                cvs.height = this.naturalHeight;
                var ctx = cvs.getContext("2d").drawImage(this, 0, 0);
                var newImageData = cvs.toDataURL(mime_type, quality / 100);
                
                //console.log(newImageData);
                var preview = document.getElementById('preview');
                //preview.src = newImageData;
                
                
                kt.upload(newImageData, uploadlink, 'receiptImage', fType, 'upload' + ext, successCallback, errorCallback, duringCallback, customHeaders);
            }
        }
        reader.readAsDataURL(file);    
    },
    /**
     * Receives an Image Object and upload it to the server via ajax
     * @param {Image} compressed_img_obj The Compressed Image Object
     * @param {String} The server side url to send the POST request
     * @param {String} file_input_name The name of the input that the server will receive with the file
     * @param {String} filename The name of the file that will be sent to the server
     * @param {function} successCallback The callback to trigger when the upload is succesful.
     * @param {function} (OPTIONAL) errorCallback The callback to trigger when the upload failed.
     * @param {function} (OPTIONAL) duringCallback The callback called to be notified about the image's upload progress.
     * @param {Object} (OPTIONAL) customHeaders An object representing key-value  properties to inject to the request header.
     */

    upload: function (imgData, upload_url, file_input_name, filetype, filename, successCallback, errorCallback, duringCallback, customHeaders) {

        //ADD sendAsBinary compatibilty to older browsers
        if (XMLHttpRequest.prototype.sendAsBinary === undefined) {
            XMLHttpRequest.prototype.sendAsBinary = function (string) {
                var bytes = Array.prototype.map.call(string, function (c) {
                    return c.charCodeAt(0) & 0xff;
                });
                this.send(new Uint8Array(bytes).buffer);
            };
        }

        var type = filetype;

        var data = imgData;
        //console.log(data);
        //console.log(base64EncodingUTF8(data))

        var xhr = new XMLHttpRequest();
        xhr.open('POST', upload_url, true);
        var boundary = 'KTboundary';

        xhr.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + boundary);

        // Set custom request headers if customHeaders parameter is provided
        if (customHeaders && typeof customHeaders === "object") {
            for (var headerKey in customHeaders) {
                xhr.setRequestHeader(headerKey, customHeaders[headerKey]);
            }
        }

        // If a duringCallback function is set as a parameter, call that to notify about the upload progress
        if (duringCallback && duringCallback instanceof Function) {
            xhr.upload.onprogress = function (evt) {
                if (evt.lengthComputable) {
                    duringCallback((evt.loaded / evt.total) * 100);
                }
            };
        }

        xhr.sendAsBinary(['--' + boundary, 'Content-Disposition: form-data; name="' + file_input_name + '"; filename="' + filename + '"', 'Content-Type: ' + type, '', base64EncodingUTF8(data), '--' + boundary + '--'].join('\r\n'));

        xhr.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    successCallback(this.responseText);
                } else if (this.status >= 400) {
                    if (errorCallback && errorCallback instanceof Function) {
                        errorCallback(this.responseText);
                    }
                }
            }
        };


    }
};
