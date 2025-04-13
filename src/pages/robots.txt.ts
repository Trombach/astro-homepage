import { COOLIFY_FQDN } from "astro:env/server";

export async function GET() {
  const headers = {
    "Content-Type": "text/plain",
  };

  if (!COOLIFY_FQDN?.includes("preview")) {
    return new Response(
      `User-agent: *
Allow: /
Disallow: /cdn-cgi/

Sitemap: https://www.lukastrombach.dev/sitemap-index.xml
`,
      { headers },
    );
  }

  return new Response(
    `User-agent: *
Disallow: /
`,
    { headers },
  );
}
