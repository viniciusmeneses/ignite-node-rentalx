import { S3 } from "aws-sdk";
import fs from "fs";
import mime from "mime";
import { resolve } from "path";

import upload from "@config/upload";
import { deleteFile } from "@utils/file";

import { IStorageProvider } from "../IStorageProvider";

export class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new S3({
      region: process.env.AWS_REGION,
    });
  }

  async save(file: string, folder: string): Promise<string> {
    const path = resolve(upload.tmpFolder, file);
    const content = await fs.promises.readFile(path);
    const contentType = mime.getType(path);

    await this.client
      .putObject({
        Bucket: `${process.env.AWS_BUCKET}/${folder}`,
        Key: file,
        ACL: "public-read",
        Body: content,
        ContentType: contentType,
      })
      .promise();

    await deleteFile(path);
    return file;
  }

  async delete(file: string, folder: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: `${process.env.AWS_BUCKET}/${folder}`,
        Key: file,
      })
      .promise();
  }
}
