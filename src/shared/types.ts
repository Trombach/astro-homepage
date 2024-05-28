import type { MarkdownHeading } from "astro";
import type { CollectionEntry } from "astro:content";

export type ClassList = string | string[] | { [className: string]: boolean };
export type ProjectProps = CollectionEntry<"projects">["data"] & {
  headings: MarkdownHeading[];
};
