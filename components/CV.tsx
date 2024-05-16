'use client';
import Download from './Download';
import styles from './CV.module.css';
import { ChangeEvent, useState } from 'react';
import Contact from './Contact';
import TextArea from './TextArea';
import Input from './Input';
import Divider from './Divider';
import Experience from './Experience';

export default function CV() {
  const placeholders = {
    name: 'John Doe',
    position: 'Full Stack Developer',
    contacts: [
      {
        icon: 'Email',
        text: 'email@example.com',
      },
      {
        icon: 'LogoLinkedin',
        text: 'linkedin.com/in/example',
      },
      {
        icon: 'Phone',
        text: '(+31) 666333999',
      },
      {
        icon: 'LogoGithub',
        text: 'github.com/example',
      },
      {
        icon: 'LocationFilled',
        text: 'Amsterdam, Netherlands',
      },
      {
        icon: 'Link',
        text: 'createcv.app',
      },
    ],
    description:
      'With over 6 years of experience, I bring extensive experience in full-stack development. Proficient across backend, frontend, dev ops and testing domains, I am dedicated to following best practices in my work and maintain enthusiasm for learning and growth.',
    experiences: [
      {
        title: 'Software Engineer',
        company: 'Google',
        location: 'Netherlands',
        date: 'Feb 2021 - Present',
        topic: 'Technology',
        description: `[{"type":"bulletList","content":[{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Designed and implemented a real-time database using Firebase for Google's internal document management system."}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Optimized search algorithms within Google Chrome to prioritize eco-friendly vacation rentals based on user preferences and property data."}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Led Google Maps data collection for self-driving cars."}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Built & scaled data pipelines for Google Cloud's self-driving car project."}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Improved Chrome's memory usage."}]}]}]}]`,
      },
    ],
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

  // closure
  const contactGenerator = (prefix: string) => {
    let i = 1;
    return () => {
      return prefix + i++;
    };
  };
  const generateContactName = contactGenerator('contact_');

  const experienceGenerator = (prefix: string) => {
    let i = 1;
    return () => {
      return prefix + i++;
    };
  };
  const generateExperienceName = experienceGenerator('experience_');

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
        <div className={styles.contact}>
          {form.contacts.map((contact) => {
            const key = generateContactName();
            return (
              <Contact
                key={key}
                props={[key, contact]}
                onChange={() => setForm({ ...form })}
              ></Contact>
            );
          })}
        </div>
        <TextArea
          props={['description', form.description]}
          onChange={handleChange}
        ></TextArea>
      </div>
      <div className={styles.experience}>
        <Divider props="Experience"></Divider>
        {form.experiences.map((experience) => {
          const key = generateExperienceName();
          return (
            <Experience
              key={key}
              props={[key, experience]}
              onChange={() => setForm({ ...form })}
            ></Experience>
          );
        })}
      </div>

      <div className={styles.education}>
        <div className={styles.skills}></div>
      </div>
    </form>
  );
}
