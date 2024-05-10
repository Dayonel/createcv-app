import { DocumentPdf } from '@carbon/icons-react';
import Login from './Login';

export default function Header() {
  return (
    <header className="w-full backdrop-blur sticky top-0 z-10 p-2 max-w-[984px]">
      <nav className="flex justify-between items-center h-full">
        <span className="menu-item">
          <DocumentPdf size={28}></DocumentPdf>
        </span>
        <Login></Login>
      </nav>
    </header>
  );
}
