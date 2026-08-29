import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'AI insights service is currently offline. Please configure GEMINI_API_KEY.' },
        { status: 503 }
      );
    }

    const { birthYear, birthMonthName, birthDay, calculatedAge } = await req.json();

    if (!birthYear || !birthMonthName || !birthDay) {
      return NextResponse.json({ error: 'Missing birth date parameters.' }, { status: 400 });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const prompt = `You are a warm, insightful cultural historian and life milestone narrator for Age Calculator Pro.
The user was born on ${birthMonthName} ${birthDay}, ${birthYear} (currently approximately ${calculatedAge} years old).

Generate a concise, uplifting, and fascinating "Life Era Snapshot" in JSON format.
Include:
1. "headline": A catchy 5-8 word summary of their era (e.g. "Born in the Dawn of the Internet").
2. "historicalEra": A 2-sentence vivid paragraph about what the world was like during their birth year (major cultural vibe, technological breakthrough, music/cinema spirit).
3. "keyInventions": An array of 3 real inventions, pop-culture milestones, or tech discoveries introduced around their birth year.
4. "lifePerspective": A 2-sentence encouraging philosophical perspective on their current age milestone and living in this era.
5. "funFact": One delightful lesser-known fact about their birth year or generation.

Keep the tone encouraging, intelligent, and accurate. Do not include astrological predictions; keep it culturally and historically grounded.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text;
    if (!text) {
      return NextResponse.json({ error: 'No response from AI model' }, { status: 500 });
    }

    try {
      const parsed = JSON.parse(text);
      return NextResponse.json({ data: parsed });
    } catch {
      return NextResponse.json({ data: { text } });
    }
  } catch (error: any) {
    console.error('Error generating AI age insights:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to generate AI insights. Please try again.' },
      { status: 500 }
    );
  }
}
