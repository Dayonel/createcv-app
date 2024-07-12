// @ts-ignore
import { SendMailClient } from 'zeptomail';
import { verificationEmail } from '@/components/email/verification-email';

const domain = process.env.NEXT_PUBLIC_SITE_URL;
const token = process.env.ZEPTOMAIL_API_KEY;
const url = 'api.zeptomail.eu/';
let client = new SendMailClient({ url, token });

export const sendVerificationEmail = (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

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
    subject: 'Confirm your CreateCV account',
    htmlbody: verificationEmail(confirmLink),
  });
};
