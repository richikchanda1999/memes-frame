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
    title: "Ah oh!",
    description: "Some error occurred!",
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
      "fc:frame:button:1": "Restart!",
      "fc:frame:post_url": `${protocal}://${host}/${params.hash}`,
    },
  };
}

export default function Page() {
  return <main />;
}
