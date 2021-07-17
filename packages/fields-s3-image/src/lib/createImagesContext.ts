import path from 'path';
import { KeystoneConfig, ImagesContext, ImageMetadata } from '@keystone-next/types';
import { v4 as uuid } from 'uuid';
import fs from 'fs-extra';
import fromBuffer from 'image-type';
import imageSize from 'image-size';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { parseImageRef, isKeystoneCloudAsset } from '@keystone-next/utils';
import {
  buildKeystoneCloudImageSrc,
  getImageMetadataFromKeystoneCloud,
  uploadImageToKeystoneCloud,
} from './assets';
import { s3Client } from './s3Client';

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

const baseUrl = S3_BASE_URL;

export const getSrc = async (mode, id, extension) => {
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

  const params = {
    Bucket: S3_BUCKET,
    Key: id,
    Body: stream,
  };
  await s3Client.send(new PutObjectCommand(params));

  return { mode: 's3', id, ...metadata };
};
