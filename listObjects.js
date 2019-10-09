var AWS = require("aws-sdk");
var fs = require('fs');
var https = require('https');

var config = {
    accessKeyId: "10f777f4b1d0400485ecfc55148fc0de",
    secretAccessKey: "efcabac998d142df952d5c024956b084",
    endpoint: "https://sds.mts.ru",
    sslEnabled: true,
    s3ForcePathStyle: true,
    region: 'RegionOne',
    httpOptions: {
        agent: new https.Agent({
            rejectUnauthorized: false
        })
    }
};

AWS.config.update(config);
var s3 = new AWS.S3();
params = {
    Bucket: process.argv[2]
};

s3.listObjects(params, function(err, data) {
    if (err) {
        console.log("Error", err, err.stack);
    } else {
        console.log("Success", data);
    }
});