import type { MarkdownHeading } from 'astro';
export interface TocItem extends MarkdownHeading {
  children: TocItem[];
}

function diveChildren(item: TocItem, depth: number): TocItem[] {
  if (depth === 1) {
    return item.children;
  } else {
    const nextItem = item.children[item.children.length - 1]
    if (!nextItem) {
      throw new Error('Error accessing next item')
    }
    // e.g., 2
    return diveChildren(nextItem, depth - 1);
  }
}

export default function generateToc(headings: MarkdownHeading[]) {
  headings = headings.filter(({ depth }) => depth > 1 && depth < 4);
  const toc: Array<TocItem> = [];

  for (const heading of headings) {
    if (toc.length === 0) {
      toc.push({
        ...heading,
        children: [],
      } satisfies TocItem);
    } else {
      const lastItemInToc = toc[toc.length - 1];
      if (!lastItemInToc) {
        throw new Error('Error accessing last item in toc')
      }
      if (heading.depth < lastItemInToc.depth) {
        throw new Error(`Orphan heading found: ${heading.text}.`);
      }
      if (heading.depth === lastItemInToc.depth) {
        // same depth
        toc.push({
          ...heading,
          children: [],
        });
      } else {
        // higher depth
        // push into children, or children' children alike
        const gap = heading.depth - lastItemInToc.depth;
        const target = diveChildren(lastItemInToc, gap);
        target.push({
          ...heading,
          children: [],
        });
      }
    }
  }
  return toc;
}