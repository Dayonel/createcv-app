'use client';
import { ClickableTile, Tag } from '@carbon/react';
import styles from './page.module.scss';
import { ArrowRight } from '@carbon/icons-react';
import { cn } from '@/lib/utils';
import { useId } from 'react';

export default function Resumes() {
  return (
    <div className="container">
      <div className="page">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Resumes</h1>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <ClickableTile className={styles.tile} renderIcon={ArrowRight}>
            <span>Resume 1</span>
            <p className={cn('text-xs line-clamp-2', styles.summary)}>
              Highly motivated full-stack developer with +6 years of experience
              building and maintaining web applications. Proven ability to
              deliver high-quality work following best practices and
              continiously learning the latest advancements on the web.
            </p>
            <Tag
              id={useId()}
              className="!w-fit pointer-events-none !mt-auto"
              type="green"
            >
              Template 1
            </Tag>
          </ClickableTile>

          <ClickableTile className={styles.tile} renderIcon={ArrowRight}>
            <span>Resume 2</span>
            <p className={cn('text-xs line-clamp-2', styles.summary)}>
              Highly motivated full-stack developer with +6 years of experience
              building and maintaining web applications. Proven ability to
              deliver high-quality work following best practices and
              continiously learning the latest advancements on the web.
            </p>
            <Tag
              id={useId()}
              className="!w-fit pointer-events-none !mt-auto"
              type="green"
            >
              Template 1
            </Tag>
          </ClickableTile>

          <ClickableTile className={styles.tile} renderIcon={ArrowRight}>
            <span>Resume 3</span>
            <p className={cn('text-xs line-clamp-2', styles.summary)}>
              Highly motivated full-stack developer with +6 years of experience
              building and maintaining web applications. Proven ability to
              deliver high-quality work following best practices and
              continiously learning the latest advancements on the web.
            </p>
            <Tag
              id={useId()}
              className="!w-fit pointer-events-none !mt-auto"
              type="green"
            >
              Template 1
            </Tag>
          </ClickableTile>

          <ClickableTile className={styles.tile} renderIcon={ArrowRight}>
            <span>Resume 4</span>
            <p className={cn('text-xs line-clamp-2', styles.summary)}>
              Highly motivated full-stack developer with +6 years of experience
              building and maintaining web applications. Proven ability to
              deliver high-quality work following best practices and
              continiously learning the latest advancements on the web.
            </p>
            <Tag
              id={useId()}
              className="!w-fit pointer-events-none !mt-auto"
              type="green"
            >
              Template 1
            </Tag>
          </ClickableTile>
        </div>
      </div>
    </div>
  );
}
