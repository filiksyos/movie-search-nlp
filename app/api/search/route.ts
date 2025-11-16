import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();

    if (!query) {
      return NextResponse.json(
        { error: "Query is required" },
        { status: 400 }
      );
    }

    const openRouterApiKey = process.env.OPENROUTER_API_KEY;

    if (!openRouterApiKey) {
      // Fallback: simple keyword extraction if no API key
      console.warn("OpenRouter API key not found, using fallback");
      return NextResponse.json({ searchTerms: query });
    }

    // Use OpenRouter to process natural language query
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openRouterApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.2-3b-instruct:free",
        messages: [
          {
            role: "system",
            content: "You are a movie search assistant. Convert natural language queries into simple movie search keywords. Extract the main movie title, genre, or theme. Return ONLY the search keywords, nothing else. Be concise - maximum 3-5 words."
          },
          {
            role: "user",
            content: query
          }
        ],
      }),
    });

    if (!response.ok) {
      console.error("OpenRouter API error:", await response.text());
      return NextResponse.json({ searchTerms: query });
    }

    const data = await response.json();
    const searchTerms = data.choices?.[0]?.message?.content?.trim() || query;

    return NextResponse.json({ searchTerms });
  } catch (error) {
    console.error("Error processing search:", error);
    return NextResponse.json(
      { error: "Failed to process search query" },
      { status: 500 }
    );
  }
}