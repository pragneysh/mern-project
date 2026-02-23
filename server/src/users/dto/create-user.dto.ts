import { DynamoDBClient, CreateTableCommand } from '@aws-sdk/client-dynamodb';

const client = new DynamoDBClient({ region: process.env.AWS_REGION! });

async function createUsersTable() {
  try {
    const command = new CreateTableCommand({
      TableName: 'UsersFromMERN',

      // ✅ Primary key
      KeySchema: [
        { AttributeName: 'id', KeyType: 'HASH' }, // Partition Key
      ],

      // ✅ Attribute definitions (must include all keys, including GSI keys)
      AttributeDefinitions: [
        { AttributeName: 'id', AttributeType: 'S' },
        { AttributeName: 'email', AttributeType: 'S' }, // required for GSI
      ],

      // ✅ Optional secondary index for querying by email
      GlobalSecondaryIndexes: [
        {
          IndexName: 'EmailIndex',
          KeySchema: [{ AttributeName: 'email', KeyType: 'HASH' }],
          Projection: { ProjectionType: 'ALL' }, // include all attributes
        },
      ],

      BillingMode: 'PAY_PER_REQUEST', // on-demand
    });

    const result = await client.send(command);
    console.log('✅ Table created:', result);
  } catch (error) {
    console.error('❌ Error creating table:', error);
  }
}

createUsersTable();
