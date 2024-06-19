import { forwardRef, useContext, useEffect, useRef, useState } from 'react';
import Transition from '../Animations/Transition';
import styles from './ImagePlaceholder.module.scss';
import classNames from 'classnames';
import { FileUploaderDropContainer, FileUploaderItem } from '@carbon/react';
import { Remove } from '../DndKit/components/Remove/Remove';
import { MenuContext } from '../MenuProvider';

interface ImagePlaceholderProps extends React.HTMLAttributes<HTMLDivElement> {
  image: string | null;
  onFile: (e: string | null) => void;
}

export default forwardRef<HTMLDivElement, ImagePlaceholderProps>(
  function ImagePlaceholder({ className, image, onFile, ...props }, ref) {
    const [src, setSrc] = useState<string | null>(() => image);
    const [error, setError] = useState<string | null>(null);
    const { edit } = useContext(MenuContext);

    useEffect(() => {
      setSrc(image);
    }, [image]);

    const preview = (files: File[]) => {
      const file = files[0];

      if ('invalidFileType' in file) {
        setError('File extension is not supported.');
        return;
      }

      if (file.size > 5000000) {
        setError('File size exceeds 5MB limit.');
        return;
      }

      const reader = new FileReader();
      reader.addEventListener('load', () => {
        let result = reader.result?.toString();
        if (result) {
          setSrc(result);
          onFile(result);
        }
      });
      reader.readAsDataURL(file);
    };

    return (
      <Transition
        active={edit || src !== null}
        ref={ref}
        {...props}
        className={classNames('block group', className)}
      >
        {src !== null ? (
          <div className="relative group/item">
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
      </Transition>
    );
  }
);
