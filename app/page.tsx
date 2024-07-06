import Editor from '@/components/Editor';
import Pricing from '@/components/Pricing/Pricing';

export default function Home() {
  return (
    <div className="grid gap-20 md:gap-28">
      <section>
        <Editor></Editor>
      </section>
      <section className="print:hidden">
        <hr></hr>
        <Pricing></Pricing>
      </section>
    </div>
  );
}
