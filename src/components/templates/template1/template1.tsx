'use client';
import { useContext } from 'react';
import { MenuContext } from '../../providers/contexts';
import styles from './template1.module.scss';
import TemplateHeader from './template-header';
import TemplateSections from './template-sections';
import { useTemplateForm } from './use-template-form';

interface TemplateProps {
  json: string;
  stored?: boolean;
}

export default function Template_1(props: TemplateProps) {
  const { resetKey } = useContext(MenuContext);
  return <Template key={resetKey} {...props} />;
}

function Template({ json, stored }: TemplateProps) {
  const { data, form, setForm, image, setImage } = useTemplateForm(json, stored);

  return (
    <form className={`${styles.container} grid grid-cols-2 auto-cols-min`}>
      <TemplateHeader
        form={form}
        data={data}
        setForm={setForm}
        image={image}
        setImage={setImage}
      />
      <TemplateSections form={form} data={data} setForm={setForm} />
    </form>
  );
}
