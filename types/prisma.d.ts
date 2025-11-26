import "@prisma/client";

declare module "@prisma/client" {
  interface Case {
    screenshotUrls: string | null;
    copyrightedWorkDescription: string | null;
    dateCreated: Date | null;
    originalPublicationLocation: string | null;
    ownershipType: string | null;
    teaUsername: string | null;
    teaProfileUrl: string | null;
    whereContentAppears: string | null;
    commentsOrCaptions: string | null;
    fullLegalName: string | null;
    addressLine1: string | null;
    addressLine2: string | null;
    city: string | null;
    state: string | null;
    zip: string | null;
    country: string | null;
    email: string | null;
    phone: string | null;
    electronicSignature: string | null;
    signatureDate: Date | null;
  }
}
