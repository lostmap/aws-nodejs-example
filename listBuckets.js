var AWS = require("aws-sdk");
var https = require('https');
var fs = require('fs');
//require('https').globalAgent.options.ca = fs.readFileSync('digi.pem')
//test
//test 2

var certs = [
  fs.readFileSync('digi.pem')
];

var config = {
    endpoint: "https://sds.mts.ru",
    sslEnabled: true,
    s3ForcePathStyle: true,
    region: 'RegionOne',
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
