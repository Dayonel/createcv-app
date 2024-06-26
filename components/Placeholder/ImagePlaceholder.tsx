import { forwardRef, useContext, useEffect, useState } from 'react';
import Transition from '../Animations/Transition';
import styles from './ImagePlaceholder.module.scss';
import classNames from 'classnames';
import { FileUploaderDropContainer, InlineLoading } from '@carbon/react';
import { Remove } from '../DndKit/components/Remove/Remove';
import { MenuContext } from '../Providers/MenuProvider';
import imageCompression from 'browser-image-compression';

interface ImagePlaceholderProps extends React.HTMLAttributes<HTMLDivElement> {
  image: string | null;
  onFile: (e: string | null) => void;
}

export default forwardRef<HTMLDivElement, ImagePlaceholderProps>(
  function ImagePlaceholder({ className, image, onFile, ...props }, ref) {
    const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png'];
    const [src, setSrc] = useState<string | null>(() => image);
    const [error, setError] = useState<string | null>(null);
    const { edit } = useContext(MenuContext);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      setSrc(image);
    }, [image]);

    const preview = async (files: File[]) => {
      const file = files[0];

      const extension = `.${file.name.toLowerCase().split('.').pop()}`;
      if (!ALLOWED_EXTENSIONS.includes(extension)) {
        setError('File extension is not supported.');
        return;
      }

      if (file.size > 5000000) {
        setError('File size exceeds 5MB limit.');
        return;
      }

      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      try {
        setLoading(true);
        const compressedFile = await imageCompression(file, options);

        const reader = new FileReader();
        reader.addEventListener('load', () => {
          let result = reader.result?.toString();
          if (result) {
            setSrc(result);
            onFile(result);
          }
        });
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        setError('Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    return (
      <Transition
        active={edit || src !== null}
        ref={ref}
        {...props}
        className={classNames('block group pb-2 md:pb-0', className)}
      >
        {src !== null ? (
          <div className="relative w-fit group/item">
            <img className={styles.preview} alt="Preview" src={src} />
            <div className="absolute w-full opacity-0 group-hover/item:opacity-100 transition-opacity duration-150 md:duration-500">
              <Remove
                className="!-translate-y-full"
                onClick={() => {
                  setSrc(null);
                  setError(null);
                  onFile(null);
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
      </Transition>
    );
  }
);
