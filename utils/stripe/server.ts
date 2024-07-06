'use server';
import { auth } from '@/auth';
import { stripe } from '@/utils/stripe/config';

type CheckoutResponse = {
  errorRedirect?: string;
  sessionId?: string;
};

export async function checkoutWithStripe(): Promise<CheckoutResponse> {
  const authentication = await auth();

  // Create a checkout session in Stripe
  let session;
  try {
    session = await stripe.checkout.sessions.create({
      customer_email: authentication?.user?.email || undefined,
      allow_promotion_codes: true,
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/activate`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
    });
  } catch (err) {
    console.error(err);
    throw new Error('Unable to create checkout session.');
  }

  // Instead of returning a Response, just return the data or error.
  if (session) {
    return { sessionId: session.id };
  } else {
    throw new Error('Unable to create checkout session.');
  }
}
