const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

const CLIENT_ID = 'Masukkan client id anda';
const CLIENT_SECRET = 'Masukkan client secret anda';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

const REFRESH_TOKEN = 'Masukkan Refresh Token';

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
  version: 'v3',
  auth: oauth2Client,
});

/* 
filepath which needs to be uploaded
Note: Assumes example.jpg file is in root directory, 
though this can be any filePath
*/
const filePath = path.join(__dirname, 'milize.jpg'); // path your file will upload to google drive

async function uploadFile() {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: 'Masukkan path/lokasi file yang akan diupload ke google drive (format foto harus disesuaikan dengan mimeType)', //This can be name of your choice
        mimeType: 'image/jpg',
      },
      media: {
        mimeType: 'image/jpg',
        body: fs.createReadStream(filePath),
      },
    });

    console.log(response.data);
  } catch (error) {
    console.log(error.message);
  }
}

// uploadFile();

async function deleteFile() {
    try {
        const response = await drive.files.delete({
            fileId: 'Masukkan id file dari file yang sudah diupload',
        });
        console.log(response.data, response.status);
    } catch (error) {
        console.log(error.message);
    }
}

// deleteFiile();

async function generatePublicUrl() {
  try {
    const fileId = 'Masukkan id file dari file yang sudah diupload';
    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });

    /* 
    webViewLink: View the file in browser
    webContentLink: Direct download link 
    */
    const result = await drive.files.get({
      fileId: fileId,
      fields: 'webViewLink, webContentLink',
    });
    console.log(result.data);
  } catch (error) {
    console.log(error.message);
  }
}
generatePublicUrl();
