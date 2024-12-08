import { getCollection } from "astro:content";
import { OGImageRoute } from "astro-og-canvas";

const projects = await getCollection("projects");
const pages = Object.fromEntries(
  projects.map(({ id, data: { title, description } }) => [
    id,
    { title, description },
  ]),
);
pages.landing = { title: "lukastrombach.dev", description: "Lukas Trombach" };
pages.projects = {
  title: "My Projects",
  description: "What I've been working on",
};
pages.contact = {
  title: "Get in touch",
  description: "contact@lukastrombach.dev",
};

export const { getStaticPaths, GET } = OGImageRoute({
  param: "id",
  pages,
  getImageOptions: (_path, page: (typeof pages)[number]) => {
    return {
      format: "WEBP",
      title: page.title,
      description: page.description,
      bgImage: {
        path: "./src/images/og-image.png",
        fit: "contain",
        position: "center",
      },
      border: { color: [124, 58, 237], side: "inline-start", width: 16 },
      logo: { path: "./src/images/logo.png", size: [250] },
      font: {
        title: { families: ["Inter"] },
        description: { families: ["Inter"] },
      },
      fonts: [
        "https://cdn.jsdelivr.net/fontsource/fonts/inter:vf@latest/latin-wght-normal.woff2",
      ],
    };
  },
});
