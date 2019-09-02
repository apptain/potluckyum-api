import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";

export async function main(event, context) {
  const params = {
    TableName: "invitations",
    // 'KeyConditionExpression' defines the condition for the query
    // - 'creatorId = :creatorId': only return items with matching 'creatorId'
    //   partition key
    // 'ExpressionAttributeValues' defines the value in the condition
    // - ':creatorId': defines 'creatorId' to be Identity Pool identity id
    //   of the authenticated user
    KeyConditionExpression: "creatorId = :creatorId",
    ExpressionAttributeValues: {
      ":creatorId": event.requestContext.identity.cognitoIdentityId
    }
  };

  try {
    const result = await dynamoDbLib.call("query", params);
    // Return the matching list of items in response body
    return success(result.Items);
  } catch (e) {
    return failure({ status: false });
  }
}
