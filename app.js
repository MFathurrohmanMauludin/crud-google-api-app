// const {google} = require('googleapis');
// const path = require('path');
// const fs = require('fs');

// const CLIENT_ID = '914645778845-qeslk39h7tqjg1co8hsb4ib6eja9ilp0.apps.googleusercontent.com';
// const CLIENT_SECRET = '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';
// const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

// const REFRESH_TOKEN = '1//04LRmJ0dM6MVSCgYIARAAGAQSNwF-L9Ir-jIhS3nGsDC3NT2dgqhadTgNiusxLL73Hjy-K_IsPZ0trTmkNfdFiSzSyQ7D7uao3CM';

// const oauth2Client = new google.auth.OAuth2(
//     CLIENT_ID,
//     CLIENT_SECRET,
//     REDIRECT_URI
// );

// oauth2Client.setCredentials({referesh_token: REFRESH_TOKEN});

// const drive = google.drive({
//     version: 'v3',
//     auth: oauth2Client
// });

// const filePath = path.join(__dirname, 'milize.jpg');

// async function uploadFile() {
//     try {
//         const response = await drive.files.create({
//             requestBody: {
//                 name: 'vladilena-milize.jpg',
//                 mimeType: 'image/jpg'
//             },
//             media: {
//                 mimeType: 'image/jpg',
//                 body: fs.createReadStream(filePath)
//             }
//         });

//         console.log(response.data);
//     } catch (error) {
//         console.log(error.message);    
//     }
// }

// uploadFile();

const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

const CLIENT_ID = '914645778845-qeslk39h7tqjg1co8hsb4ib6eja9ilp0.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

const REFRESH_TOKEN = '1//04puvzRPU8RAXCgYIARAAGAQSNwF-L9IrwVN7-7ta0dmQnUENayUKQWYphJCHfEwE7Wf4phBIZy9mTmhAyEhZDdIw8ixigR8zPKs';

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
        name: 'vladilena-milize.jpg', //This can be name of your choice
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
            fileId: '14ou3pUqZoPOWav7REsm5hzi9PwRgqs4N',
        });
        console.log(response.data, response.status);
    } catch (error) {
        console.log(error.message);
    }
}

// deleteFiile();

async function generatePublicUrl() {
  try {
    const fileId = '12zepA2nY56JV3aaNVw4S-3L-Jp38IP2W';
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
