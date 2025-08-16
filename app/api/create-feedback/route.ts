import { NextRequest, NextResponse } from 'next/server';
import { feedbackSchema } from '@/constants/constant';
import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';

export async function POST(req: NextRequest) {
  try {
    const { word } = await req.json();

    const {
      object: { overview, keyPoints, bestPractices, warnings, summary },
    } = await generateObject({
      model: google('gemini-2.0-flash-001', {
        structuredOutputs: false,
      }),
      schema: feedbackSchema,
      prompt: `
        You are an expert lexicographer. I will give you a single English word.

        From it, extract the following structured insights in JSON format based on this schema:

        - overview: A short description of the word, including its part of speech and usage context.
        - keyPoints: An array of key details such as part of speech, etymology, word origin, or typical usage domain.
        - bestPractices: An array of correct usage tips or grammatical notes. Each should be phrased as a helpful instruction.
        - warnings: An array of common usage mistakes, misinterpretations, or pronunciation errors (if any).
        - summary: A concise definition of the word (1–2 sentences), suitable for learners.

        If any section does not apply to the word, return it as an empty array.

        Now analyze the following word:

        """
        ${word}
        """
      `,

    });

    return NextResponse.json({
      feedback: { overview, keyPoints, bestPractices, warnings, summary },
    });
  } catch (error) {
    console.error('AI generation error:', error);
    return NextResponse.json({ error: 'Failed to generate feedback.' }, { status: 500 });
  }
}
