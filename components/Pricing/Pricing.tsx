'use client';
import { Button, Tag, Tile } from '@carbon/react';
import styles from './Pricing.module.scss';
import { ArrowRight } from '@carbon/icons-react';

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
        <Tile>
          <div className="flex flex-col gap-5 min-w-56">
            <div className="flex flex-col">
              <span className={styles.title}>Full version</span>
              <span className="text-2xl font-bold">€ 4.99</span>
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
            <Button className="!w-full" kind="tertiary" renderIcon={ArrowRight}>
              Get full version
            </Button>
          </div>
        </Tile>
      </div>
    </div>
  );
}
