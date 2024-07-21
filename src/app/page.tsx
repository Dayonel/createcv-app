import Demo from '@/components/demo/demo';
import FAQ from '@/components/faq/faq';
import Pricing from '@/components/pricing/pricing';
import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={styles.page}>
      <section>
        <Demo></Demo>
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
