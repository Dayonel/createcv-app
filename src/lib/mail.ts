// @ts-ignore
import { SendMailClient } from 'zeptomail';

const token = `Zoho-enczapikey ${process.env.ZEPTOMAIL_API_KEY}`;
const url = 'api.zeptomail.eu/';
let client = new SendMailClient({ url, token });
const from = {
  name: 'Create CV',
  address: 'info@createcv.app',
};
const baseUrl = process.env.FUNCTIONS_EMAIL_URL;

export const sendConfirmEmail = async (email: string, token: string) => {
  const response = await fetch(`${baseUrl}/confirm/${token}`);
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  const body = await response.text();

  client.sendMail({
    from,
    to: [
      {
        email_address: {
          address: email,
        },
      },
    ],
    subject: `${token} - Your CreateCV verification code`,
    htmlbody: body,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const response = await fetch(`${baseUrl}/reset-password/${token}`);
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  const body = await response.text();

  client.sendMail({
    from,
    to: [
      {
        email_address: {
          address: email,
        },
      },
    ],
    subject: 'Reset your CreateCV password',
    htmlbody: body,
  });
};
