import packageJson from "@/package.json";

// Project
export const APP_NAME: string = process.env.APP_NAME!;
export const APP_VERSION = packageJson.version;

// API
export const API_KEY = process.env.API_KEY!;
export const API_URL_APP: string = process.env.NEXT_PUBLIC_API_URL_APP!;
export const URL_BASE_APP: string = process.env.NEXT_PUBLIC_URL_BASE_APP!;
