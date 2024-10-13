import type { CollectionEntry } from "astro:content";
import type { MarkdownHeading } from "astro";

export type ClassList = string | string[] | { [className: string]: boolean };
export type ProjectProps = CollectionEntry<"projects">["data"] & {
  headings: MarkdownHeading[];
};
