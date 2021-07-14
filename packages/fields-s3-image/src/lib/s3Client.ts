import { S3Client } from '@aws-sdk/client-s3';
// Set the AWS Region.
const region = process.env.S3_REGION || 'use-east'; //e.g. "us-east-1"
const endpoint = process.env.S3_ENDPOINT;
// Create an Amazon S3 service client object.
export const s3Client = new S3Client({ endpoint, region });
