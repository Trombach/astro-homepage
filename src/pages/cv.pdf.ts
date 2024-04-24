import type { APIRoute } from "astro";
import { google } from "googleapis";

export const prerender = false;

export const GET: APIRoute = async () => {
  const fileId = import.meta.env.CV_FILE_ID;
  const auth = import.meta.env.GOOGLE_API_KEY;

  if (!fileId || !auth) {
    throw new Error("Missing Google Drive configuration");
  }

  const drive = google.drive({
    version: "v3",
    auth,
  });

  try {
    const { data } = await drive.files.get(
      { fileId, alt: "media" },
      { responseType: "arraybuffer" },
    );

    // @ts-expect-error TODO figure out how to do this without ts error
    return new Response(Buffer.from(data));
  } catch (err) {
    return new Response("Error fetching data from Google Drive", {
      status: 500,
    });
  }
};
