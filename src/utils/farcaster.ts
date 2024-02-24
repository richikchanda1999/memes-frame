import { getSSLHubRpcClient, Message } from "@farcaster/hub-nodejs";

// https://github.com/PinataCloud/pinata-fdk/blob/447dc5ea97b7f8b1101993018e4a8c6f4c96ebcc/src/core/validateFrameMessage.ts
/**
 * Validates a frame message by querying a Farcaster hub.
 * @param body The frame action payload containing the message to validate.
 * @returns A Promise that resolves with an object containing whether the message signature is valid and the validated message.
 */
export async function validateFrameMessage(body: FrameActionPayload): Promise<{
  isValid: boolean;
  message: Message | undefined;
}> {
  const HUB_URL = "hub-grpc.pinata.cloud";
  const client = getSSLHubRpcClient(HUB_URL);
  const frameMessage = Message.decode(
    Buffer.from(body?.trustedData?.messageBytes || "", "hex")
  );
  const result = await client.validateMessage(frameMessage);
  if (result.isOk() && result.value.valid) {
    return {
      isValid: result.value.valid,
      message: result.value.message,
    };
  } else {
    return {
      isValid: false,
      message: undefined,
    };
  }
}

// https://github.com/PinataCloud/pinata-fdk/blob/447dc5ea97b7f8b1101993018e4a8c6f4c96ebcc/src/core/getAddressForFid.ts
/**
 * This function returns the connected Ethereum address for an FID.
 * @param fid: The FID of a user.
 * @returns The Ethereum address of the user.
 */
export const getAddressForFid = async (fid: number) => {
  const res = await fetch(
    `https://hub.pinata.cloud/v1/verificationsByFid?fid=${fid}`
  );
  const json = await res.json();

  const address = json.messages.map(
    (m: any) => m.data.verificationAddAddressBody.address
  );
  return address[0];
};
