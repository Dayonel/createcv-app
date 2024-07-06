import Editor from '@/components/Editor';
import FAQ from '@/components/FAQ/FAQ';
import Pricing from '@/components/Pricing/Pricing';
import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={styles.page}>
      <div className="grid gap-20 md:gap-28">
        <section>
          <Editor></Editor>
        </section>
        <section className="print:hidden">
          <hr></hr>
          <Pricing></Pricing>
        </section>
        <section className="print:hidden">
          <hr></hr>
          <FAQ></FAQ>
        </section>
      </div>
    </div>
  );
}
