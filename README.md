# Memes Frame

This repository creates a Farcaster Frame, to accept caption responses for images, and conduct meme contests on Frames

## Running this locally
1. Clone this repository
2. Run `bun i`
3. Then, set up a Google Service Account. This would enable the API to append rows to the spreadsheet of your choice. The steps to do the same can be found in Point 4, [here](https://support.google.com/a/answer/7378726?hl=en)
4. Add the JSON that you downloaded into .env, for the key `GOOGLE_APPLICATION_CREDENTIALS`
    a. Note that the key name has to be `GOOGLE_APPLICATION_CREDENTIALS`, as it is automatically picked up by the `googleapis` package when authenticating. In case you get a 401 error, you might want to revisit this configuration.
5. Next, go to the google sheet where you would want to collect the information in.
    a. It should look something like this - [https://docs.google.com/spreadsheets/d/1vWzV6DVFFyZM8iRPDoywXiZ4GPTo-IleuQrZ3xoEKVU/edit#gid=0](https://docs.google.com/spreadsheets/d/1vWzV6DVFFyZM8iRPDoywXiZ4GPTo-IleuQrZ3xoEKVU/edit#gid=0)
    b. Copy the spreadsheet id - the part that follows /d above. In this case it is 1vWzV6DVFFyZM8iRPDoywXiZ4GPTo-IleuQrZ3xoEKVU
    c. Paste the above value in the .env under the key `SPREADSHEET_ID`
    d. Next, get the name of the sheet that you are in. It can be found at the bottom of the Google Spreadsheet, generally named as "Sheet1", "Sheet2" and so on.
    e. Include this in .env against they key `RANGE`
    f. IMP: Lastly, you would have received an email id in the last step, add that email id as a "Editor" to this spreadsheet.
6. Run `bun run dev` to get the server running

## Hosting this
The steps 3 to 5 are same as above. After you get the values for the required environment variables, just add them to your hosting environment. And you should be good.

## How it works?
Wherever you host this, you should get a domain for that.

To use it as a frame, append the IPFS Hash of an image to that, and you should be good.

For example, if you have hosted the app at [https://memes-frame.vercel.app](https://memes-frame.vercel.app) and you have the hash of an image on IPFS, say `QmarPqdEuzh5RsWpyH2hZ3qSXBCzC5RyK3ZHnFkAsk7u2f`, the link to the frame would be [https://memes-frame.vercel.app/QmarPqdEuzh5RsWpyH2hZ3qSXBCzC5RyK3ZHnFkAsk7u2f](https://memes-frame.vercel.app/QmarPqdEuzh5RsWpyH2hZ3qSXBCzC5RyK3ZHnFkAsk7u2f)

## About Contributing
You are free to contribute to this in any manner possible. There are no set guidelines to follow. Raise a PR, we'll explore!