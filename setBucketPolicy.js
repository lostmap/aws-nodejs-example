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

var readOnlyAnonUserPolicy = {
    Version: "2012-10-17",
    Statement: [
      {
        Sid: "AddPerm",
        Effect: "Allow",
        Principal: "*",
        Action: [
          "s3:GetObject"
        ],
        Resource: [
          ""
        ]
      }
    ]
  };
var bucketResource = "arn:aws:s3:::" + process.argv[2] + "/*";
readOnlyAnonUserPolicy.Statement[0].Resource[0] = bucketResource;
  
var json = '{ "Id": "Policy1571755388262", "Version": "2012-10-17", "Statement": [ { "Sid": "Stmt1571755383244", "Action": [ "s3:DeleteObject", "s3:GetObject" ], "Effect": "Allow", "Resource": "arn:aws:s3:::testnoread/*", "Principal": "*" } ] }'
AWS.config.update(config);
var s3 = new AWS.S3();
params = {
    Bucket: process.argv[2],
    Policy: json,
  //Policy: JSON.stringify(readOnlyAnonUserPolicy),
};

s3.putBucketPolicy(params, function(err, data) {
    if (err) {
        console.log("Error", err, err.stack);
    } else {
        console.log("Success", data);
    }
});