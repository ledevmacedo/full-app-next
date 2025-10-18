import { AxiosError } from "axios";
import { NextResponse } from "next/server";

export interface AxiosErrorResponse {
  status: number;
  message: string;
}

interface ErrorResponse {
  message: string;
}

export const handleAxiosError = (error: AxiosError<ErrorResponse>): never => {
  console.error("API Error:", error.message);

  const status = error.response?.status || 500;

  switch (status) {
    case 400:
      throw new Error("Invalid request. Check the sent data.");
    case 401:
      throw new Error("Unauthorized. Verify the token.");
    case 403:
      throw new Error("Access denied.");
    case 404:
      throw new Error("Resource not found.");
    case 500:
      throw new Error("Internal server error. Please try again later.");
    default:
      throw new Error(
        error.response?.data?.message || "Unexpected error. Please try again."
      );
  }
};

export function handleApiError(error: unknown): NextResponse {
  if (error instanceof AxiosError) {
    try {
      handleAxiosError(error);
    } catch (e: unknown) {
      if (e instanceof Error) {
        return NextResponse.json({ message: e.message }, { status: 500 });
      }
    }
  }
  return NextResponse.json(
    { message: "Unexpected error occurred" },
    { status: 500 }
  );
}
