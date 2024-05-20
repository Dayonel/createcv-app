'use client';
import Download from './Download';
import styles from './CV.module.scss';
import { ChangeEvent, useState } from 'react';
import Contact from './Contact';
import Input from './Input';
import Divider from './Divider';
import Experience from './Experience';
import RichText from './RichText';
import Education from './Education';
import Skill from './Skill';
import Language from './Language';

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
    experiences: [
      {
        title: 'Software Engineer',
        company: 'Google',
        location: 'Netherlands',
        date: 'Feb 2021 - Present',
        topic: 'Technology',
        description: `{"type":"doc","content":[{"type":"bulletList","content":[{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Designed and implemented a real-time database using Firebase for Google's internal document management system."}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Optimized search algorithms within Google Chrome to prioritize eco-friendly vacation rentals based on user preferences and property data."}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Led Google Maps data collection for self-driving cars."}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Built & scaled data pipelines for Google Cloud's self-driving car project."}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Improved Chrome's memory usage."}]}]}]}]}`,
      },
    ],
    education: [
      {
        title: "Bachelor's degree from the University of Cambridge",
        date: '2018',
        description: `{"type":"doc","content":[{"type":"bulletList","content":[{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Bachelor's degree from the University of Cambridge."}]}]}]}]}`,
      },
    ],
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
    languages: [
      {
        name: 'Spanish',
        level: 'Native',
        rating: 10,
      },
      {
        name: 'English',
        level: 'Fluent',
        rating: 9,
      },
      {
        name: 'Dutch',
        level: 'A2',
        rating: 2,
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

  const educationGenerator = (prefix: string) => {
    let i = 1;
    return () => {
      return prefix + i++;
    };
  };
  const generateEducationName = educationGenerator('education_');

  const skillGenerator = (prefix: string) => {
    let i = 1;
    return () => {
      return prefix + i++;
    };
  };
  const generateSkillName = skillGenerator('skill_');

  const languageGenerator = (prefix: string) => {
    let i = 1;
    return () => {
      return prefix + i++;
    };
  };
  const generateLanguageName = languageGenerator('language_');

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
      <div className={styles.body}>
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
          <Divider props="Education"></Divider>
          {form.education.map((education) => {
            const key = generateEducationName();
            return (
              <Education
                key={key}
                props={[key, education]}
                onChange={() => setForm({ ...form })}
              ></Education>
            );
          })}
        </div>
        <div className={styles.skills_languages}>
          <div className="flex flex-col w-full gap-1">
            <Divider props="Skills"></Divider>
            <div className={styles.skills}>
              {form.skills.map((skill) => {
                const key = generateSkillName();
                return (
                  <Skill
                    key={key}
                    props={[key, skill]}
                    onChange={() => setForm({ ...form })}
                  ></Skill>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col w-full gap-1">
            <Divider props="Languages"></Divider>
            <div className="flex flex-col gap-4">
              {form.languages.map((language) => {
                const key = generateLanguageName();
                return (
                  <Language
                    key={key}
                    props={[key, language]}
                    onChange={() => setForm({ ...form })}
                  ></Language>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
