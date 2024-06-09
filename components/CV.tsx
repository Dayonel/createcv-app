'use client';
import Actions from './Actions/Actions';
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
import useColorStore from '@/store/useStore';
import {
  getEmptyParagraph,
  getEmptyText,
  getText,
} from '@/utils/richTextUtils';
import { v4 } from 'uuid';

export default function CV() {
  const json = JSON.stringify(placeholder);
  const parsed = JSON.parse(json);
  const data = useUUID(parsed); // traverse
  const [form, setForm] = useState<Form>(data);
  const [edit, setEdit] = useState(false);
  const { color } = useColorStore();

  useEffect(() => {
    // console.log(JSON.stringify(form));
    useHiddenKey(form, 'key');
    useHiddenKey(form, 'empty');
  }, [form]);

  useEffect(() => {
    setForm({ ...form, color });
  }, [color]);

  const sections = {
    Single,
    Double,
  };

  const addSection = (i: number) => {
    form.sections.splice(i, 0, {
      key: v4(),
      name: getEmptyText('DIVIDER'),
      type: 'Single',
      content: [
        {
          key: v4(),
          title: getEmptyText('Heading 2'),
          subtitle: getEmptyText('Heading 3'),
          date: getEmptyText(new Date().getFullYear().toString()),
          topic: getEmptyText('Text'),
          description: getEmptyParagraph(),
          empty: true,
        },
      ],
      empty: true,
    });
    setForm({ ...form });
  };

  const deleteSection = (key: string) => {
    const i = form.sections.findIndex((f) => f.key === key);
    form.sections.splice(i, 1);
    setForm({ ...form });
  };

  return (
    <form className={`${styles.container} grid grid-cols-2 auto-cols-min`}>
      <div className={styles.header}>
        <div className={`flex flex-col items-start`}>
          <div className={`relative`}>
            {form.title && (
              <RichText
                className="max-w-64 md:max-w-lg font-bold text-3xl"
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
                empty={form.empty}
              ></RichText>
            )}
            {!form.title && (
              <Placeholder
                edit={edit}
                className="font-bold text-3xl"
                placeholder="Heading 1"
                onClick={() =>
                  setForm({
                    ...form,
                    title: getEmptyText('Heading 1'),
                    empty: true,
                  })
                }
                add
              ></Placeholder>
            )}
          </div>
          <div className={`relative`}>
            {form.subtitle && (
              <RichText
                className="max-w-64 md:max-w-lg font-bold text-sm"
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
                empty={form.empty}
              ></RichText>
            )}
            {!form.subtitle && (
              <Placeholder
                edit={edit}
                className="font-bold text-sm"
                placeholder="Heading 3"
                onClick={() =>
                  setForm({
                    ...form,
                    subtitle: getEmptyText('Heading 3'),
                    empty: true,
                  })
                }
                add
              ></Placeholder>
            )}
          </div>
        </div>
        <Actions onEdit={setEdit}></Actions>
        <div className={`${styles.contact}`}>
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
              onRemove={(id) => {
                setForm({
                  ...form,
                  contacts: form.contacts.filter((f) => f.key !== id),
                });
              }}
              wrapperStyle="pl-[6px]"
              handle
              remove
            ></Sortable>
          )}
          <Placeholder
            edit={edit}
            className="text-xs w-fit ml-[6px]"
            placeholder={getText(placeholder.contacts[0].text)}
            onClick={() => {
              form.contacts.push({ ...placeholder.contacts[0], key: v4() });
              setForm({ ...form });
            }}
            add
          ></Placeholder>
        </div>
        <div className="col-span-2 md:col-span-1 relative">
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
              italic
            ></RichText>
          )}
          {!form.summary && (
            <Placeholder
              edit={edit}
              className="text-xs text-justify leading-normal min-h-9 w-full"
              placeholder="Write something..."
              onClick={() => setForm({ ...form, summary: getEmptyParagraph() })}
              add
            ></Placeholder>
          )}
        </div>
      </div>
      <div className={styles.sections}>
        {form.sections &&
          form.sections.map((s, i) => {
            const Component = sections[s.type as keyof typeof sections];
            return (
              <Component
                key={s.key}
                props={s}
                onChange={() => setForm({ ...form })}
                onRemove={(full) => {
                  if (full) {
                    form.sections?.splice(i, 1);
                  }
                  setForm({ ...form });
                }}
                edit={edit}
                onAddSection={() => addSection(i + 1)}
                onDeleteSection={(e) => deleteSection(e)}
                last={
                  form.sections.filter((z) => z.type === s.type).length === 1
                }
              ></Component>
            );
          })}
      </div>
    </form>
  );
}
