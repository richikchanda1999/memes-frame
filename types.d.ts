// https://github.com/PinataCloud/pinata-fdk/blob/447dc5ea97b7f8b1101993018e4a8c6f4c96ebcc/src/core/types.ts

declare type PinFileOptions = {
  pinataMetadata?: {
    name?: string;
    keyvalues?: Record<string, string>;
  };
  pinataOptions?: {
    cidVersion: number;
  };
};

/** The permitted types of `buttonIndex` in a Frame POST payload response */
declare type ActionIndex = 1 | 2 | 3 | 4;

declare type FrameInputMetadata = {
  text: string;
};

declare type UserData = {
  fid: number;
  username: string;
  pfp: string;
  bio: string;
};

declare type PinataConfig = {
  pinata_jwt: string;
  pinata_gateway: string;
};

declare type FrameHTMLType = {
  buttons?: [FrameButtonMetadata, ...FrameButtonMetadata[]];
  image?: { url: string };
  cid?: string;
  input?: FrameInputMetadata;
  post_url?: string;
  refresh_period?: number;
  aspect_ratio?: "1.91:1" | "1:1";
} & ({ image: { url: string } } | { cid: string });

declare type FrameButtonMetadata = {
  label: string;
  action?: "post" | "post_redirect" | "mint" | "link";
  target?: string;
};

declare type FrameMetadataResponse = Record<string, string>;

declare type AddressReturnType<
  Options extends { fallbackToCustodyAddress?: boolean } | undefined
> = Options extends { fallbackToCustodyAddress: true }
  ? `0x${string}`
  : `0x${string}` | null;

/**
 * The body of valid `POST` requests triggered by Frame Buttons in other apps, when formatted as json, conforming to the Frames spec
 */
declare type FrameActionPayload = {
  /** once validated, should be the only trusted source for accessing frame data */
  trustedData: { messageBytes: string };
  /**
   * untrustedData can be faked by anyone by hitting your frame with a POST with an arbitrary payload. We recommend only using
   * trustedData to do actions.
   */
  untrustedData: {
    /** the fid of the user who did the message. */
    fid: number;
    /** the url of the original frame, must be under 256 bytes */
    url: string;
    /** the hash of the `Farcaster` `AddFrameActionMessage` */
    messageHash: string;
    /** A Farcaster epoch timestamp (not UNIX timestamp) */
    timestamp: number;
    /** The Farcaster network is on network = 1 */
    network: number;
    /** the button index, starting from 1 that the user pressed to invoke this POST */
    buttonIndex: ActionIndex;
    /** the unique identifiers of the Farcaster cast, via the user who casted's `fid` and the cast `hash`, which is a unique identifier */
    castId: { fid: number; hash: string };
    /** text input by the user into any input provided, "" if requested and no input, undefined if input not requested */
    inputText?: string;
  };
};
