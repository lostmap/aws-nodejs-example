var https = require('https');
var AWS = require("aws-sdk");

var s3 = new AWS.S3({
    endpoint: "https://sds.mts.ru",
    sslEnabled: true,
    s3ForcePathStyle: true,
    region: 'RegionOne',
    httpOptions: {
        agent: new https.Agent({
            rejectUnauthorized: false
        })
    }
});

var params = {
    Bucket: process.argv[2]
};

s3.listObjects(params, function(err, data) {
    if (err) {
        console.log("Error", err, err.stack);
    } else {
        console.log("Success", data);
    }
});