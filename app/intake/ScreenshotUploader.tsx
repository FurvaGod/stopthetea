"use client";

import { useMemo, useState } from "react";
import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import "@uploadthing/react/styles.css";

type UploadedFile = {
  key: string;
  name: string;
  url: string;
};

export function ScreenshotUploader() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [statusMessage, setStatusMessage] = useState<string>("No files uploaded yet.");

  const serializedUrls = useMemo(() => JSON.stringify(uploadedFiles.map((file) => file.url)), [uploadedFiles]);

  return (
    <div className="space-y-3 rounded-lg border border-dashed border-[#D1D5DB] p-4 text-sm text-[#1F2530]">
      <div className="flex items-center justify-between text-xs font-semibold text-[#0B1F3A]">
        <span>Upload screenshots (max 3)</span>
        <span className="text-[#6B7280]">{uploadedFiles.length}/3 uploaded</span>
      </div>
      <UploadButton<OurFileRouter, "caseEvidence">
        endpoint="caseEvidence"
        onUploadBegin={() => {
          setStatusMessage("Uploading screenshots…");
        }}
        onClientUploadComplete={(files) => {
          const uploaded =
            files
              ?.map((file) => {
                const key = file.serverData?.fileKey ?? file.key ?? "";
                const url = file.serverData?.fileUrl ?? file.url ?? "";
                if (!key || !url) {
                  return null;
                }
                const name = file.serverData?.fileName ?? file.name ?? "Screenshot";
                return { key, name, url };
              })
              .filter((file): file is UploadedFile => Boolean(file)) ?? [];

          setUploadedFiles((current) => {
            const combined = [...current, ...uploaded];
            if (combined.length > 3) {
              return combined.slice(0, 3);
            }
            return combined;
          });
          setStatusMessage("Upload complete.");
        }}
        onUploadError={(error) => {
          setStatusMessage("Upload failed. Try again.");
          alert(`Upload failed: ${error.message}`);
        }}
        appearance={{
          button:
            "bg-[#0B1F3A] hover:bg-[#38B7B0] hover:text-[#0B1F3A] text-white font-semibold px-4 py-2 rounded-md",
          allowedContent: "text-xs text-[#3E4A56]",
        }}
      />
      <input type="hidden" name="screenshotUrls" value={serializedUrls} readOnly />
      {uploadedFiles.length > 0 ? (
        <ul className="space-y-2 text-[#3E4A56]">
          {uploadedFiles.map((file) => (
            <li key={file.key} className="flex items-center gap-2 text-xs">
              <span className="inline-block h-2 w-2 rounded-full bg-[#38B7B0]" />
              <span className="truncate">{file.name}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-xs text-[#6B7280]">Upload up to 4MB PNG or JPG evidence files.</p>
      )}
      <p className="text-xs text-[#6B7280]">{statusMessage}</p>
    </div>
  );
}
