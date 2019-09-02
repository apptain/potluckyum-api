import uuid from "uuid";
import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "invitations",
    Item: {
      invitationId: uuid.v1(),
      eventId: data.eventId,
      name: data.name,
      phoneNumber: data.phoneNumber,
      email: data.email,
      secretQuestion: data.secretQuestion,
      secretAnswer: data.secretAnswer,
      willBring: data.willBring,
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
