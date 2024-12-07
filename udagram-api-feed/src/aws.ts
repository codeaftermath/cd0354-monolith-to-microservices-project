import AWS = require('aws-sdk');
import {config} from './config/config';

// Configure AWS
const accessKeyId = process.env.AWS_ACCESS_KEY_ID ? process.env.AWS_ACCESS_KEY_ID.trim() : undefined;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY ? process.env.AWS_SECRET_ACCESS_KEY.trim() : undefined;
const sessionToken = process.env.AWS_SESSION_TOKEN ? process.env.AWS_SESSION_TOKEN.trim() : undefined;
if (accessKeyId && secretAccessKey) {
  // Workaround to mitigate line feed character being added that causes SignatureDoesNotMatch
  AWS.config.credentials = 
    new AWS.Credentials({
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
      sessionToken: sessionToken,
    });
  AWS.config.region = config.aws_region.trim();
}
else {
  new AWS.CredentialProviderChain().resolve((err, credential) => {
    if (!err) {
      // NOTE: Discovered that \n is being added in the process somewhere. This causes the issue SignatureDoesNotMatch
      // Related to Kubernetes secret values are being handled. Noticed that new line feed were added to all values which gets included to aws-sdk
      // console.log(credential); 
  
      AWS.config.credentials = credential
      AWS.config.region = config.aws_region
    }
    else {
      console.error("Unable to set AWS credential", err)
    }
  });
}

export const s3 = new AWS.S3({
  signatureVersion: 'v4',
  params: {Bucket: config.aws_media_bucket.trim()},
});

// Generates an AWS signed URL for retrieving objects
export function getGetSignedUrl( key: string ): string {
  const signedUrlExpireSeconds = 60 * 5;

  return s3.getSignedUrl('getObject', {
    Bucket: config.aws_media_bucket.trim(),
    Key: key.trim(),
    Expires: signedUrlExpireSeconds,
  });
}

// Generates an AWS signed URL for uploading objects
export function getPutSignedUrl( key: string ): string {
  const signedUrlExpireSeconds = 60 * 5;

  return s3.getSignedUrl('putObject', {
    Bucket: config.aws_media_bucket,
    Key: key,
    Expires: signedUrlExpireSeconds,
  });
}
