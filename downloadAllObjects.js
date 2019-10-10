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

var myBucket = process.argv[2];

var listObjects = s3.listObjects({Bucket: myBucket}).promise()
listObjects.then(function(data) {
    data.Contents.forEach(function(obj){
        var myKey = obj.Key;
        var fileStream = fs.createWriteStream(myKey);
        var s3Stream = s3.getObject({Bucket: myBucket, Key: myKey}).createReadStream();

        s3Stream.pipe(fileStream).on('error', function(err) {
            console.error('File Stream:', err);
        }).on('close', function() {
            console.log('Successfully downloaded ', myKey);
        });
    });
}).catch(function(err) {
    console.log(err);
});
