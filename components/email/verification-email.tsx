import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  render,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

interface EmailTemplateProps {
  confirmLink: string;
}

export const verificationEmail = (confirmLink: string) => {
  return render(
    <VerificationEmail confirmLink={confirmLink}></VerificationEmail>
  );
};

export default function VerificationEmail({ confirmLink }: EmailTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>Confirm your account</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Heading className="text-black text-[24px] font-normal p-0 my-[30px] mx-0">
              <strong>Confirm your account</strong>
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Thank you for signing up for CreateCV. To confirm your account,
              please follow the button below.
            </Text>

            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#262626] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href={confirmLink}
              >
                Confirm account
              </Button>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              or copy and paste this URL into your browser:{' '}
              <Link href={confirmLink} className="text-blue-600 no-underline">
                {confirmLink}
              </Link>
            </Text>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              If you have further questions, write to us at{' '}
              <Link
                href="mailto:info@createcv.app"
                className="text-blue-600 no-underline"
              >
                info@createcv.app
              </Link>{' '}
              and our team will get back to you.
            </Text>

            <Section className="mt-[32px]">
              <Img
                src="https://createcv.app/logo.png"
                width="64"
                height="64"
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
                , the rich text resume editor.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
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
