'use client';
import {
  Button,
  InlineLoading,
  Tag,
  Tile,
  ToastNotification,
} from '@carbon/react';
import styles from './Pricing.module.scss';
import { ArrowRight } from '@carbon/icons-react';
import { useState } from 'react';
import { checkoutWithStripe } from '@/utils/stripe/server';
import router from 'next/router';
import getStripe from '@/utils/stripe/client';

export default function Pricing() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleCheckout = async () => {
    setError(false);
    setLoading(true);

    try {
      const { errorRedirect, sessionId } = await checkoutWithStripe();
      if (errorRedirect) {
        return router.push(errorRedirect);
      }

      if (!sessionId) {
        setError(true);
        return;
      }

      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.purchase}>
        <div className="flex flex-col items-center gap-12 w-full">
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-4xl md:text-5xl">Pricing</h2>
            <span className="text-center text-base">
              Your contribution help us create new templates and features.
            </span>
          </div>
          <Tile>
            <div className="flex flex-col gap-5 min-w-56">
              <div className="flex flex-col gap-2">
                <span className={styles.title}>Full version</span>
                <span className="text-3xl font-bold">€ 4.99</span>
              </div>

              <ul className="list-none p-0 gap-2 mb-5">
                <li>No watermark</li>
                <li>Stored in the cloud</li>
                <li>Unlimited downloads</li>
                <li>Unlocks all future templates</li>
                <li>Multiple PDF versions</li>
                <li className="mt-2">
                  <Tag
                    id="lifetime"
                    className="!m-0 pointer-events-none"
                    type="green"
                  >
                    Lifetime license
                  </Tag>
                </li>
              </ul>
              <hr></hr>
              <span className={styles.payment}>one-off payment</span>

              <Button
                className="!w-full items-center h-[50px]"
                kind="tertiary"
                renderIcon={ArrowRight}
                onClick={handleCheckout}
                disabled={loading}
              >
                <div className="flex items-center gap-2">
                  {loading && <InlineLoading></InlineLoading>}
                  <span className="text-sm whitespace-nowrap">
                    Get full version
                  </span>
                </div>
              </Button>
            </div>
          </Tile>
        </div>
        {error && (
          <ToastNotification
            title="An unknown error occurred"
            className="fixed bottom-4 right-4 pb-4 z-50"
            timeout={5000}
          >
            <span className="text-xs">
              Please try again later or contact support.
            </span>
          </ToastNotification>
        )}
      </div>
    </>
  );
}
