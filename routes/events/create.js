import uuid from "uuid";
import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "events",
    Item: {
      ownerId: event.requestContext.identity.cognitoIdentityId,
      eventId: uuid.v1(),
      name: data.name,
      location: data.location,
      address: data.address,
      city: data.city,
      state: data.state,
      zip: data.zip,
      description: data.description,
      requests: data.requests,
      startTime: data.startTime,
      endTime: data.endTime,
      invitations: data.invitations,
      hosts: data.hosts,
      createdAt: Date.now()
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    return failure({ status: false });
  }
}
