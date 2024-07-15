// @ts-ignore
import { SendMailClient } from 'zeptomail';
import { confirmEmail } from '@/components/email/confirm';
import { resetEmail } from '@/components/email/reset';

const domain = process.env.NEXT_PUBLIC_SITE_URL;
const token = process.env.ZEPTOMAIL_API_KEY;
const url = 'api.zeptomail.eu/';
let client = new SendMailClient({ url, token });
const from = {
  name: 'Create CV',
  address: 'info@createcv.app',
};

export const sendConfirmEmail = (email: string, token: string) => {
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
    htmlbody: confirmEmail(token),
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/reset-password?token=${token}`;

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
    htmlbody: resetEmail(resetLink),
  });
};
