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
import Divider from './Divider';
import Experience from './Experience';

export default function CV() {
  const placeholders = {
    name: 'John Doe',
    position: 'Full Stack Developer',
    link1: 'email@example.com',
    link2: 'linkedin.com/in/example',
    link3: '(+31) 666333999',
    link4: 'github.com/example',
    link5: 'Amsterdam, Netherlands',
    link6: 'createcv.app',
    description:
      'With over 6 years of experience, I bring extensive experience in full-stack development. Proficient across backend, frontend, dev ops and testing domains, I am dedicated to following best practices in my work and maintain enthusiasm for learning and growth.',
    experience1: {
      title: 'Software Engineer',
      company: 'Google',
      location: 'Netherlands',
      date: 'Feb 2021 - Present',
      topic: 'Technology',
      descriptions: [
        'Designed and implemented a real-time database using Firebase for Google\'s internal document management system.',
        'Optimized search algorithms within Google Chrome to prioritize eco-friendly vacation rentals based on user preferences and property data.',
        'Led Google Maps data collection for self-driving cars.',
        'Built & scaled data pipelines for Google Cloud\'s self-driving car project.',
        'Improved Chrome\'s memory usage.',
      ],
    },
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

  const handleDeepChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string
  ) => {
    const ref = form[key as keyof typeof form] as Record<string, unknown>
    ref[e.target.name] = e.target.value; // change by reference
    setForm({
      ...form,
      [key]: ref,
    });
  };

  return (
    <form className={`${styles.container} grid grid-cols-2 auto-cols-min`}>
      <div className={styles.header}>
        <div className="flex flex-col items-center md:items-start">
          <Input
            props={['name', form.name]}
            className="max-w-xs md:max-w-lg font-bold text-3xl outline-none text-center md:text-start highlight"
            onChange={handleChange}
          ></Input>
          <Input
            props={['position', form.position]}
            className="max-w-xs md:max-w-lg font-bold text-sm outline-none text-center md:text-start highlight"
            onChange={handleChange}
          ></Input>
        </div>
        <Download></Download>
        <div className={styles.links}>
          <Link props={['link1', form.link1]} onChange={handleChange}>
            <Email></Email>
          </Link>
          <Link props={['link2', form.link2]} onChange={handleChange}>
            <LogoLinkedin></LogoLinkedin>
          </Link>
          <Link props={['link3', form.link3]} onChange={handleChange}>
            <Phone></Phone>
          </Link>
          <Link props={['link4', form.link4]} onChange={handleChange}>
            <LogoGithub></LogoGithub>
          </Link>
          <Link props={['link5', form.link5]} onChange={handleChange}>
            <LocationFilled></LocationFilled>
          </Link>
          <Link props={['link6', form.link6]} onChange={handleChange}>
            <IconLink></IconLink>
          </Link>
        </div>
        <TextArea
          props={['description', form.description]}
          onChange={handleChange}
        ></TextArea>
      </div>
      <div className={styles.experience}>
        <Divider props="Experience"></Divider>
        <Experience
          props={['experience1', form.experience1]}
          onChange={handleDeepChange}
        ></Experience>
      </div>

      <div className={styles.education}>
        <div className={styles.skills}></div>
      </div>
    </form>
  );
}
