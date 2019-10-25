var AWS = require("aws-sdk");
var https = require('https');
var fs = require('fs');

var config = {
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
    Bucket: process.argv[2],
    Key: process.argv[3],
    Body: fs.readFileSync(process.argv[4]),
    ACL: 'public-read',
};

s3.upload(params, function(err, data) {
    if (err) {
        console.log("Error", err, err.stack);
    } else {
        console.log("Success", data);
    }
});