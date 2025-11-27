import type { CSSProperties } from 'react';
import { Body, Container, Head, Html, Section, Text } from '@react-email/components';

export type InternalNewCaseEmailProps = {
  caseNumber: string;
  fullName?: string | null;
  email?: string | null;
  targetPlatform: string;
  profileLink?: string | null;
  description?: string | null;
  screenshotUrls?: string[];
  submittedAt: string;
};

export function InternalNewCaseEmail(props: InternalNewCaseEmailProps) {
  const {
    caseNumber,
    fullName,
    email,
    targetPlatform,
    profileLink,
    description,
    screenshotUrls,
    submittedAt,
  } = props;

  return (
    <Html>
      <Head />
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Section style={sectionStyle}>
            <Text style={headingStyle}>New Case Submitted</Text>

            <Text style={labelStyle}>Case Number</Text>
            <Text style={valueStyle}>{caseNumber}</Text>

            <Text style={labelStyle}>User</Text>
            <Text style={valueStyle}>
              {(fullName || 'Unknown name') + (email ? ` • ${email}` : '')}
            </Text>

            <Text style={labelStyle}>Submitted At</Text>
            <Text style={valueStyle}>{submittedAt}</Text>

            <Text style={labelStyle}>Target Platform</Text>
            <Text style={valueStyle}>{targetPlatform}</Text>

            {profileLink ? (
              <>
                <Text style={labelStyle}>Profile Link</Text>
                <Text style={valueStyle}>{profileLink}</Text>
              </>
            ) : null}

            {description ? (
              <>
                <Text style={labelStyle}>Description</Text>
                <Text style={valueStyle}>{description}</Text>
              </>
            ) : null}

            {screenshotUrls && screenshotUrls.length > 0 ? (
              <>
                <Text style={labelStyle}>Screenshot URLs</Text>
                {screenshotUrls.map((url) => (
                  <Text key={url} style={valueStyle}>
                    {url}
                  </Text>
                ))}
              </>
            ) : null}
          </Section>

          <Section>
            <Text style={reminderStyle}>
              Log into the admin dashboard to review and begin processing.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const bodyStyle: CSSProperties = {
  backgroundColor: '#f6f6f6',
  padding: '24px 0',
  fontFamily: 'Inter, Arial, sans-serif',
};

const containerStyle: CSSProperties = {
  width: '100%',
  maxWidth: '560px',
  margin: '0 auto',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  padding: '32px',
  border: '1px solid #e5e7eb',
};

const sectionStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
};

const headingStyle: CSSProperties = {
  fontSize: '18px',
  fontWeight: 600,
  marginBottom: '8px',
  color: '#0b1f3a',
};

const labelStyle: CSSProperties = {
  fontSize: '12px',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  color: '#6b7280',
  marginTop: '12px',
};

const valueStyle: CSSProperties = {
  fontSize: '15px',
  color: '#111827',
  lineHeight: 1.4,
};

const reminderStyle: CSSProperties = {
  marginTop: '24px',
  fontSize: '14px',
  color: '#374151',
};
