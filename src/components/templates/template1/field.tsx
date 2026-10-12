import { getTextContent } from '@/utils/rich-text-utils';
import classNames from 'classnames';
import RichText from '@/components/rich-text/rich-text';
import Placeholder from '@/components/placeholder/placeholder';

interface FieldProps {
  item: Record<string, any>;
  name: string;
  label: string;
  placeholder: Record<string, any>;
  onChange: () => void;
  onRemove?: () => void;
  className?: string;
  input?: boolean;
}

export default function Field({
  item,
  name,
  label,
  placeholder,
  onChange,
  onRemove = onChange,
  className = '',
  input = true,
}: FieldProps) {
  if (!item[name])
    return (
      <Placeholder
        className={classNames(className, !input && 'w-full min-h-16')}
        placeholder={label}
        onClick={() => {
          item[name] = placeholder[name] ?? getTextContent(label);
          onChange();
        }}
      />
    );

  return (
    <RichText
      className={className}
      props={item[name]}
      onChange={(e) => {
        item[name] = e;
        onChange();
      }}
      onRemove={() => {
        delete item[name];
        onRemove();
      }}
      input={input}
      remove
    />
  );
}
