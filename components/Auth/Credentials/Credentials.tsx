import {
  Button,
  Form,
  InlineLoading,
  PasswordInput,
  Stack,
  TextInput,
} from '@carbon/react';
import classNames from 'classnames';
import styles from './Credentials.module.scss';
import { ArrowRight } from '@carbon/icons-react';
import { ChangeEvent, FormEvent, useState } from 'react';
import { z } from 'zod';

type Form = {
  username?: string;
  password?: string;
};

const passwordError =
  'Your password must be at least 6 characters including one uppercase, one lowercase, and one number.';

export default function Credentials() {
  const [form, setForm] = useState<Form>({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any[]>([]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const mySchema = z
        .object({
          username: z.coerce
            .string()
            .email()
            .min(5, { message: 'Email is not valid' }),
          password: z.string().min(6, {
            message: passwordError,
          }),
        })
        .refine(
          (data) => {
            const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
            return regex.test(data.password);
          },
          {
            message: passwordError,
            path: ['password'],
          }
        );

      // store validation response
      const response = mySchema.safeParse({
        username: form!.username,
        password: form!.password,
      });

      // refine errors
      if (!response.success) {
        let errArr: any[] = [];
        const { errors: err } = response.error;
        for (var i = 0; i < err.length; i++) {
          errArr.push({ for: err[i].path[0], message: err[i].message });
        }
        setErrors(errArr);
        throw err;
      }

      setErrors([]);
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Form onSubmit={onSubmit} className={styles.credentials}>
      <Stack gap={4}>
        <TextInput
          type="text"
          id="username"
          name="username"
          required
          labelText=""
          placeholder="username@example.com"
          onChange={onChange}
          size="lg"
          invalid={errors.find((error) => error.for === 'username')}
          invalidText={
            errors.find((error) => error.for === 'username')?.message
          }
        />

        <PasswordInput
          type="password"
          id="password"
          name="password"
          labelText=""
          placeholder="Password"
          onChange={onChange}
          required
          size="lg"
          invalid={errors.find((error) => error.for === 'password')}
          invalidText={
            errors.find((error) => error.for === 'password')?.message
          }
        />

        <button
          className={classNames(styles.link, 'text-xs place-self-start')}
          type="button"
        >
          Forgot password?
        </button>

        <Button
          className="!w-full items-center"
          style={{ maxInlineSize: '100%' }}
          kind="primary"
          renderIcon={ArrowRight}
          type="submit"
          disabled={loading}
        >
          <div className="flex items-center gap-2">
            {loading && <InlineLoading></InlineLoading>}
            <span className="text-sm whitespace-nowrap">Continue</span>
          </div>
        </Button>

        <span className="flex justify-center gap-1">
          <span className={classNames(styles.dontHaveAccount, 'text-xs')}>
            Don't have an account?
          </span>
          <button className={classNames(styles.link, 'text-xs')} type="button">
            Create an account
          </button>
        </span>
      </Stack>
    </Form>
  );
}
