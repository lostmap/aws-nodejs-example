var AWS = require("aws-sdk");
var https = require('https');
var fs = require('fs');

var s3 = new AWS.S3({
    endpoint: "https://sds.mts.ru",
    sslEnabled: true,
    s3ForcePathStyle: true,
    region: 'RegionOne',
});

var params = {
    Bucket: process.argv[2],
    Key: process.argv[3],
    VersionId: process.argv[4],
};

var fileStream = fs.createWriteStream(params['Key']);
var s3Stream = s3.getObject(params).createReadStream();

// Listen for errors returned by the service
s3Stream.on('error', function(err) {
    // NoSuchKey: The specified key does not exist
    console.error(err);
});

s3Stream.pipe(fileStream).on('error', function(err) {
    // capture any errors that occur when writing data to the file
    console.error('File Stream:', err);
}).on('close', function() {
    console.log('Done.');
});
