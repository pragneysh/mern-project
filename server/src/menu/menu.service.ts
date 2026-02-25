import { Injectable, BadRequestException } from "@nestjs/common";
import {
  DynamoDBDocumentClient,
  PutCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";
import { S3Service } from "../aws/s3.service";

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
}
