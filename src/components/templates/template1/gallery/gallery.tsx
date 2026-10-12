import styles from './gallery.module.scss';
import Image from 'next/image';
import { useContext, useState } from 'react';
import { FileUploaderDropContainer, InlineLoading } from '@carbon/react';
import { v4 } from 'uuid';
import { MenuContext } from '@/components/providers/contexts';
import { Remove } from '@/components/dndkit/components/remove/remove';
import { SingleContent } from '../types/single';
import { Image as ImageType } from '../types/image';
import { Link } from '@carbon/icons-react';
import { toHref } from '@/components/rich-text/link';
import { GALLERY, compress, validate } from '@/utils/image';

const MAX = 3;

const Screenshot = ({ src, alt }: { src: string; alt: string }) => (
  <Image
    className={styles.image}
    src={src}
    alt={alt}
    width={1000}
    height={562}
    unoptimized
  />
);

interface GalleryProps {
  item: SingleContent;
  onChange: () => void;
}

export default function Gallery({ item, onChange }: GalleryProps) {
  const { edit } = useContext(MenuContext);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const images = item.images ?? [];

  const add = async (files: File[]) => {
    setError(null);
    setLoading(true);
    try {
      const selected = files.slice(0, MAX - images.length);
      const invalid = selected.map(validate).find(Boolean);
      if (invalid) throw new Error(invalid);

      const srcs = await Promise.all(selected.map((f) => compress(f, GALLERY)));
      item.images = [...images, ...srcs.map((src) => ({ src, key: v4() }))];
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
      onChange();
    }
  };

  const setLink = (m: ImageType) => {
    const url = window.prompt('Link', m.href ?? '');
    if (url === null) return;
    m.href = url ? toHref(url) : undefined;
    onChange();
  };

  const remove = (key: string) => {
    item.images = images.filter((m) => m.key !== key);
    if (!item.images.length) delete item.images;
    onChange();
  };

  const visible = images.filter((m) => m.src);
  if (!edit && !visible.length) return null;

  return (
    <div className={styles.gallery}>
      {visible.map((m) => (
        <div key={m.key} className="relative group/img">
          {m.href ? (
            <a
              href={m.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${m.href}`}
            >
              <Screenshot src={m.src} alt={m.href} />
            </a>
          ) : (
            <Screenshot src={m.src} alt="Project screenshot" />
          )}
          {edit && (
            <button
              type="button"
              title={m.href ?? 'Add link'}
              className={`${styles.link} absolute top-1 left-1 opacity-0 group-hover/img:opacity-100 print:hidden`}
              onClick={() => setLink(m)}
            >
              <Link />
            </button>
          )}
          {edit && (
            <div className="absolute top-0 right-0 opacity-0 group-hover/img:opacity-100 print:hidden">
              <Remove
                className="!translate-x-0 !translate-y-0 !top-1 !right-1"
                onClick={() => remove(m.key)}
              />
            </div>
          )}
        </div>
      ))}

      {edit && images.length < MAX && (
        <div className="print:hidden">
          {loading ? (
            <InlineLoading className={styles.drop} />
          ) : (
            <FileUploaderDropContainer
              className={styles.drop}
              labelText={error ?? 'Add images'}
              accept={['image/jpeg', 'image/png']}
              multiple
              onAddFiles={(_, f) => add(f.addedFiles)}
              name=""
            />
          )}
        </div>
      )}
    </div>
  );
}
