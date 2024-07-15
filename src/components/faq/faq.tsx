'use client';
import { Accordion, AccordionItem, Link } from '@carbon/react';
import styles from './faq.module.scss';

export default function FAQ() {
  return (
    <div className={styles.faq}>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="basis-1/2">
          <div className="grid gap-4">
            <p className="text-3xl md:text-4xl">Frequently Asked Questions</p>
            <span className="text-sm">
              Have another question? Contact us by{' '}
              <Link href="mailto:info@createcv.app">email</Link>.
            </span>
          </div>
        </div>
        <div className="basis-1/2">
          <Accordion size="lg">
            <AccordionItem
              open
              className="text-sm"
              title="What do I get exactly?"
            >
              <ul className="grid gap-4">
                <li>Download your PDF documents without watermark.</li>
                <li>Access your PDFs stored in the cloud from any device.</li>
                <li>Download your PDFs unlimited times.</li>
                <li>Free access to new templates created in the future.</li>
                <li>Manage multiple versions of your PDFs.</li>
                <li>Lifetime license.</li>
              </ul>
            </AccordionItem>
            <AccordionItem
              className="text-sm"
              title="How many templates are available?"
            >
              Currently there is only one template, more are expected in the
              future.
            </AccordionItem>
            <AccordionItem
              className="text-sm"
              title="What other features can I expect?"
            >
              <p className="mb-4">
                The idea is to expand the project with all the necessary tools
                to get an outstanding resume that get you hired.
              </p>
              <p className="mb-4">These are some of the ideas:</p>
              <ul className="grid gap-4">
                <li>Cover letters.</li>
                <li>AI resume writer.</li>
                <li>Share a read-only version as a website portfolio.</li>
                <li>Add your own logos.</li>
              </ul>
            </AccordionItem>
            <AccordionItem
              className="text-sm"
              title="Can I delete all my data?"
            >
              Sure, delete all instances of your PDFs, once you delete them,
              they are deleted forever.
            </AccordionItem>
            <AccordionItem className="text-sm" title="Is my data private?">
              We take privacy very seriously, your data is yours. We {"don't"}{' '}
              share your data with third parties.
            </AccordionItem>
            <AccordionItem className="text-sm" title="Can I get a refund?">
              After {"you've"} got access to the full version, is yours forever,
              so it {"can't"} be refunded.
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
