import React from "react";
import type { Metadata, ResolvingMetadata } from "next";
import { headers } from "next/headers";

type Props = {
  params: { hash: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  console.log({ params, searchParams });
  const host = headers().get("host");
  const protocal = process?.env.NODE_ENV === "development" ? "http" : "https";

  return {
    title: "Meme frame",
    description: "Type in a caption for the image that you see",
    openGraph: {
      images: [
        {
          url: `https://ipfs.io/ipfs/${params.hash}`,
          width: 1200,
          height: 630,
        },
      ],
    },
    other: {
      "fc:frame": "vNext",
      "fc:frame:image": `https://ipfs.io/ipfs/${params.hash}`,
      "fc:frame:input:text": "Enter the caption",
      "fc:frame:button:1": "Submit",
      "fc:frame:post_url": `${protocal}://${host}/api/process_submission`,
    },
  };
}

export default function Page() {
  return <main />;
}