import React from "react";
import type { Metadata, ResolvingMetadata } from "next";
import { headers } from "next/headers";
import { cid } from "is-ipfs";
import Image from "next/image";

type Props = {
  params: { hash: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const host = headers().get("host");
  const protocal = process?.env.NODE_ENV === "development" ? "http" : "https";

  if (!cid(params.hash)) {
    // Return error frame!
    return {
      title: "Ah oh!",
      description: "Could not find the image!",
      openGraph: {
        images: [
          {
            url: `${protocal}://${host}/error.webp`,
            width: 1200,
            height: 630,
          },
        ],
      },
      other: {
        "fc:frame": "vNext",
        "fc:frame:image": `${protocal}://${host}/error.webp`,
      },
    };
  }

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

export default function Page({ params }: Props) {
  const isValid = cid(params.hash)

  return (
    <main className="flex h-100vh w-100vw justify-center items-center">
      <Image
        src={isValid ? `https://ipfs.io/ipfs/${params.hash}` : '/error.webp'}
        width={500}
        height={500}
        alt="IPFS Image"
      />
    </main>
  );
}
