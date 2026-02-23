import { Injectable } from '@nestjs/common';
import {
  DynamoDBDocumentClient,
  PutCommand,
  ScanCommand,
} from '@aws-sdk/lib-dynamodb';
// import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(private readonly docClient: DynamoDBDocumentClient) {}

  async create(data: {
    email: string;
    password: string;
    name: string;
    surname: string;
  }) {
    const jwtToken = jwt.sign({ email: data.email }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    }); // eslint-disable-line

    const userItem = {
      id: uuidv4(),
      email: data.email,
      password: data.password,
      name: data.name,
      surname: data.surname,
      jwtToken,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      await this.docClient.send(
        new PutCommand({
          TableName: 'UsersFromMERN',
          Item: userItem,
        }),
      );
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }

    // ✅ Return the actual user object
    return userItem;
  }

  async findByEmail(email: string) {
    try {
      const params = {
        TableName: 'UsersFromMERN',
        FilterExpression: '#emailAttr = :emailVal',
        ExpressionAttributeNames: { '#emailAttr': 'email' },
        ExpressionAttributeValues: { ':emailVal': email },
      };

      const result = await this.docClient.send(new ScanCommand(params));

      if (!result.Items || result.Items.length === 0) {
        return null;
      }

      return result.Items[0]; // pick the first match
    } catch (error) {
      console.log('Error finding user by email:', error);
      return null;
    }
  }
}
