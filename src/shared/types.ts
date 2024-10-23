import type { CollectionEntry } from "astro:content";
import type { MarkdownHeading } from "astro";

export type ProjectProps = CollectionEntry<"projects">["data"] & {
  headings: MarkdownHeading[];
};
