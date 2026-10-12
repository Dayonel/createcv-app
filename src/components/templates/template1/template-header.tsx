import { useContext, useState } from 'react';
import { v4 } from 'uuid';
import styles from './template1.module.scss';
import Contact, { ContactProps } from './contact/contact';
import ContactPlaceholder from './placeholder/contact-placeholder';
import Field from './field';
import RichText from '../../rich-text/rich-text';
import Sortable from '../../dndkit/sortable';
import Placeholder from '../../placeholder/placeholder';
import ActionButtons from '../../placeholder/action-buttons';
import ImagePlaceholder from '../../placeholder/image-placeholder';
import { MenuContext } from '../../providers/contexts';
import { Template1 } from './types/template1';
import { sortByKeys } from '@/utils/sort';

interface TemplateHeaderProps {
  form: Template1;
  data: Template1;
  setForm: (form: Template1) => void;
  image?: string;
  setImage: (src?: string) => void;
}

export default function TemplateHeader({
  form,
  data,
  setForm,
  image,
  setImage,
}: TemplateHeaderProps) {
  const { edit } = useContext(MenuContext);
  const [contactsOpen, setContactsOpen] = useState(false);
  const update = () => setForm({ ...form });
  const field = { item: form, placeholder: data, onChange: update };
  const withPhoto = edit || image;

  return (
    <div className={styles.header}>
      <div
        className={`grid w-fit ${withPhoto ? 'grid-rows-2 gap-x-4' : ''} ${
          image ? '' : 'print:gap-0'
        }`}
      >
        <ImagePlaceholder
          image={image}
          onFile={setImage}
          className="row-span-2"
        ></ImagePlaceholder>

        <div
          className={`relative self-end ${
            withPhoto ? 'md:col-start-2 print:col-start-2' : ''
          }`}
        >
          <Field
            {...field}
            name="title"
            label="Heading 1"
            className="max-w-64 print:max-w-lg md:max-w-lg font-bold text-3xl"
          />
        </div>
        <div className={`relative ${withPhoto ? '' : 'md:col-start-1'}`}>
          <Field
            {...field}
            name="subtitle"
            label="Heading 3"
            className="max-w-64 print:max-w-lg md:max-w-lg font-bold text-sm"
          />
        </div>
      </div>
      <div></div>
      <div className="flex flex-col gap-1">
        <ActionButtons add onAdd={() => setContactsOpen(!contactsOpen)}>
          <div className={styles.contact}>
            <Sortable
              initialItems={form.contacts}
              renderItem={({ props }: ContactProps) =>
                props && <Contact props={props} onChange={update}></Contact>
              }
              onSort={(keys) =>
                setForm({ ...form, contacts: sortByKeys(form.contacts, keys) })
              }
              onRemove={(id) =>
                setForm({
                  ...form,
                  contacts: form.contacts.filter((f) => f.key !== id),
                })
              }
              wrapperStyle="pl-[6px]"
              handle
              noHandleFirst
              remove
            ></Sortable>
            <ContactPlaceholder
              onAdd={(e) => {
                setForm({ ...form, contacts: [...form.contacts, { ...e, key: v4() }] });
                setContactsOpen(false);
              }}
              open={contactsOpen}
              onClose={() => setContactsOpen(false)}
              placeholder={data.contacts}
            ></ContactPlaceholder>
          </div>
        </ActionButtons>
      </div>

      <div className="col-span-2 md:col-span-1 print:col-span-1 relative">
        {form.summary ? (
          <RichText
            props={form.summary}
            onChange={(e) => setForm({ ...form, summary: e })}
            className="text-justify whitespace-pre-line leading-normal h-fit"
            onRemove={() => setForm({ ...form, summary: undefined })}
            remove
            italic
          ></RichText>
        ) : (
          <Placeholder
            className="text-xs text-justify whitespace-pre-line leading-normal min-h-[74px] !pl-4 w-full"
            placeholder="Write something..."
            onClick={() => setForm({ ...form, summary: data.summary })}
          ></Placeholder>
        )}
      </div>
    </div>
  );
}
