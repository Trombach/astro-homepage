import type { MarkdownHeading } from "astro";
import type { Tool } from "src/content/config";

export type ClassList = string | string[] | { [className: string]: boolean };
export type ProjectProps = {
  title: string;
  headings: MarkdownHeading[];
  description: string;
  tools?: Tool[] | undefined;
  repoLink?: string | undefined;
  cover?: ImageMetadata | undefined;
  coverAlt?: string | undefined;
};
