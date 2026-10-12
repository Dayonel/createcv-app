import { forwardRef, useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './image-placeholder.module.scss';
import classNames from 'classnames';
import { FileUploaderDropContainer, InlineLoading } from '@carbon/react';
import { Remove } from '../dndkit/components/remove/remove';
import { MenuContext } from '../providers/contexts';
import { compress, validate } from '@/utils/image';

interface ImagePlaceholderProps extends React.HTMLAttributes<HTMLDivElement> {
  image: string | undefined;
  onFile: (e: string | undefined) => void;
}

export default forwardRef<HTMLDivElement, ImagePlaceholderProps>(
  function ImagePlaceholder({ className, image, onFile, ...props }, ref) {
    const [src, setSrc] = useState<string | undefined>(() => image);
    const [error, setError] = useState<string | null>(null);
    const { edit } = useContext(MenuContext);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      setSrc(image);
    }, [image]);

    const preview = async (files: File[]) => {
      const file = files[0];
      const invalid = validate(file);
      if (invalid) return setError(invalid);

      try {
        setLoading(true);
        const result = await compress(file);
        setSrc(result);
        onFile(result);
      } catch (error) {
        setError('Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    if (!edit && !src) return null;

    return (
      <div className={classNames('block group pb-2 md:pb-0', className)}>
        {src !== undefined ? (
          <div className="relative w-fit group/item">
            <Image
              className={styles.preview}
              alt="Preview"
              src={src}
              width={150}
              height={150}
              unoptimized
            />
            <div className="absolute w-full opacity-0 group-hover/item:opacity-100 transition-opacity duration-150 md:duration-500">
              <Remove
                className="!-translate-y-full"
                onClick={() => {
                  setSrc(undefined);
                  setError(null);
                  onFile(undefined);
                }}
              ></Remove>
            </div>
          </div>
        ) : (
          <div className="print:hidden">
            {loading ? (
              <InlineLoading
                className={classNames(
                  styles.placeholder,
                  'flex justify-center'
                )}
              ></InlineLoading>
            ) : (
              <FileUploaderDropContainer
                className={classNames(
                  styles.placeholder,
                  error ? styles.error : ''
                )}
                labelText={
                  error ? error : 'Drag and drop files here or click to upload'
                }
                accept={['image/jpeg', 'image/png']}
                onAddFiles={(_, f) => preview(f.addedFiles)}
                name=""
              />
            )}
          </div>
        )}
      </div>
    );
  }
);
