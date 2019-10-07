var AWS = require("aws-sdk");

AWS.config.getCredentials(function(err) {
  if (err) console.log(err.stack);
  // credentials not loaded
  else {
    console.log("Access key:", AWS.config.credentials.accessKeyId);
    console.log("Secret access key:", AWS.config.credentials.secretAccessKey);
  }
});

var fs = require('fs');
var https = require('https');
var certs = [
  fs.readFileSync('MTS Root CA.pem'),
];

var config = {
    accessKeyId: "10f777f4b1d0400485ecfc55148fc0de",
    secretAccessKey: "efcabac998d142df952d5c024956b084",
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
  console.log("Region: ", AWS.config.region);
  // Названия корзин должны быть уникальными для всех пользователей S3
  var myBucket = 'awsorswift';

 
  params = {};

  s3.listBuckets(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
  });

/*
  params = {Bucket: process.argv[2],CreateBucketConfiguration: {
    LocationConstraint:
    "",
   }
    
};
  //WORKS

  s3.createBucket(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
  });
*/
/*
  params = {Bucket: process.argv[2],};
  s3.deleteBucket(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
  });

*/
/*
var params = {
    Bucket: process.argv[2],
 };

  // call S3 to create the bucket
  s3.listObjects(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
  });
*/
/*
var params = {
    Bucket: process.argv[2],
    Key: process.argv[3], 
 };
  // call S3 to create the bucket
  s3.deleteObject(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
  });*/

/*
  var params = {
    Body: "<Binary String>", 
    Bucket: process.argv[2],
    Key: process.argv[3], 
 };
  // call S3 to create the bucket
  s3.putObject(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
  });
  */