import { render } from '@react-email/render';
import { Html } from '@react-email/html';
import { Head } from '@react-email/head';
import { Body } from '@react-email/body';
import { Container } from '@react-email/container';
import { Heading } from '@react-email/heading';
import { Text } from '@react-email/text';
import { Section } from '@react-email/section';
import { Link } from '@react-email/link';
import { Hr } from '@react-email/hr';
import { Img } from '@react-email/img';
import { Button } from '@react-email/button';

interface ResetProps {
  resetLink: string;
}

export const resetEmail = (resetLink: string) => {
  return render(<Reset resetLink={resetLink}></Reset>);
};

export default function Reset({ resetLink }: ResetProps) {
  return (
    <Html>
      <Head />
      <Body
        style={{
          backgroundColor: 'white',
          margin: '0 auto',
          padding: '0 0.5rem',
          fontFamily:
            'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        }}
      >
        <Container
          style={{
            border: '1px solid #eaeaea',
            borderRadius: '0.25rem',
            margin: '40px auto',
            padding: '20px',
            maxWidth: '465px',
          }}
        >
          <Heading
            style={{
              color: '#000000',
              fontSize: '24px',
              fontWeight: 400,
              padding: 0,
              margin: '30px 0',
            }}
          >
            <strong>Reset password</strong>
          </Heading>
          <Text
            style={{
              ...text,
            }}
          >
            To reset your password please follow the link below. If you{' '}
            {"didn't"}
            request this password reset, you can safely ignore this email.
          </Text>

          <Section
            style={{
              textAlign: 'center',
              margin: '32px auto',
            }}
          >
            <Button
              style={{
                backgroundColor: '#262626',
                borderRadius: '0.25rem',
                color: 'white',
                fontSize: '12px',
                fontWeight: 600,
                textDecorationLine: 'none',
                textAlign: 'center',
                padding: '0.75rem 1.25rem',
              }}
              href={resetLink}
            >
              Reset your password
            </Button>
          </Section>
          <Text
            style={{
              color: '#000000',
              fontSize: '14px',
              lineHeight: '24px',
            }}
          >
            or copy and paste this URL into your browser:{' '}
            <Link
              style={{
                color: '#2563eb',
                textDecorationLine: 'none',
              }}
              href={resetLink}
            >
              {resetLink}
            </Link>
          </Text>
          <Hr
            style={{
              border: '1px solid #eaeaea',
              margin: '26px 0',
              width: '100%',
            }}
          />
          <Text
            style={{
              color: '#666666',
              fontSize: '12px',
              lineHeight: '24px',
            }}
          >
            If you have further questions, write to us at{' '}
            <Link
              style={{
                color: '#2563eb',
                textDecorationLine: 'none',
              }}
              href="mailto:info@createcv.app"
            >
              info@createcv.app
            </Link>{' '}
            and our team will get back to you.
          </Text>

          <Section
            style={{
              marginTop: '32px',
            }}
          >
            <Img
              src="https://createcv.app/logo.png"
              width="64"
              height="64"
              style={{ fontSize: '12px', color: '#ababab' }}
              alt="CreateCV logo"
            />

            <Text style={footer}>
              <Link
                href="https://createcv.app"
                target="_blank"
                style={{ ...link, color: '#898989' }}
              >
                createcv.app
              </Link>
              , the Rich Text resume editor.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const link = {
  color: '#2754C5',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  textDecoration: 'underline',
};

const footer = {
  color: '#898989',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '12px',
  lineHeight: '22px',
  marginTop: '12px',
  marginBottom: '24px',
};

const text = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  margin: '24px 0',
};
