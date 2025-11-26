import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UTApi } from "uploadthing/server";
import { auth } from "@/lib/auth";

const f = createUploadthing();
const utapi = new UTApi();

export const ourFileRouter = {
  caseScreenshots: f({ image: { maxFileSize: "4MB" } })
    .middleware(async () => {
      const session = await auth();
      if (!session?.user) {
        throw new Error("Unauthorized");
      }
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const aclResult = await utapi.updateACL(file.key, "private");
      if (!aclResult?.success) {
        throw new Error("Unable to lock screenshot access");
      }
      return { fileKey: file.key, fileName: file.name, userId: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
