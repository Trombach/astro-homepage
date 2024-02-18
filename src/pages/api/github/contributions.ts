/* global Response */

import getGithubContributions from "@utils/contributionsCalendar";
import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async () => {
  const data = await getGithubContributions();

  return new Response(JSON.stringify(data));
};
