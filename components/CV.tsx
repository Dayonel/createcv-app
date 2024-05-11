'use client';
import Download from './Download';
import styles from './CV.module.css';
import { ChangeEvent, useState } from 'react';

export default function CV() {
  const [form, setForm] = useState({
    name: 'John Doe',
    position: 'Full Stack Developer',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
          <input
            type="text"
            name="name"
            className={`max-w-xs md:max-w-lg font-bold text-3xl outline-none text-center md:text-start ${styles.highlight}`}
            placeholder="John Doe"
            onChange={handleChange}
            value={form.name}
          />

          <input
            type="text"
            onChange={handleChange}
            className={`max-w-xs md:max-w-lg font-bold text-sm outline-none text-center md:text-start ${styles.highlight}`}
            name="position"
            placeholder="Full Stack Developer"
            value={form.position}
          />
        </div>
        <Download></Download>
      </div>
      <div className={styles.education}>
        <div className={styles.skills}></div>
      </div>
    </form>
  );
}
