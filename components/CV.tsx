'use client';
import Download from './Download';
import styles from './CV.module.scss';
import { useEffect, useState } from 'react';
import Contact from './Contact';
import RichText from './RichText/RichText';
import Single from './Section/Single';
import Double from './Section/Double';
import placeholder from '../data/placeholder.json';
import { Form } from '@/types/Form';
import { useUUID } from '@/hooks/useUUID';
import { useHiddenKey } from '@/hooks/useHiddenKey';

export default function CV() {
  const json = JSON.stringify(placeholder);
  const parsed = JSON.parse(json);
  const data = useUUID(parsed); // traverse
  useHiddenKey(data, 'key');
  useHiddenKey(data, 'type');
  const [form, setForm] = useState<Form>(data);

  useEffect(() => {
    console.log(JSON.stringify(form));
  }, [form]);

  const sections = {
    Single,
    Double,
  };

  return (
    <form className={`${styles.container} grid grid-cols-2 auto-cols-min`}>
      <div className={styles.header}>
        <div className="flex flex-col items-center md:items-start">
          {form.title && (
            <RichText
              className="max-w-xs md:max-w-lg font-bold text-3xl text-center md:text-start"
              props={form.title}
              onChange={(e) => {
                setForm({ ...form, title: e });
              }}
              onRemove={() => {
                delete form.title;
                setForm({ ...form });
              }}
              input
            ></RichText>
          )}
          {form.subtitle && (
            <RichText
              className="max-w-xs md:max-w-lg font-bold text-sm text-center md:text-start"
              props={form.subtitle}
              onChange={(e) => {
                setForm({ ...form, subtitle: e });
              }}
              onRemove={() => {
                delete form.subtitle;
                setForm({ ...form });
              }}
              input
            ></RichText>
          )}
        </div>
        <Download></Download>
        <div className={styles.contact}>
          {form.contacts &&
            form.contacts.map((contact, i) => {
              return (
                <Contact
                  key={contact.key}
                  props={contact}
                  onChange={() => setForm({ ...form })}
                  onRemove={() => {
                    form.contacts!.splice(i, 1);
                    if (form.contacts?.length == 0) {
                      delete form.contacts;
                    }
                    setForm({ ...form });
                  }}
                ></Contact>
              );
            })}
        </div>
        {form.summary && (
          <RichText
            props={form.summary}
            onChange={(e) => setForm({ ...form, summary: e })}
            className="text-justify"
            onRemove={() => {
              delete form.summary;
              setForm({ ...form });
            }}
          ></RichText>
        )}
      </div>
      <div className={styles.sections}>
        {form.sections &&
          form.sections.map((m, i) => {
            const Component = sections[m.type as keyof typeof sections];
            return (
              <Component
                key={m.key}
                props={m}
                onChange={() => setForm({ ...form })}
                onRemove={() => {
                  m.content?.forEach((f, i) => {
                    if (Object.keys(f).length == 0) {
                      m.content?.splice(i, 1);
                    }
                  });
                  if (m.content?.length == 0) {
                    delete m.content;
                  }
                  if (Object.keys(m).length == 0) {
                    form.sections?.splice(i, 1);
                  }
                  setForm({ ...form });
                }}
              ></Component>
            );
          })}
      </div>
    </form>
  );
}
