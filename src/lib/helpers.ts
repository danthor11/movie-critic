import { NextResponse } from "next/server";

export function getErrorResponse(
  status: number = 500,
  message: string,
  errors = null
) {
  return new NextResponse(
    JSON.stringify({
      status: status < 500 ? "fail" : "error",
      message,
      errors: errors ? " " : null,
    }),
    {
      status,
      headers: { "Content-Type": "application/json" },
    }
  );
}
