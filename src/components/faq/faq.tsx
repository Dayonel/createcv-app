'use client';
import { Accordion, AccordionItem, Link } from '@carbon/react';
import styles from './faq.module.scss';

export default function FAQ() {
  return (
    <div className={styles.faq}>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="basis-1/2">
          <div className="grid gap-4">
            <p className="text-3xl md:text-4xl font-bold">
              Frequently Asked Questions
            </p>
            <span className="text-sm">
              Have another question? Contact us by{' '}
              <Link href="mailto:info@createcv.app">email</Link>.
            </span>
          </div>
        </div>
        <div className="basis-1/2">
          <Accordion size="lg">
            <AccordionItem open className="text-sm" title="Is Create CV free?">
              <p>
                Yes, CreateCV is free to use. Use the demo editor and download
                your PDFs unlimited times.
              </p>
            </AccordionItem>
            <AccordionItem className="text-sm" title="How it started?">
              <p>
                CreateCV started as a personal project to build my own CV. Why
                not help others create their outstanding resumes too?
              </p>
            </AccordionItem>
            <AccordionItem className="text-sm" title="Do I need to register?">
              <ul className="grid gap-4">
                <li>No, start creating your resume instantly.</li>
                <li>
                  Your data is stored in your {"browser's"} local storage.
                </li>
              </ul>
            </AccordionItem>
            <AccordionItem className="text-sm" title="Why should I register?">
              <ul className="grid gap-4">
                <li>
                  Access your resumes stored in the cloud from any device.
                </li>
                <li>
                  Unlock a new resumes section where you can manage multiple
                  versions of your PDFs.
                </li>
              </ul>
            </AccordionItem>
            <AccordionItem
              className="text-sm"
              title="How many templates are available?"
            >
              <p>
                Currently there is only one template, more are expected in the
                future.
              </p>
            </AccordionItem>
            <AccordionItem className="text-sm" title="Is my data private?">
              CreateCV does not access, process, or share any of your personal
              data. We take privacy very seriously. This data remains entirely
              under your control and is used solely by you for the purposes of
              printing your resume.
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
