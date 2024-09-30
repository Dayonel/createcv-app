import Demo from '@/components/demo/demo';
import FAQ from '@/components/faq/faq';
import styles from './page.module.scss';
import Counter from '@/components/counter/counter';
import { headers } from 'next/headers';

export default async function Home() {
  const baseUrl = headers().get('host')!;

  const json = await fetch(
    new URL('/template1.json', `http://${baseUrl}`)
  ).then((res) => res.text() as Promise<string>);

  return (
    <div className={styles.page}>
      <section>
        <Demo json={json}></Demo>
      </section>
      <section className="print:!hidden">
        <hr></hr>
        <Counter></Counter>
      </section>
      <section className="print:!hidden">
        <hr></hr>
        <FAQ></FAQ>
      </section>
    </div>
  );
}
