import Editor from '@/components/editor';
import FAQ from '@/components/fq/faq';
import Pricing from '@/components/pricing/pricing';
import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={styles.page}>
      <section>
        <Editor></Editor>
      </section>
      <section className="print:!hidden">
        <hr></hr>
        <Pricing></Pricing>
      </section>
      <section className="print:!hidden">
        <hr></hr>
        <FAQ></FAQ>
      </section>
    </div>
  );
}
