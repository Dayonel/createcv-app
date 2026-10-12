import { SingleContent as SingleContentType } from '../../types/single';
import { Calendar } from '@carbon/icons-react';
import useColorStore from '@/store/color-store';
import { useContext } from 'react';
import { MenuContext } from '@/components/providers/contexts';
import ActionButtons from '@/components/placeholder/action-buttons';
import Field from '../../field';
import Gallery from '../../gallery/gallery';
import { duration, getText } from '@/utils/rich-text-utils';

export interface SingleContentProps {
  props: SingleContentType;
  onChange: () => void;
  onRemove: () => void;
  onAdd: () => void;
  onDelete: (e: string) => void;
  placeholder: SingleContentType;
}

const gem = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinejoin="round"
  >
    <path d="M4 2h8l3 4-7 8-7-8zM1 6h14M6 2 5 6l3 8 3-8-1-4" />
  </svg>
);

const row = 'flex flex-wrap justify-between items-center gap-2';

export default function SingleContent({
  props,
  onChange,
  onRemove,
  onAdd,
  onDelete,
  placeholder,
}: SingleContentProps) {
  const { color } = useColorStore();
  const { edit } = useContext(MenuContext);
  if (!props) return null;

  const has = (...names: (keyof SingleContentType)[]) =>
    edit || names.some((n) => props[n]);

  const field = { item: props, placeholder, onChange, onRemove };
  const time = props.date ? duration(getText(props.date)) : '';

  return (
    <ActionButtons
      add
      onAdd={onAdd}
      remove
      onRemove={() => onDelete(props.key)}
    >
      <div className="relative flex flex-col gap-1 break-inside-avoid">
        {has('title', 'date') && (
          <div className={row}>
            <Field
              {...field}
              name="title"
              label="Heading 2"
              className="max-w-xs print:max-w-lg md:max-w-lg font-bold text-base"
            />
            <div className="flex items-center pl-[6px] font-bold text-xs">
              {props.date && <Calendar fill={color} />}
              <Field
                {...field}
                name="date"
                label="Date"
                className="font-bold text-xs max-w-xs"
              />
              {time && <span>· {time}</span>}
            </div>
          </div>
        )}

        {has('subtitle', 'topic') && (
          <div className={row}>
            <Field
              {...field}
              name="subtitle"
              label="Heading 3"
              className="max-w-xs print:max-w-lg md:max-w-lg font-bold text-sm"
            />
            <Field
              {...field}
              name="topic"
              label="Location"
              className="text-xs max-w-xs"
            />
          </div>
        )}

        <div className="pt-1">
          <Field
            {...field}
            name="description"
            label="Write something..."
            input={false}
            className="!min-h-0"
          />
        </div>

        {/* Skills */}
        {has('tech') && (
          <div className="flex items-center gap-1 pl-[6px] pt-2">
            {props.tech && gem}
            <Field
              {...field}
              name="tech"
              label="Skills"
              className="font-bold text-xs"
            />
          </div>
        )}

        <Gallery item={props} onChange={onChange} />
      </div>
    </ActionButtons>
  );
}
