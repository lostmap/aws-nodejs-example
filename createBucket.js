var AWS = require("aws-sdk");
var https = require('https');

var config = {
    endpoint: "https://sds.mts.ru", // Обязательно 
    sslEnabled: true,
    s3ForcePathStyle: true, // Обязательно 
    region: 'RegionOne', // Обязательно 
    httpOptions: {
        agent: new https.Agent({
            rejectUnauthorized: false // Небольшой хак 
        })
    }
};

AWS.config.update(config);
var s3 = new AWS.S3();
params = {
    Bucket: process.argv[2], 
    CreateBucketConfiguration: {
        LocationConstraint: "" // Без этого параметра не создается бакет (ошибка региона)
    }
};

s3.createBucket(params, function(err, data) {
    if (err) {
        console.log("Error", err, err.stack);
    } else {
        console.log("Success", data);
    }
});