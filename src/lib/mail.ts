const baseUrl = process.env.FUNCTIONS_EMAIL_URL;
const from = 'Create CV <info@createcv.app>';

export const sendConfirmEmail = async (email: string, token: string) => {
  const response = await fetch(`${baseUrl}/confirm/${token}`);
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  const html = await response.text();

  await send(email, `${token} - Your CreateCV verification code`, html);
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const response = await fetch(`${baseUrl}/reset-password/${token}`);
  if (!response.ok) {
    throw new Error(`Template Response status: ${response.status}`);
  }
  const html = await response.text();

  await send(email, 'Reset your CreateCV password', html);
};

const send = async (to: string, subject: string, html: string) => {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Resend API Error: ${res.status} - ${error}`);
  }

  return res.json();
};
