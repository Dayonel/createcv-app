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
    <form className={`${styles.form} grid grid-cols-2 auto-cols-min`}>
      <div className="flex flex-col">
        <input
          type="text"
          name="name"
          className={`font-bold text-3xl outline-none border-0 ${styles.input} ${styles.highlight}`}
          placeholder="John Doe"
          onChange={handleChange}
          value={form.name}
        />

        <input
          type="text"
          onChange={handleChange}
          className={`font-bold text-sm outline-none ${styles.highlight}`}
          name="position"
          placeholder="Full Stack Developer"
          value={form.position}
        />
      </div>
      <Download></Download>
    </form>
  );
}
