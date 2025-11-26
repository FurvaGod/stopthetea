"use client";

import { useState } from "react";
import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import "@uploadthing/react/styles.css";

type UploadedFile = {
  key: string;
  name: string;
};

export function ScreenshotUploader() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  return (
    <div className="space-y-3 rounded-lg border border-dashed border-[#D1D5DB] p-4 text-sm text-[#1F2530]">
      <UploadButton<OurFileRouter, "caseScreenshots">
        endpoint="caseScreenshots"
        onClientUploadComplete={(files) => {
          const uploaded =
            files
              ?.map((file) => {
                const key = file.serverData?.fileKey ?? file.key ?? "";
                if (!key) {
                  return null;
                }
                const name = file.serverData?.fileName ?? file.name ?? "Screenshot";
                return { key, name };
              })
              .filter((file): file is UploadedFile => Boolean(file)) ?? [];
          setUploadedFiles((current) => [...current, ...uploaded]);
        }}
        onUploadError={(error) => {
          alert(`Upload failed: ${error.message}`);
        }}
        appearance={{
          button:
            "bg-[#0B1F3A] hover:bg-[#38B7B0] hover:text-[#0B1F3A] text-white font-semibold px-4 py-2 rounded-md",
          allowedContent: "text-xs text-[#3E4A56]",
        }}
      />
      <input
        type="hidden"
        name="screenshotFileKeys"
        value={JSON.stringify(uploadedFiles.map((file) => file.key))}
        readOnly
      />
      {uploadedFiles.length > 0 && (
        <ul className="space-y-2 text-[#3E4A56]">
          {uploadedFiles.map((file) => (
            <li key={file.key} className="truncate text-xs">
              {file.name}
            </li>
          ))}
        </ul>
      )}
      {uploadedFiles.length === 0 && <p className="text-xs text-[#6B7280]">Upload up to 4MB PNG or JPG evidence files.</p>}
    </div>
  );
}
