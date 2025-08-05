"use client";

import { generateReactHelpers } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { Toaster } from "@/components/ui/sonner";

export const { useUploadThing, uploadFiles } = generateReactHelpers<OurFileRouter>();

export function UploadThingProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
} 