// @ts-ignore
import { SendMailClient } from 'zeptomail';
import { confirmEmail } from '@/components/email/confirm';

const domain = process.env.NEXT_PUBLIC_SITE_URL;
const token = process.env.ZEPTOMAIL_API_KEY;
const url = 'api.zeptomail.eu/';
let client = new SendMailClient({ url, token });

export const sendConfirmEmail = (email: string, token: string) => {
  client.sendMail({
    from: {
      name: 'Create CV',
      address: 'info@createcv.app',
    },
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
