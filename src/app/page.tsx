import Demo from '@/components/demo/demo';
import FAQ from '@/components/faq/faq';
import styles from './page.module.scss';
import Counter from '@/components/counter/counter';
import { templateJson } from '@/lib/template';

export default function Home() {
  return (
    <div className={styles.page}>
      <section>
        <Demo json={templateJson}></Demo>
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
