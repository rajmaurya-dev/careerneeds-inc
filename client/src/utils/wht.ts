// ~/server/uploadthing.ts
import { UTApi } from "uploadthing/server";

interface UploadThingConfig {
  fetch: typeof fetch;
  apiKey: string;
}

export const utapi = new UTApi({
  fetch: (globalThis as any).fetch as typeof fetch,
  apiKey: process.env.UPLOADTHING_SECRET as string,
} as UploadThingConfig);
