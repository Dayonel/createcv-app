import Editor from '@/components/Editor';
import Pricing from '@/components/Pricing/Pricing';

export default function Home() {
  return (
    <>
      <section>
        <Editor></Editor>
      </section>
      <section className="print:hidden">
        <hr></hr>
        <Pricing></Pricing>
      </section>
    </>
  );
}
