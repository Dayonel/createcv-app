'use client';
import styles from './template1.module.scss';
import { useContext, useEffect, useRef, useState } from 'react';
import Contact, { ContactProps } from './contact/contact';
import RichText from '../../rich-text/rich-text';
import Single from './section/single';
import Double from './section/double';
import placeholder from '../../../data/template1.json';
import { traverseUUID } from '@/utils/traverseUUID';
import Sortable from '../../dndkit/sortable';
import Placeholder from '../../placeholder/placeholder';
import useColorStore from '@/store/colorStore';
import { v4 } from 'uuid';
import ContactPlaceholder from './placeholder/contact-placeholder';
import { useUndo } from '@/hooks/useUndo';
import { Form } from './types/form';
import { deleteCookie, setCookie } from '@/actions/cookies';
import { Single as SingleType, SingleContent } from './types/single';
import ActionButtons from '../../placeholder/action-buttons';
import ImagePlaceholder from '../../placeholder/image-placeholder';
import { MenuContext } from '../../providers/menu-provider';
import { useTheme } from 'next-themes';

export default function Template1() {
  const data = traverseUUID(placeholder); // traverse
  const { state, setState, resetHistory, triggerUndo, triggerRedo, canUndo } =
    useUndo(JSON.stringify(data));
  const [form, setForm] = useState<Form>(JSON.parse(state));
  const { color, overriden, setColor } = useColorStore();
  const updateHistory = useRef(false);
  const [mounted, setMounted] = useState(false);
  const [contactsOpen, setContactsOpen] = useState(false);
  const { reset, setReset, edit, undo, setUndo, redo, setRedo } =
    useContext(MenuContext);
  const [image, setImage] = useState<string | null>(null);
  const { setTheme } = useTheme();

  // every update
  useEffect(() => {
    if (!mounted) return;

    if (updateHistory.current) {
      setState(JSON.stringify(form));
    }

    updateHistory.current = true;

    if (canUndo) {
      localStorage.setItem('form', JSON.stringify(form, replacer));
      setCookie('savedForm', 'true');
    }
  }, [form]);

  const replacer = (key: string, value: any) =>
    key === 'key' ? undefined : value;

  useEffect(() => {
    updateHistory.current = false;
    setForm(JSON.parse(state));
  }, [state]);

  useEffect(() => {
    updateHistory.current = false;
    if (overriden) {
      localStorage.setItem('form', JSON.stringify(form, replacer));
      setCookie('savedForm', 'true');
    }
    setForm({ ...form, color });
  }, [color]);

  // saved form (local)
  useEffect(() => {
    try {
      const userFrom = localStorage.getItem('form');
      if (userFrom) {
        const parsed = JSON.parse(userFrom);
        setForm({ ...traverseUUID(parsed) });
        if (parsed.color !== 'var(--cds-link-primary)') {
          setColor(parsed.color, true);
        }
      }
      const image = localStorage.getItem('image');
      if (image) {
        setImage(image);
      }
      resetHistory();
    } finally {
      setMounted(true);
      updateHistory.current = true;
    }
  }, []);

  useEffect(() => {
    if (reset) {
      resetForm();
      setReset(false);
    }
  }, [reset]);

  useEffect(() => {
    if (undo) {
      triggerUndo();
      setUndo(false);
    }
  }, [undo]);

  useEffect(() => {
    if (redo) {
      triggerRedo();
      setRedo(false);
    }
  }, [redo]);

  useEffect(() => {
    if (image) {
      localStorage.setItem('image', image);
      setCookie('savedForm', 'true');
    } else {
      localStorage.removeItem('image');
    }
  }, [image]);

  const resetForm = () => {
    setForm({ ...traverseUUID(placeholder) });
    setColor('var(--cds-link-primary)');
    setImage(null);
    localStorage.removeItem('form');
    localStorage.removeItem('image');
    updateHistory.current = false;
    deleteCookie('savedForm');
    deleteCookie('printed');
    deleteCookie('theme');
    localStorage.removeItem('theme');
    setTheme('system');
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

  const placeholderSection = placeholder.sections.find(
    (f) => f.type === 'Single'
  )! as SingleType;

  const placeholderContent = placeholderSection.content![0] as SingleContent;

  const addSection = (key: string) => {
    const i = form.sections.findIndex((f) => f.key === key) + 1;
    form.sections.splice(i, 0, {
      key: v4(),
      name: placeholderSection.name,
      type: 'Single',
      content: [
        {
          key: v4(),
          title: placeholderContent.title,
          subtitle: placeholderContent.subtitle,
          date: placeholderContent.date,
          topic: placeholderContent.topic,
          description: placeholderContent.description,
        },
      ],
    });
    setForm({ ...form });
  };

  return (
    <form className={`${styles.container} grid grid-cols-2 auto-cols-min`}>
      <div className={`${styles.header}`}>
        <div
          className={`grid ${
            (edit || image) && 'grid-rows-2 gap-x-4'
          } w-fit print:${!image && 'gap-0'}`}
        >
          <ImagePlaceholder
            image={image}
            onFile={(e) => setImage(e)}
            className="row-span-2"
          ></ImagePlaceholder>

          <div
            className={`relative self-end ${
              (edit || image) && 'md:col-start-2 print:col-start-2'
            }`}
          >
            {form.title && (
              <RichText
                className="max-w-64 print:max-w-lg md:max-w-lg font-bold text-3xl"
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
            {!form.title && (
              <Placeholder
                className="font-bold text-3xl"
                placeholder="Heading 1"
                onClick={() =>
                  setForm({
                    ...form,
                    title: placeholder.title,
                  })
                }
              ></Placeholder>
            )}
          </div>
          <div className={`relative ${!edit && !image && 'md:col-start-1'}`}>
            {form.subtitle && (
              <RichText
                className="max-w-64 print:max-w-lg md:max-w-lg font-bold text-sm"
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
            {!form.subtitle && (
              <Placeholder
                className="font-bold text-sm"
                placeholder="Heading 3"
                onClick={() =>
                  setForm({
                    ...form,
                    subtitle: placeholder.subtitle,
                  })
                }
              ></Placeholder>
            )}
          </div>
        </div>
        <div></div>
        <div className={`flex flex-col gap-1`}>
          <ActionButtons add onAdd={() => setContactsOpen(!contactsOpen)}>
            <div className={`${styles.contact}`}>
              {form.contacts && (
                <Sortable
                  initialItems={form.contacts}
                  renderItem={({ props }: ContactProps) => (
                    <>
                      {props && (
                        <Contact
                          props={props}
                          onChange={() => setForm({ ...form })}
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
                  noHandleFirst
                  remove
                ></Sortable>
              )}
              <ContactPlaceholder
                onAdd={(e) => {
                  form.contacts.push({ ...e, key: v4() });
                  setForm({ ...form });
                  setContactsOpen(false);
                }}
                open={contactsOpen}
                onClose={() => setContactsOpen(false)}
              ></ContactPlaceholder>
            </div>
          </ActionButtons>
        </div>

        <div className="col-span-2 md:col-span-1 print:col-span-1 relative">
          {form.summary && (
            <RichText
              props={form.summary}
              onChange={(e) => setForm({ ...form, summary: e })}
              className="text-justify whitespace-pre-line leading-normal h-fit"
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
              className="text-xs text-justify whitespace-pre-line leading-normal min-h-[74px] !pl-4 w-full"
              placeholder="Write something..."
              onClick={() => setForm({ ...form, summary: placeholder.summary })}
            ></Placeholder>
          )}
        </div>
      </div>
      <div className={styles.sections}>
        {form.sections &&
          form.sections.map((s, i) => {
            const Component = sections[s.type as keyof typeof sections];
            return (
              <div className="flex flex-col" key={s.key}>
                <Component
                  props={s}
                  onChange={() => setForm({ ...form })}
                  onRemove={(full) => {
                    if (full) {
                      form.sections?.splice(i, 1);
                    }
                    setForm({ ...form });
                  }}
                  onDeleteSection={(e) => deleteSection(e)}
                  last={
                    form.sections.filter((z) => z.type === s.type).length === 1
                  }
                  onAddSection={(e) => addSection(e)}
                ></Component>
              </div>
            );
          })}
      </div>
    </form>
  );
}
