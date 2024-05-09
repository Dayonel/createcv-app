import { DocumentPdf } from '@carbon/icons-react';
import Login from './Login';

export default function Header() {
  return (
    <header className="w-full backdrop-blur sticky top-0 z-10">
      <nav className="flex justify-between items-center h-full">
        <DocumentPdf size={24}></DocumentPdf>
        <Login></Login>
      </nav>
    </header>
  );
}
