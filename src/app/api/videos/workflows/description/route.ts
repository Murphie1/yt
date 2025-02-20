import { db } from "@/db";
import { videos } from "@/db/schema";
import { serve } from "@upstash/workflow/nextjs";
import { and, eq } from "drizzle-orm";
import { GenerateContentResponse } from "@google/generative-ai";

interface InputType {
  userId: string;
  videoId: string;
}
const DESCRIPTION_SYSTEM_PROMPT = `Your task is to summarize the transcript of a video. Please follow these guidelines:
- Be brief. Condense the content into a summary that captures the key points and main ideas without losing important details.
- Avoid jargon or overly complex language unless necessary for the context.
- Focus on the most critical information, ignoring filler, repetitive statements, or irrelevant tangents.
- ONLY return the summary, no other text, annotations, or comments.
- Aim for a summary that is 3-5 sentences long and no more than 200 characters.`;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;

export const { POST } = serve(async (context) => {
  const input = context.requestPayload as InputType;
  const { videoId, userId } = input;

  const video = await context.run("get-video", async () => {
    const [existingVideo] = await db
      .select()
      .from(videos)
      .where(and(eq(videos.id, videoId), eq(videos.userId, userId)));

    if (!existingVideo) {
      throw new Error("Not found");
    }

    return existingVideo;
  });

  const transcript = await context.run("get-transcript", async () => {
    const trackUrl = `https://stream.mux.com/${video.muxPlaybackId}/text/${video.muxTrackId}.txt`;
    const response = await fetch(trackUrl);
    const text = response.text();

    if (!text) {
      throw new Error("Bad Request");
    }

    return text;
  });

  const { body } = await context.call<GenerateContentResponse>(
    "generate-description",
    {
      method: "POST",
      url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        system_instruction: {
          parts: { text: DESCRIPTION_SYSTEM_PROMPT },
        },
        contents: {
          parts: {
            text: transcript,
          },
        },
      },
    },
  );

  await context.run("update-video", async () => {
    if (!body || !body.candidates) {
      throw new Error("Something went wrong");
    }

    await db
      .update(videos)
      .set({ description: body.candidates[0].content.parts[0].text })
      .where(and(eq(videos.id, video.id), eq(videos.userId, video.userId)));
  });
});
