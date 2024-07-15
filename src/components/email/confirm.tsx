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

interface EmailTemplateProps {
  loginCode: string;
}

export const confirmEmail = (loginCode: string) => {
  return render(<Confirm loginCode={loginCode}></Confirm>);
};

export default function Confirm({ loginCode }: EmailTemplateProps) {
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
            <strong>Confirm your account</strong>
          </Heading>

          <Text style={{ ...text, marginBottom: '14px' }}>
            Thanks for signing up for CreateCV. Please enter the following code
            to complete the login:
          </Text>

          <code style={code}>{loginCode}</code>

          <Text
            style={{
              ...text,
              fontStyle: 'italic',
              marginBottom: '14px',
              fontSize: '12px',
              marginTop: '5px',
            }}
          >
            Please note that this code will expire in 10 minutes.
          </Text>

          <Text
            style={{
              ...text,
              color: '#ababab',
              marginTop: '30px',
              marginBottom: '16px',
            }}
          >
            If you {"don't"} want to create an account, you can ignore this
            message.
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

const code = {
  display: 'inline-block',
  padding: '16px 4.5%',
  width: '90.5%',
  backgroundColor: '#f4f4f4',
  borderRadius: '5px',
  border: '1px solid #eee',
  color: '#333',
};
