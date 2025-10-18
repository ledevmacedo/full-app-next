import { NextResponse } from "next/server";

export function validateParameters(
  params: Record<string, unknown>,
  customMessage?: string
): NextResponse | null {
  const missingFields = Object.keys(params).filter((key) => {
    const value = params[key];
    return value === undefined || value === null || value === "";
  });

  if (missingFields.length > 0) {
    const message =
      customMessage ||
      `The following parameters are missing or empty: ${missingFields.join(
        ", "
      )}`;
    return NextResponse.json({ message }, { status: 400 });
  }

  return null;
}
