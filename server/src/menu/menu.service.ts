import { Injectable, BadRequestException } from "@nestjs/common";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  ScanCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";
import { S3Service } from "../aws/s3.service";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

const TABLE_NAME = "MenuCategoryFromMERN";

@Injectable()
export class MenuService {
  constructor(
    private readonly docClient: DynamoDBDocumentClient,
    private readonly s3Service: S3Service,
  ) {}

  async create(
    body: { name: string; description: string },
    file?: Express.Multer.File,
  ) {
    if (!body.name || !body.description) {
      throw new BadRequestException("Name and description are required");
    }

    let imageURL: string | null = null;

    if (file) {
      const uploaded = await this.s3Service.uploadFile(file, "menu");
      imageURL = uploaded.url;
    }

    const newMenu = {
      id: uuidv4(),
      name: body.name.trim(),
      description: body.description.trim(),
      image: imageURL,
      createdAt: new Date().toISOString(),
    };

    await this.docClient.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: newMenu,
      }),
    );

    return newMenu;
  }

  async getAllCategories() {
    const result = await this.docClient.send(
      new ScanCommand({ TableName: TABLE_NAME }),
    );
    return result.Items;
  }

  async updateCategory(
    id: string,
    body: { name: string; description: string },
    file?: Express.Multer.File,
  ) {
    if (!body.name || !body.description) {
      throw new BadRequestException("Name and description are required");
    }

    // 1️⃣ Get existing category
    const existing = await this.docClient.send(
      new GetCommand({
        TableName: TABLE_NAME,
        Key: { id },
      }),
    );

    const category = existing.Item;

    if (!category) {
      throw new BadRequestException("Category not found");
    }

    let imageURL = category.image;

    // 2️⃣ If new file uploaded
    if (file) {
      // delete old image if exists
      if (category.image) {
        const oldKey = new URL(category.image).pathname.substring(1);
        await this.s3Service.deleteFile(oldKey);
      }

      // upload new image
      const uploaded = await this.s3Service.uploadFile(file, "menu");
      imageURL = uploaded.url;
    }

    // 3️⃣ Update in DynamoDB
    const updatedItem = {
      ...category,
      name: body.name.trim(),
      description: body.description.trim(),
      image: imageURL,
      updatedAt: new Date().toISOString(),
    };

    await this.docClient.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: updatedItem,
      }),
    );

    return updatedItem;
  }

  async deleteCategory(id: string) {
    // 1️⃣ Get category first
    const result = await this.docClient.send(
      new GetCommand({
        TableName: TABLE_NAME,
        Key: { id },
      }),
    );

    const category = result.Item;

    if (!category) {
      throw new BadRequestException("Category not found");
    }

    // 2️⃣ Delete image from S3 if exists
    if (category.image) {
      const imageUrl = category.image;

      const key = imageUrl.split(".amazonaws.com/")[1];

      await this.s3Service.deleteFile(key);
    }

    // 3️⃣ Delete from DynamoDB
    await this.docClient.send(
      new DeleteCommand({
        TableName: TABLE_NAME,
        Key: { id },
      }),
    );

    return { message: "Category and image deleted successfully" };
  }
}
