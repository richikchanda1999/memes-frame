import { NextRequest, NextResponse } from "next/server";
import { getAddressForFid, validateFrameMessage } from "src/utils/farcaster";
import { appendRow } from "src/utils/gsheets";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const data = await req.json();

  const caption = data?.untrustedData?.inputText;
  const url = data?.untrustedData?.url;

  const { isValid, message } = await validateFrameMessage(data);

  if (isValid) {
    const fid = message?.data?.fid;
    if (fid) {
      const address = await getAddressForFid(fid);
      if (address) {
        // TODO: Store content against this address
        const append = await appendRow(url, caption, address);
        if (append) return NextResponse.redirect(`${url}/thanks`, 302);
        else
          console.log("Error adding data to speadsheet", {
            url,
            caption,
            address,
          });
      } else console.log("Could not find address for fid = ", fid);
    } else console.log("Not fid = ", fid, " present for valid message");
  }

  console.log("Invalid message", JSON.stringify(data));
  return NextResponse.redirect(`${url}/error`, 302);
}
