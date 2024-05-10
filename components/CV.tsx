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
    measureWidth(e.target);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const measureWidth = (input: HTMLInputElement) => {
    input.style.width = '100px';
    input.style.width = `${input.scrollWidth}px`;
  };

  return (
    <form className="flex flex-col">
      <input
        type="text"
        onChange={handleChange}
        className={`font-bold text-3xl outline-none ${styles.highlight}`}
        style={{ minWidth: 131, width: 131 }}
        id="name"
        name="name"
        placeholder="John doe"
        value={form.name}
      />

      <input
        type="text"
        onChange={handleChange}
        className={`font-bold text-sm w-fit outline-none ${styles.highlight}`}
        style={{ minWidth: 133, width: 133 }}
        name="position"
        placeholder="Full Stack Developer"
        value={form.position}
        size={form.position.length}
      />
      <Download></Download>
    </form>
  );
}
