const nodemailer = require('nodemailer'); //importing nodemailer
const { google } = require('googleapis'); //importing google api

//initialisig constants
const cid = '116745916383-07qdk4u5ep7ifgq347tehf15kdfb1rvo.apps.googleusercontent.com';
const csecret = 'Za_ArlUc0X_mNwV0oSbVYywn';
const ruri = 'https://developers.google.com/oauthplayground';
const rtoken = '1//04gw8CeU8C00CCgYIARAAGAQSNwF-L9Iruuk0LrCEyB0jeT21T-IoiaQ7MHSFakAOXQpAfEqa2i0V7GGrQ4eZb8A4QvJx0Gw2pn8';

//creating new oauth2 object
const oAuth2Client = new google.auth.OAuth2(
  cid,
  csecret,
  ruri
);
oAuth2Client.setCredentials({ refresh_token: rtoken });

//creating mfunction to send mails
async function sendMail() {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    //transporting mails function
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'adamyaadn14@gmail.com',
        clientId: cid,
        clientSecret: csecret,
        refreshToken: rtoken,
        accessToken: accessToken,
      },
    });

    //setting mail options
    const mailOptions = {
      from: 'Adamyaa Dali <adamyaadn14@gmail.com>',//name and mailid of the sender
      to: 'adamyaadn.is18@rvce.edu.in',//recipient mail id
      subject: 'Quickwork Internship Assignment',//subject of the mail
      text: 'I really hope you get it',//mailbody
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

sendMail()
  .then((result) => console.log('Email sent successfully', result))//success message
  .catch((error) => console.log(error.message));//error message