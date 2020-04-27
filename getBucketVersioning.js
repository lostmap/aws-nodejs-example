var AWS = require("aws-sdk");
var https = require('https');

var config = {
    endpoint: "https://sds.mts.ru", // Обязательно 
    sslEnabled: true,
    s3ForcePathStyle: true, // Обязательно 
    region: 'RegionOne', // Обязательно 
};

AWS.config.update(config);
var s3 = new AWS.S3();
params = {
    Bucket: process.argv[2], 
};

s3.getBucketVersioning(params, function(err, data) {
    if (err) {
        console.log("Error", err, err.stack);
    } else {
        console.log("Success", data);
    }
});
