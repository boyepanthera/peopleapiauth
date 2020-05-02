import { google } from "googleapis";
import express from 'express';
let app = express();
import dotenv from 'dotenv';
dotenv.config();

console.log(process.env.access_token)

const OAuth2Client = new google.auth.OAuth2(
  process.env.clientID,
  process.env.clientSecret,
  'http://localhost'
);

OAuth2Client.setCredentials({
  access_token: process.env.access_token,
  refresh_token: process.env.refresh_token,
  expiry_date: process.env.expiry_date,
});

const people = google.people({
  version: "v1",
  auth: OAuth2Client,
});

people.people
  .createContact({
    requestBody: {
      emailAddresses: [{ value: "john@doe.com" }],
      names: [
        {
          displayName: "John Doe",
          familyName: "Doe",
          givenName: "John",
        },
      ],
      phoneNumbers: [
        {
          value: "+2349028320494",
        },
      ],
    },
  })
  .then((newContact) => console.log(newContact));

app.get('/', (req, res)=> {
    res.status(200).json({
        message: 'express server running here!'
    })
})

app.listen(3000, ()=> console.log('server running!!!'))