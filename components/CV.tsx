'use client';
import Actions from './Actions';
import styles from './CV.module.scss';
import { useEffect, useState } from 'react';
import Contact, { ContactProps } from './Contact';
import RichText from './RichText/RichText';
import Single from './Section/Single';
import Double from './Section/Double';
import placeholder from '../data/placeholder.json';
import { Form } from '@/types/Form';
import { useUUID } from '@/hooks/useUUID';
import { useHiddenKey } from '@/hooks/useHiddenKey';
import Sortable from './DndKit/Sortable';
import { Placeholder } from './Placeholder';

export default function CV() {
  const json = JSON.stringify(placeholder);
  const parsed = JSON.parse(json);
  const data = useUUID(parsed); // traverse
  useHiddenKey(data, 'key');
  const [form, setForm] = useState<Form>(data);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    // console.log(JSON.stringify(form));
  }, [form]);

  const sections = {
    Single,
    Double,
  };

  return (
    <form className={`${styles.container} grid grid-cols-2 auto-cols-min`}>
      <div className={styles.header}>
        <div className="flex flex-col items-center md:items-start mt-3">
          <div className="relative">
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
                remove
              ></RichText>
            )}
            {!form.title && <Placeholder edit={edit}></Placeholder>}
          </div>
          <div className={`relative`}>
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
                remove
              ></RichText>
            )}
            {!form.subtitle && <Placeholder wrapperStyle="-bottom-4 translate-y-full -translate-x-full" edit={edit}></Placeholder>}
          </div>
        </div>
        <Actions onEdit={setEdit}></Actions>
        <div className={styles.contact}>
          {form.contacts && (
            <Sortable
              initialItems={form.contacts}
              renderItem={({ props, onControlsVisible }: ContactProps) => (
                <Contact
                  props={props}
                  onChange={() => setForm({ ...form })}
                  onControlsVisible={onControlsVisible}
                ></Contact>
              )}
              onSort={(e) => {
                setForm({
                  ...form,
                  contacts: form.contacts!.sort(
                    (a, b) => e.indexOf(a.key) - e.indexOf(b.key)
                  ),
                });
              }}
              onRemove={(id) =>
                setForm({
                  ...form,
                  contacts: form.contacts?.filter((f) => f.key !== id),
                })
              }
              wrapperStyle="pl-[6px]"
              handle
              remove
            ></Sortable>
          )}
          <Placeholder edit={edit}></Placeholder>
        </div>
        <div className="relative">
          {form.summary && (
            <RichText
              props={form.summary}
              onChange={(e) => setForm({ ...form, summary: e })}
              className="text-justify h-fit"
              onRemove={() => {
                delete form.summary;
                setForm({ ...form });
              }}
              remove
            ></RichText>
          )}
          {!form.summary && <Placeholder edit={edit}></Placeholder>}
        </div>
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
                    if (
                      Object.keys(f).filter((f) => f !== 'type').length == 0
                    ) {
                      m.content?.splice(i, 1);
                    }
                  });
                  if (m.content?.length == 0) {
                    delete m.content;
                  }
                  if (Object.keys(m).filter((f) => f !== 'type').length == 0) {
                    form.sections?.splice(i, 1);
                  }
                  setForm({ ...form });
                }}
                edit={edit}
              ></Component>
            );
          })}
      </div>
      <Placeholder
        wrapperStyle="-bottom-4 translate-y-full -translate-x-full"
        edit={edit}
      ></Placeholder>
    </form>
  );
}
