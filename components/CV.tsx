'use client';
import Download from './Download';
import styles from './CV.module.css';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import Link from './Link';
import { Email } from '@carbon/icons-react';

export default function CV() {
  const formEl = useRef<HTMLFormElement>(null!);
  const measures = useRef(new Map());
  const placeholders = {
    name: 'John Doe',
    position: 'Full Stack Developer',
    link1: 'email@example.com',
  };

  const [form, setForm] = useState({
    name: placeholders.name,
    position: placeholders.position,
    link1: placeholders.link1,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    measureWidth(e.target);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const measureWidth = (input: HTMLInputElement) => {
    input.style.width = '0px';
    input.style.width = `${Math.max(
      input.scrollWidth,
      measures.current.has(input.name)
        ? measures.current.get(input.name) ?? 0
        : 0
    )}px`;

    return input.scrollWidth;
  };

  useEffect(() => {
    const arr = [...formEl.current.querySelectorAll('input')];
    for (const i of arr) {
      const width = measureWidth(i);
      measures.current.set(i.name, width);
    }
  }, []);

  return (
    <form
      ref={formEl}
      className={`${styles.container} grid grid-cols-2 auto-cols-min`}
    >
      <div className={styles.experience}></div>
      <div className={styles.header}>
        <div className="flex flex-col items-center md:items-start">
          <input
            type="text"
            name="name"
            className={
              'max-w-xs md:max-w-lg font-bold text-3xl outline-none text-center md:text-start highlight'
            }
            onChange={handleChange}
            placeholder={placeholders.name}
            value={form.name}
          />

          <input
            type="text"
            className={
              'max-w-xs md:max-w-lg font-bold text-sm outline-none text-center md:text-start highlight'
            }
            name="position"
            onChange={handleChange}
            placeholder={placeholders.position}
            value={form.position}
          />
        </div>
        <Download></Download>
        <div className={styles.links}>
          <Link
            props={{ value: form.link1, name: 'link1' }}
            onChange={handleChange}
          >
            <Email></Email>
          </Link>
        </div>
      </div>
      <div className={styles.education}>
        <div className={styles.skills}></div>
      </div>
    </form>
  );
}
