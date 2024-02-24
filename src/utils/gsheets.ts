import { google, sheets_v4 } from "googleapis";

export async function appendRow(url: string, comment: string, address: string) {
  var params: sheets_v4.Params$Resource$Spreadsheets$Values$Append = {
    spreadsheetId: process.env.SPREADSHEET_ID,
    range: process.env.RANGE!,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
  };

  var valueRangeBody: sheets_v4.Schema$ValueRange = {
    values: [[url, comment, address]],
  };

  console.log(params, valueRangeBody);

  let credentials = process.env.GOOGLE_APPLICATION_CREDENTIALS
    ? typeof process.env.GOOGLE_APPLICATION_CREDENTIALS === "string"
      ? JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS)
      : process.env.GOOGLE_APPLICATION_CREDENTIALS
    : {};

  const auth = new google.auth.GoogleAuth({
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    credentials,
  });

  const sheet: sheets_v4.Sheets = google.sheets({ version: "v4", auth });
  const ret = await sheet.spreadsheets.values.append(params, {
    body: JSON.stringify(valueRangeBody),
  });
  console.log(ret);
  return ret.status === 200;
}
