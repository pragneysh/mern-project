import { Injectable } from "@nestjs/common";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class S3Service {
  private readonly s3: S3Client;
  private readonly bucketName = process.env.AWS_BUCKET_NAME!;
  private readonly region = process.env.AWS_REGION!;

  constructor() {
    this.s3 = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });
  }

  // ✅ Upload file to S3
  async uploadFile(file: Express.Multer.File, folder = "uploads") {
    const fileKey = `${folder}/${uuidv4()}-${file.originalname}`;

    await this.s3.send(
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key: fileKey,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );

    return {
      key: fileKey,
      url: `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${fileKey}`,
    };
  }

  // ✅ Generate signed URL (for private bucket preview)
  async getSignedImageUrl(key: string) {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    return await getSignedUrl(this.s3, command, { expiresIn: 3600 });
  }

  // ✅ Delete file from S3 (good practice)
  async deleteFile(key: string) {
    await this.s3.send(
      new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      }),
    );
  }
}