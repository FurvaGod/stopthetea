import type { CSSProperties } from "react";
import { Body, Container, Head, Heading, Hr, Html, Preview, Text } from "@react-email/components";

export type CaseReceivedEmailProps = {
  fullName: string;
  caseNumber: string;
  targetPlatform: string;
  profileLink?: string;
  submittedAt: string;
};

const COLORS = {
  navy: "#0B1F3A",
  teal: "#38B7B0",
  gray: "#F4F6F8",
  lightGray: "#E5E7EB",
};

const baseFont: CSSProperties = {
  fontFamily: "Inter, Arial, sans-serif",
  color: COLORS.navy,
};

const cardStyle: CSSProperties = {
  ...baseFont,
  maxWidth: "620px",
  margin: "0 auto",
  backgroundColor: "#FFFFFF",
  borderRadius: "24px",
  padding: "36px",
  boxShadow: "0 20px 45px rgba(11,31,58,0.18)",
};

const labelStyle: CSSProperties = {
  fontSize: "11px",
  letterSpacing: "0.25em",
  textTransform: "uppercase",
  color: COLORS.teal,
  fontWeight: 600,
  marginBottom: "6px",
};

const detailBoxStyle: CSSProperties = {
  border: `1px solid ${COLORS.lightGray}`,
  borderRadius: "18px",
  padding: "20px",
  marginBottom: "16px",
};

const sectionTitleStyle: CSSProperties = {
  fontSize: "18px",
  fontWeight: 600,
  marginBottom: "10px",
};

export function CaseReceivedEmail({ fullName, caseNumber, targetPlatform, profileLink, submittedAt }: CaseReceivedEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your StopTheTea case has been received.</Preview>
      <Body style={{ margin: 0, padding: 0, backgroundColor: COLORS.navy }}>
        <div style={{ backgroundColor: COLORS.gray, padding: "40px 0" }}>
          <Container style={cardStyle}>
            <Heading style={{ marginTop: 0, fontSize: "30px" }}>Hi {fullName},</Heading>
            <Text style={{ fontSize: "16px", lineHeight: 1.6 }}>
              We’ve received your StopTheTea takedown request and opened the case below. Our removals team will reach out if there’s
              anything else we need.
            </Text>

            <div style={{ marginTop: "28px" }}>
              <div style={detailBoxStyle}>
                <Text style={labelStyle}>Case number</Text>
                <Text style={{ fontSize: "22px", fontWeight: 600 }}>{caseNumber}</Text>
              </div>
              <div style={{ ...detailBoxStyle, backgroundColor: COLORS.gray }}>
                <Text style={labelStyle}>Case details</Text>
                <Text style={{ margin: "6px 0" }}>
                  <strong>Platform:</strong> {targetPlatform}
                </Text>
                <Text style={{ margin: "6px 0" }}>
                  <strong>Submitted:</strong> {submittedAt}
                </Text>
                {profileLink && (
                  <Text style={{ margin: "6px 0" }}>
                    <strong>Profile link:</strong> <a href={profileLink}>{profileLink}</a>
                  </Text>
                )}
              </div>
            </div>

            <div style={{ ...detailBoxStyle, backgroundColor: "#FFFFFF" }}>
              <Text style={sectionTitleStyle}>What happens next</Text>
              <Text style={{ margin: 0, lineHeight: 1.5 }}>
                Our specialists draft a compliant notice and submit it to the platform’s Trust &amp; Safety team. You’ll receive status
                updates in your dashboard, and we’ll email you if we need extra evidence.
              </Text>
            </div>

            <div style={{ ...detailBoxStyle, backgroundColor: COLORS.gray }}>
              <Text style={sectionTitleStyle}>Need help?</Text>
              <Text style={{ margin: 0, lineHeight: 1.5 }}>
                Reply to this message or email <a href="mailto:support@stopthetea.com">support@stopthetea.com</a> if you have
                questions or urgent updates.
              </Text>
            </div>

            <Text style={{ marginTop: "24px", fontSize: "14px", color: "#4B5563" }}>— The StopTheTea Support Team</Text>
            <Hr style={{ margin: "24px 0", borderColor: COLORS.lightGray }} />
            <Text style={{ fontSize: "12px", color: "#94A3B8" }}>
              You’re receiving this email because you submitted a removal request on StopTheTea.com.
            </Text>
          </Container>
        </div>
      </Body>
    </Html>
  );
}
