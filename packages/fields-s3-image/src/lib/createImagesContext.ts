import path from 'path';
import { KeystoneConfig, ImagesContext, ImageMetadata } from '@keystone-next/types';
import { v4 as uuid } from 'uuid';
import fs from 'fs-extra';
import fromBuffer from 'image-type';
import imageSize from 'image-size';
import { S3Client, PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { parseImageRef, isKeystoneCloudAsset } from '@keystone-next/utils';
import {
  buildKeystoneCloudImageSrc,
  getImageMetadataFromKeystoneCloud,
  uploadImageToKeystoneCloud,
} from './assets';
// import { s3Client } from './s3Client';

const DEFAULT_BASE_URL = '/images';
const DEFAULT_STORAGE_PATH = './public/images';

const {
  S3_ACCESS_KEY_ID = '',
  S3_SECRET_ACCESS_KEY = '',
  S3_ENDPOINT = '',
  S3_BUCKET = '',
  S3_PREFIX = '',
  S3_BASE_URL = '',
} = process.env;

const getImageMetadataFromBuffer = async (buffer: Buffer): Promise<ImageMetadata> => {
  const filesize = buffer.length;
  const fileType = fromBuffer(buffer);
  if (!fileType) {
    throw new Error('File type not found');
  }

  if (
    fileType.ext !== 'jpg' &&
    fileType.ext !== 'png' &&
    fileType.ext !== 'webp' &&
    fileType.ext !== 'gif'
  ) {
    throw new Error(`${fileType.ext} is not a supported image type`);
  }

  const extension = fileType.ext;

  const { height, width } = imageSize(buffer);

  if (width === undefined || height === undefined) {
    throw new Error('Height and width could not be found for image');
  }
  return { width, height, filesize, extension };
};


export const getSrc = async (mode, id, extension) => {
  const baseUrl = process.env.S3_BASE_URL;
  const filename = `${id}.${extension}`;

  return `${baseUrl}/${filename}`;
};

export const getDataFromRef = async ref => {
  const imageRef = parseImageRef(ref);

  if (!imageRef) {
    throw new Error('Invalid image reference');
  }

  const { mode } = imageRef;

  if (isKeystoneCloudAsset(mode)) {
    const { id, extension } = imageRef;
    const filename = `${id}.${extension}`;
    const metadata = await getImageMetadataFromKeystoneCloud({
      filename,
      apiKey,
      restApiEndpoint,
    });

    return { ...imageRef, ...metadata };
  }

  const buffer = await fs.readFile(path.join(storagePath, `${imageRef.id}.${imageRef.extension}`));
  const metadata = await getImageMetadataFromBuffer(buffer);

  return { ...imageRef, ...metadata };
};

export const getDataFromStream = async stream => {
  const id = uuid();

  const chunks = [];

  for await (let chunk of stream) {
    chunks.push(chunk);
  }

  const buffer = Buffer.concat(chunks);
  const metadata = await getImageMetadataFromBuffer(buffer);

  const params: PutObjectCommandInput = {
    Bucket: process.env.S3_BUCKET,
    // Key: `test-inv/${id}.${metadata.extension}`,
    Key: `${id}.${metadata.extension}`,
    Body: buffer,
    ContentType: `image/${metadata.extension}`,
    ACL: 'public-read',
    ContentLength: metadata.filesize,
  };
  try {
    const {
      S3_ACCESS_KEY_ID = '',
      S3_SECRET_ACCESS_KEY = '',
      S3_ENDPOINT = '',
      S3_BUCKET = '',
      S3_PREFIX = '',
      S3_BASE_URL = '',
    } = process.env;
    const region = process.env.S3_REGION || 'use-east'; //e.g. "us-east-1"
    const endpoint = process.env.S3_ENDPOINT;
    // Create an Amazon S3 service client object.
    const s3Client = new S3Client({ endpoint, region, credentials: { accessKeyId: S3_ACCESS_KEY_ID, secretAccessKey: S3_SECRET_ACCESS_KEY } });
    await s3Client.send(new PutObjectCommand(params));
    // const upload = new Upload({
    //   client: s3Client,
    //   params,
    //   // params: {
    //   //     Bucket: ,
    //   //     Key: 'test.txt',
    //   //     Body: stream,
    //   //     ContentType: 'text/plain',
    //   // },
    // });

    // await upload.done();
  } catch (error) {
    throw error;
  }

  return { mode: 's3', id, ...metadata };
};
