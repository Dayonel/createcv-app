'use client';
import styles from './CV.module.scss';
import { useContext, useEffect, useRef, useState } from 'react';
import Contact, { ContactProps } from './Contact/Contact';
import RichText from './RichText/RichText';
import Single from './Section/Single';
import Double from './Section/Double';
import placeholder from '../data/placeholder.json';
import { traverseUUID } from '@/utils/traverseUUID';
import Sortable from './DndKit/Sortable';
import Placeholder from './Placeholder/Placeholder';
import useColorStore from '@/store/colorStore';
import { v4 } from 'uuid';
import ContactPlaceholder from './Placeholder/ContactPlaceholder';
import { useUndo } from '@/hooks/useUndo';
import { Form } from '@/types/Form';
import { deleteCookie, setCookie } from '@/actions/cookies';
import { FormContext } from './FormProvider';
import { InlineLoading } from '@carbon/react';
import { useTheme } from 'next-themes';
import { Single as SingleType, SingleContent } from '@/types/Single';
import ActionButtons from './Placeholder/ActionButtons';
import ImagePlaceholder from './Placeholder/ImagePlaceholder';
import { MenuContext } from './MenuProvider';

export default function CV() {
  const data = traverseUUID(placeholder); // traverse
  const { state, setState, resetHistory, triggerUndo, triggerRedo, canUndo } =
    useUndo(JSON.stringify(data));
  const [form, setForm] = useState<Form>(JSON.parse(state));
  const { color, overriden, setColor } = useColorStore();
  const { theme } = useTheme();
  const updateHistory = useRef(false);
  const [mounted, setMounted] = useState(false);
  const savedForm = useContext(FormContext);
  const [contactsOpen, setContactsOpen] = useState(false);
  const { reset, setReset, edit, undo, setUndo, redo, setRedo } =
    useContext(MenuContext);
  const [image, setImage] = useState<string | null>(null);

  // every update
  useEffect(() => {
    if (!mounted) return;

    if (updateHistory.current) {
      setState(JSON.stringify(form));
    }

    updateHistory.current = true;

    localStorage.setItem('form', JSON.stringify(form, replacer));
    if (canUndo) {
      setCookie('savedForm', 'yes');
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
      setCookie('savedForm', 'yes');
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
        if (parsed.color !== '#0f62fe' && parsed.color !== '#78a9ff') {
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
      setCookie('savedForm', 'yes');
    } else {
      localStorage.removeItem('image');
    }
  }, [image]);

  const resetForm = () => {
    setForm({ ...traverseUUID(placeholder) });
    setImage(null);
    localStorage.removeItem('image');
    setColor(theme === 'g10' ? '#0f62fe' : '#78a9ff', false);
    updateHistory.current = false;
    deleteCookie('savedForm');
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
    <>
      {savedForm && !mounted ? (
        <InlineLoading className="flex justify-center items-center h-full"></InlineLoading>
      ) : (
        <form
          className={`${styles.container} grid grid-cols-2 auto-cols-min cv`}
        >
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
              <div
                className={`relative ${!edit && !image && 'md:col-start-1'}`}
              >
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
                      exceptHandle={form.contacts[0].key}
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
                  className="text-xs text-justify leading-normal min-h-[74px] !pl-4 w-full"
                  placeholder="Write something..."
                  onClick={() =>
                    setForm({ ...form, summary: placeholder.summary })
                  }
                ></Placeholder>
              )}
            </div>
          </div>
          <div className={styles.sections}>
            {form.sections &&
              form.sections.map((s, i) => {
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
                      onDeleteSection={(e) => deleteSection(e)}
                      last={
                        form.sections.filter((z) => z.type === s.type)
                          .length === 1
                      }
                      onAddSection={(e) => addSection(e)}
                    ></Component>
                  </div>
                );
              })}
          </div>
        </form>
      )}
    </>
  );
}
