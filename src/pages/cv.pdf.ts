import {
  CV_FILE_NAME,
  RUSTFS_ACCESS_KEY,
  RUSTFS_BUCKET_NAME,
  RUSTFS_ENDPOINT,
  RUSTFS_SECRET_KEY,
} from "astro:env/server";
import type { APIRoute } from "astro";
import { Client } from "minio";

export const prerender = false;

const minio = new Client({
  endPoint: RUSTFS_ENDPOINT,
  port: 443,
  accessKey: RUSTFS_ACCESS_KEY,
  secretKey: RUSTFS_SECRET_KEY,
  pathStyle: true,
});

export const GET: APIRoute = async () => {
  try {
    const response = await minio.getObject(RUSTFS_BUCKET_NAME, CV_FILE_NAME);

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of response) {
            controller.enqueue(chunk);
          }
          controller.close();
        } catch (e) {
          controller.error(e);
        }
      },
    });

    return new Response(stream, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${CV_FILE_NAME}"`,
      },
    });
  } catch (e) {
    return new Response(`Error fetching data: ${e}`, {
      status: 500,
    });
  }
};
