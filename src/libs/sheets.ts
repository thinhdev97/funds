import { google } from 'googleapis';
export async function getSponsorshipList() {
  try {
    const target = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
    const jwt = new google.auth.JWT(
      process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      undefined,
      (process.env.GOOGLE_SHEETS_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
      target
    );

    const sheets = google.sheets({ version: 'v4', auth: jwt });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: '2023', // sheet name
    });

    const rows = response.data.values;
    if (rows?.length) {
      return rows.map((row) => ({
        name: row?.[1] || null,
        address: row?.[2] || null,
        sponsorship: row?.[3] || null,
        total: row?.[5] || null, 
      }));
    }
  } catch (err) {
    console.log(err);
  }
  return [];
}