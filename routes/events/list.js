import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";

export async function main(event, context) {
  const params = {
    TableName: "events",
    KeyConditionExpression: "ownerId= :userId",
    ExpressionAttributeValues: {
      ":userId": event.requestContext.identity.cognitoIdentityId
    }
  };

  try {
    //console.log(JSON.parse(event));
    const result = await dynamoDbLib.call("query", params);
    //console.log(result.toString());
    // Return the matching list of items in response body
    return success(result.Items);
  } catch (e) {
    console.log("Error: " + e.toString());
    return failure({ status: false });
  }
}
