import { DynamoDBClient, CreateTableCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: process.env.AWS_REGION! });

async function createMenuCategoryTable() {
  try {
    const command = new CreateTableCommand({
      TableName: "MenuCategoryFromMERN",

      // ✅ Primary Key
      KeySchema: [
        { AttributeName: "id", KeyType: "HASH" }, // Partition Key
      ],

      // ✅ Attribute Definitions (must include keys)
      AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],

      BillingMode: "PAY_PER_REQUEST", // On-demand mode
    });

    const result = await client.send(command);
    console.log("✅ MenuCategoryFromMERN table created:", result);
  } catch (error) {
    console.error("❌ Error creating table:", error);
  }
}

createMenuCategoryTable(); // eslint-disable-line