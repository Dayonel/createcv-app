'use client';
import Download from './Download';
import styles from './CV.module.scss';
import { ChangeEvent, useState } from 'react';
import Contact from './Contact';
import Input from './Input';
import RichText from './RichText/RichText';
import Single from './Section/Single';
import Double from './Section/Double';

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
    summary: `{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"italic"}],"text":"With over 6 years of experience, I bring extensive experience in full-stack development. Proficient across backend, frontend, dev ops and testing domains, I am dedicated to following best practices in my work and maintain enthusiasm for learning and growth."}]}]}`,
    sections: [
      {
        name: '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Experience"}]}]}',
        type: 'Single',
        content: [
          {
            title:
              '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Software Engineer"}]}]}',
            subtitle: '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Google"}]}]}',
            date: '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Feb 2021 - Present"}]}]}',
            topic: '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Technology"}]}]}',
            description: `{"type":"doc","content":[{"type":"bulletList","content":[{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Designed and implemented a real-time database using Firebase for Google's internal document management system."}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Optimized search algorithms within Google Chrome to prioritize eco-friendly vacation rentals based on user preferences and property data."}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Led Google Maps data collection for self-driving cars."}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Built & scaled data pipelines for Google Cloud's self-driving car project."}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Improved Chrome's memory usage."}]}]}]}]}`,
          },
        ],
      },
      {
        name: '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Education"}]}]}',
        type: 'Single',
        content: [
          {
            title: `{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Bachelor's degree from the University of Cambridge"}]}]}`,
            date: '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"2018"}]}]}',
            description: `{"type":"doc","content":[{"type":"bulletList","content":[{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Bachelor's degree from the University of Cambridge."}]}]}]}]}`,
          },
        ],
      },
      {
        type: 'Double',
        content: [
          {
            name: '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Skills"}]}]}',
            skills: [
              'React',
              'Next.js',
              'Tailwind CSS',
              'Javascript',
              'HTML5',
              'CSS',
              'Jest',
              'Typescript',
              'MongoDB',
              'PostgreSQL',
              'Docker',
              'Git',
              'CI/CD',
              'GitHub Actions',
            ],
          },
          {
            name: '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Languages"}]}]}',
            languages: [
              {
                name: '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Spanish"}]}]}',
                level: '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Native"}]}]}',
                rating: 10,
              },
              {
                name: '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"English"}]}]}',
                level: '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Fluent"}]}]}',
                rating: 9,
              },
              {
                name: '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Dutch"}]}]}',
                level: '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"A2"}]}]}',
                rating: 2,
              },
            ],
          },
        ],
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

  const sections = {
    Single,
    Double,
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
        <RichText
          props={form.summary}
          onChange={(e) => setForm({ ...form, summary: e })}
          className="text-justify"
        ></RichText>
      </div>
      <div className={styles.sections}>
        {form.sections.map((m, i) => {
          const Component = sections[m.type as keyof typeof sections];
          return (
            <Component
              key={i}
              props={m}
              onChange={() => setForm({ ...form })}
            ></Component>
          );
        })}
      </div>
    </form>
  );
}
