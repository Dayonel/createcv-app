import { cn } from '@/lib/utils';
import { Warning } from '@carbon/icons-react';
import styles from './form-error.module.scss';

interface FormErrorProps {
  message?: string;
}

export default function FormError({ message }: FormErrorProps) {
  if (!message) return null;

  return (
    <div className={cn(styles.error, 'flex items-center gap-2')}>
      <Warning />
      <p className="text-xs">{message}</p>
    </div>
  );
}
