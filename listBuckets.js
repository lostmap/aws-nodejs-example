var AWS = require("aws-sdk");
var fs = require('fs');
var https = require('https');
var certs = [
    fs.readFileSync('MTS Root CA.pem'),
];

var config = {
    endpoint: "https://sds.mts.ru",
    sslEnabled: true,
    s3ForcePathStyle: true,
    region: 'RegionOne',
    httpOptions: {
        agent: new https.Agent({
            rejectUnauthorized: false,
            ca: certs
        })
    }
};

AWS.config.update(config);
var s3 = new AWS.S3();
params = {};

s3.listBuckets(params, function (err, data) {
    if (err) {
        console.log("Error", err, err.stack);
    } else {
        console.log("Success", data);
    }
});