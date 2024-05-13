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

  const [form, setForm] = useState({
    name: placeholders.name,
    position: placeholders.position,
    link1: placeholders.link1,
    link2: placeholders.link2,
    link3: placeholders.link3,
    link4: placeholders.link4,
    link5: placeholders.link5,
    link6: placeholders.link6,
    description: placeholders.description,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form className={`${styles.container} grid grid-cols-2 auto-cols-min`}>
      <div className={styles.experience}></div>
      <div className={styles.header}>
        <div className="flex flex-col items-center md:items-start">
          <Input
            props={{ value: form.name, name: 'name' }}
            onChange={handleChange}
          ></Input>
          <Input
            props={{ value: form.position, name: 'position' }}
            className="max-w-xs md:max-w-lg font-bold text-sm outline-none text-center md:text-start highlight"
            onChange={handleChange}
          ></Input>
        </div>
        <Download></Download>
        <div className={styles.links}>
          <Link
            props={{ value: form.link1, name: 'link1' }}
            onChange={handleChange}
          >
            <Email></Email>
          </Link>
          <Link
            props={{ value: form.link2, name: 'link2' }}
            onChange={handleChange}
          >
            <LogoLinkedin></LogoLinkedin>
          </Link>
          <Link
            props={{ value: form.link3, name: 'link3' }}
            onChange={handleChange}
          >
            <Phone></Phone>
          </Link>
          <Link
            props={{ value: form.link4, name: 'link4' }}
            onChange={handleChange}
          >
            <LogoGithub></LogoGithub>
          </Link>
          <Link
            props={{ value: form.link5, name: 'link5' }}
            onChange={handleChange}
          >
            <LocationFilled></LocationFilled>
          </Link>
          <Link
            props={{ value: form.link6, name: 'link6' }}
            onChange={handleChange}
          >
            <IconLink></IconLink>
          </Link>
        </div>
        <TextArea
          props={{ value: form.description, name: 'description' }}
          onChange={handleChange}
        ></TextArea>
      </div>
      <div className={styles.education}>
        <div className={styles.skills}></div>
      </div>
    </form>
  );
}
