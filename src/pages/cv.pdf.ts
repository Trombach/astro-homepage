import {
  CV_FILE_NAME,
  getSecret,
  RUSTFS_ACCESS_KEY,
  RUSTFS_BUCKET_NAME,
  RUSTFS_ENDPOINT,
} from "astro:env/server";
import type { APIRoute } from "astro";
import { Client } from "minio";

export const prerender = false;

const minio = new Client({
  endPoint: RUSTFS_ENDPOINT,
  port: 443,
  accessKey: RUSTFS_ACCESS_KEY,
  secretKey: getSecret("RUSTFS_SECRET_KEY") ?? "",
  pathStyle: true,
});

export const GET: APIRoute = async () => {
  try {
    const response = await minio.getObject(RUSTFS_BUCKET_NAME, CV_FILE_NAME);

    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of response) {
          controller.enqueue(chunk);
        }
        controller.close();
      },
    });

    return new Response(stream, { status: 200 });
  } catch (e) {
    return new Response(`Error fetching data: ${e}`, {
      status: 500,
    });
  }
};
