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

/**
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
    compress: function (params, f, successCallback, errorCallback, duringCallback, customHeaders) {

        if (f.files.length == 0) {
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

        //console.log(f.files);
        //return;

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
            //console.log(e, reader)
            img.src = reader.result;

            img.onerror = function (e) {
                alert("File format is not supported");
            };

            //Compression
            img.onload = function (e) {
                e.stopPropagation();
                var mime_type;
                mime_type = fType;
                var cvs = document.createElement('canvas');

                var dataUri = cvs.toDataURL(mime_type);
                if (dataUri.indexOf(mime_type) < 0) {
                    console.log('not supported');
                }



                cvs.width = this.naturalWidth;
                cvs.height = this.naturalHeight;
                var ctx = cvs.getContext("2d").drawImage(this, 0, 0);
                var newImageData = cvs.toDataURL(mime_type, quality / 100);

                //var preview = document.getElementById('preview');
                //preview.src = newImageData;


                kt.upload(newImageData, uploadlink, 'receiptImage', successCallback, errorCallback, duringCallback, customHeaders);
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

    upload: function (imgData, upload_url, file_input_name, successCallback, errorCallback, duringCallback, customHeaders) {

        var xhr = new XMLHttpRequest();
        xhr.open('POST', upload_url, true);

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

        var formData = new FormData();
        formData.append(file_input_name, imgData);
        xhr.send(formData);

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
