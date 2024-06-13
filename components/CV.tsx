'use client';
import Actions from './Actions/Actions';
import styles from './CV.module.scss';
import { useEffect, useMemo, useState } from 'react';
import Contact, { ContactProps } from './Contact/Contact';
import RichText from './RichText/RichText';
import Single from './Section/Single';
import Double from './Section/Double';
import placeholder from '../data/placeholder.json';
import { traverseUUID } from '@/utils/traverseUUID';
import Sortable from './DndKit/Sortable';
import Placeholder from './Placeholder/Placeholder';
import useColorStore from '@/store/useStore';
import { getEmptyParagraph, getEmptyText } from '@/utils/richTextUtils';
import { v4 } from 'uuid';
import ContactPlaceholder from './Contact/ContactPlaceholder';
import Transition from './Animations/Transition';
import { useUndo } from '@/hooks/useUndo';
import { Form } from '@/types/Form';
import AddPlaceholder from './Placeholder/AddPlaceholder';

export default function CV() {
  const data = traverseUUID(placeholder); // traverse
  const { state, setState, undo, redo, canUndo, canRedo } = useUndo(
    JSON.stringify(data)
  );
  const [form, setForm] = useState<Form>(JSON.parse(state));
  const [edit, setEdit] = useState(false);
  const { color } = useColorStore();
  const [updateHistory, setUpdateHistory] = useState(false);
  const [mounted, setMounted] = useState(false);

  // every update
  useEffect(() => {
    if (!mounted) return;

    if (updateHistory) {
      setState(JSON.stringify(form));
    }
    setUpdateHistory(true);

    localStorage.setItem('form', JSON.stringify(form, replacer));

    // console.log(JSON.stringify(form, replacer));
  }, [form]);

  const replacer = (key: string, value: any) =>
    key === 'key' || key === 'empty' ? undefined : value;

  useEffect(() => {
    setUpdateHistory(false);
    setForm(JSON.parse(state));
  }, [state]);

  useEffect(() => {
    setUpdateHistory(false);
    setForm({ ...form, color });
  }, [color]);

  // saved form (local)
  useEffect(() => {
    try {
      const userFrom = localStorage.getItem('form');
      if (!userFrom) return;

      setForm((prev) => (prev = traverseUUID(JSON.parse(userFrom))));
    } finally {
      setMounted(true);
    }
  }, []);

  const addSection = () => {
    const i = form.sections.filter((f) => f.type === 'Single').length;
    form.sections.splice(i, 0, {
      key: v4(),
      name: getEmptyText('SECTION'),
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

  const sections = {
    Single,
    Double,
  };

  const deleteSection = (key: string) => {
    const i = form.sections.findIndex((f) => f.key === key);
    form.sections.splice(i, 1);
    setForm({ ...form });
  };

  return (
    <form className={`${styles.container} grid grid-cols-2 auto-cols-min cv`}>
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
              ></Placeholder>
            )}
          </div>
        </div>
        <Actions
          canUndo={canUndo}
          canRedo={canRedo}
          onUndo={() => undo()}
          onRedo={() => redo()}
          onEdit={setEdit}
        ></Actions>
        <div className="flex flex-col gap-1">
          <div className={`${styles.contact}`}>
            {form.contacts && (
              <Sortable
                initialItems={form.contacts}
                renderItem={({ props, onControlsVisible }: ContactProps) => (
                  <>
                    {props && (
                      <Contact
                        props={props}
                        onChange={() => setForm({ ...form })}
                        onControlsVisible={onControlsVisible}
                      ></Contact>
                    )}
                  </>
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
          </div>
          <Transition className="block w-fit" edit={edit}>
            <ContactPlaceholder
              onAdd={(e) => {
                form.contacts.push({ ...e, key: v4(), empty: true });
                setForm({ ...form });
              }}
            ></ContactPlaceholder>
          </Transition>
        </div>

        <div className="col-span-2 md:col-span-1 print:col-span-1 relative">
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
              className="text-xs text-justify leading-normal min-h-[74px] !pl-4 w-full"
              placeholder="Write something..."
              onClick={() => setForm({ ...form, summary: getEmptyParagraph() })}
            ></Placeholder>
          )}
        </div>
      </div>
      <div className={styles.sections}>
        {form.sections &&
          form.sections.map((s, i) => {
            const lastIndex =
              form.sections.filter((f) => f.type === 'Single').length - 1;
            const Component = sections[s.type as keyof typeof sections];
            return (
              <div className="flex flex-col gap-4" key={s.key}>
                <Component
                  props={s}
                  onChange={() => setForm({ ...form })}
                  onRemove={(full) => {
                    if (full) {
                      form.sections?.splice(i, 1);
                    }
                    setForm({ ...form });
                  }}
                  edit={edit}
                  onDeleteSection={(e) => deleteSection(e)}
                  last={
                    form.sections.filter((z) => z.type === s.type).length === 1
                  }
                ></Component>
                {i === lastIndex && (
                  <AddPlaceholder
                    edit={edit}
                    onClick={() => addSection()}
                    label="+ Section"
                  ></AddPlaceholder>
                )}
              </div>
            );
          })}
      </div>
    </form>
  );
}
