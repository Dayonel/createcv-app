'use client';
import { Launch } from '@carbon/icons-react';
import { ClickableTile, Tag } from '@carbon/react';
import styles from './Pricing.module.scss';

export default function Pricing() {
  return (
    <div className={styles.purchase}>
      <div className="flex flex-col items-center gap-12 w-full">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-4xl md:text-5xl">Pricing</h2>
          <span className="text-center text-base">
            Your contribution help us create new templates and features.
          </span>
        </div>
        <ClickableTile renderIcon={Launch}>
          <div className="flex flex-col gap-5 min-w-40">
            <div className="flex flex-col">
              <span className={styles.title}>Full version</span>
              <span className="text-2xl font-bold">€ 4.99</span>
            </div>

            <ul className="list-none p-0 gap-2 mb-5">
              <li>No watermark</li>
              <li>Stored in the cloud</li>
              <li>Unlimited downloads</li>
              <li>Unlocks all future templates</li>
              <li className='mt-2'>
                <Tag
                  id="lifetime"
                  className="!m-0 pointer-events-none"
                  type="green"
                >
                  Lifetime license
                </Tag>
              </li>
            </ul>
            <span className={styles.payment}>one-off payment</span>
          </div>
        </ClickableTile>
      </div>
    </div>
  );
}
