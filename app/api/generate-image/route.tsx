import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { prompt } = data;

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_KEY,
    });

    const input = {
      prompt: prompt,
      output_format: 'png',
      output_quality: 80,
      aspect_ratio: '1:1',
    };

    const output = await replicate.run("black-forest-labs/flux-schnell", { input });
    console.log(output);

    if (Array.isArray(output) && output.length > 0) {
      return NextResponse.json({ imageUrl: output[0] });
    } else {
      throw new Error("No output received from Replicate");
    }
  } catch (error) {
    console.error("Error generating image:", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
  }
}
