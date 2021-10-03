const{google} = require('googleapis')
const path = require('path')
const fs = require('fs')

const CLIENT_ID = '342211455545-6lm9ofv2vlofnbl4tuf2877ib4hv0spa.apps.googleusercontent.com'
const CLIENT_SECRET = 'b9VqHGW9YSqDGN0uaTLNZ5Oh';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

const REFRESH_TOKEN = '1//04RT-U6YWmBKLCgYIARAAGAQSNwF-L9Ir_RIleKxIlM5YEeAYGEbtUDzuwnuUnriSfp7ImHjUx1HfSmeVRpSkbsDhREI-IcBwOFw'


const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);
oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN} )


const drive = google.drive({
    version: 'v3',
    auth: oauth2Client,
  });
  
  /* 
  filepath which needs to be uploaded
  Note: Assumes example.jpg file is in root directory, 
  though this can be any filePath
  */
  const filePath = path.join(__dirname, 'flutter.jpg');
  
  async function uploadFile() {
    try {
      const response = await drive.files.create({
        requestBody: {
          name: 'flutter.jpg', //This can be name of your choice
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
  
    //uploadFile();

    async function deleteFile() {
        try {
          const response = await drive.files.delete({
            fileId: '10BD4hArs9SGzCtKTT5jurIZ7vVJbDHCp',
          });
          console.log(response.data, response.status);
        } catch (error) {
          console.log(error.message);
        }
      }
      
       //deleteFile();


       async function generatePublicUrl() {
        try {
          const fileId = '1ZjwB7rqxltx_59TIx857Y3IW2VIGzsJK';
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