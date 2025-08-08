import { NextResponse } from "next/server";

export async function GET() {
  try {
    const baseUrl =
      process.env.OPENAI_BASE_URL ?? "https://api.openai.com/v1";

    let extraHeaders: Record<string, string> = {};
    if (process.env.OPENAI_ADDITIONAL_HEADERS) {
      try {
        extraHeaders = JSON.parse(process.env.OPENAI_ADDITIONAL_HEADERS);
      } catch (e) {
        console.warn("Failed to parse OPENAI_ADDITIONAL_HEADERS", e);
      }
    }

    const response = await fetch(`${baseUrl}/realtime/sessions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
        ...extraHeaders,
      },
      body: JSON.stringify({
        model:
          process.env.REALTIME_MODEL ??
          "gpt-4o-realtime-preview-2025-06-03",
      }),
    });
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in /session:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
