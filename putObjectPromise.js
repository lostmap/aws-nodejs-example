var AWS = require("aws-sdk");
var https = require('https');
var fs = require('fs');

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
    Bucket: process.argv[2],
    Key: process.argv[3],
    Body: fs.readFileSync(process.argv[4]),
};
var putObjectPromise = s3.putObject(params).promise();
putObjectPromise.then(function(data) {
    console.log('Success');
}).catch(function(err) {
    console.log(err);
});