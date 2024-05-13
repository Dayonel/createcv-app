'use client';
import Download from './Download';
import styles from './CV.module.css';
import { ChangeEvent, useState } from 'react';
import Link from './Link';
import {
  Email,
  LocationFilled,
  LogoGithub,
  LogoLinkedin,
  Phone,
  Link as IconLink,
} from '@carbon/icons-react';
import TextArea from './TextArea';
import Input from './Input';

export default function CV() {
  const placeholders = {
    name: 'John Doe',
    position: 'Frontend Developer',
    link1: 'email@example.com',
    link2: 'linkedin.com/in/example',
    link3: '(+31) 666333999',
    link4: 'github.com/example',
    link5: 'Amsterdam, Netherlands',
    link6: 'createcv.app',
    description:
      'With over 6 years of experience, I bring extensive experience in frontend development. Proficient with React, Next.js and Tailwind CSS, I am dedicated to following best practices in my work and maintain enthusiasm for learning and growth.',
  };

  const [form, setForm] = useState({ ...placeholders });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const getProps = (key: string) => {
    for (const [k, v] of Object.entries(form)) {
      if (k === key) return [k, v];
    }
  };

  return (
    <form className={`${styles.container} grid grid-cols-2 auto-cols-min`}>
      <div className={styles.experience}></div>
      <div className={styles.header}>
        <div className="flex flex-col items-center md:items-start">
          <Input
            props={getProps('name')}
            className="max-w-xs md:max-w-lg font-bold text-3xl outline-none text-center md:text-start highlight"
            onChange={handleChange}
          ></Input>
          <Input
            props={getProps('position')}
            className="max-w-xs md:max-w-lg font-bold text-sm outline-none text-center md:text-start highlight"
            onChange={handleChange}
          ></Input>
        </div>
        <Download></Download>
        <div className={styles.links}>
          <Link props={getProps('link1')} onChange={handleChange}>
            <Email></Email>
          </Link>
          <Link props={getProps('link2')} onChange={handleChange}>
            <LogoLinkedin></LogoLinkedin>
          </Link>
          <Link props={getProps('link3')} onChange={handleChange}>
            <Phone></Phone>
          </Link>
          <Link props={getProps('link4')} onChange={handleChange}>
            <LogoGithub></LogoGithub>
          </Link>
          <Link props={getProps('link5')} onChange={handleChange}>
            <LocationFilled></LocationFilled>
          </Link>
          <Link props={getProps('link6')} onChange={handleChange}>
            <IconLink></IconLink>
          </Link>
        </div>
        <TextArea
          props={getProps('description')}
          onChange={handleChange}
        ></TextArea>
      </div>
      <div className={styles.education}>
        <div className={styles.skills}></div>
      </div>
    </form>
  );
}
