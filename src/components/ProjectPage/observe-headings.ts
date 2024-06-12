const CURRENT_HEADING_ATTR = "data-current-heading";

function setupObserver() {
  const links = Array.from(
    document.querySelector("nav#secondary")?.querySelectorAll("a") || [],
  );
  const articleHeadings =
    document
      .querySelector("article")
      ?.querySelectorAll("h1, h2, h3, h4, h5, h6") || [];
  const headings = Array.from(articleHeadings).filter(
    (heading) => heading.id !== "",
  );
  const indicator = document.getElementById("heading-indicator");

  const handleIntersect = (entries: IntersectionObserverEntry[]) => {
    //revert to initial state if no elements are intersecting and page is at the top
    if (
      indicator &&
      entries.every((entry) => !entry.isIntersecting) &&
      headings.every((heading) => heading.getBoundingClientRect().top > 0)
    ) {
      // reset indicator
      indicator.style.removeProperty("opacity");
      indicator.style.removeProperty("top");

      // set all links inactive
      links.forEach((link) => link.removeAttribute(CURRENT_HEADING_ATTR));

      return;
    }

    // get last entry an set it as active
    const entry = entries[entries.length - 1];
    if (entry?.isIntersecting) {
      const link = links.find((link) => link.hash === `#${entry.target.id}`);

      if (link) {
        // set active link
        link.setAttribute(CURRENT_HEADING_ATTR, "");
        if (indicator) {
          indicator.style.opacity = "1";
        }

        // move indicator
        const aside = document.getElementById("sidenav");
        const top =
          aside &&
          link.getBoundingClientRect().top - aside.getBoundingClientRect().top;

        if (indicator && top) {
          indicator.style.top = `${top + 3}px`;
        }
      }
      // set all other links as inactive
      links.forEach(
        (link) =>
          link.hash !== `#${entry.target.id}` &&
          link.removeAttribute(CURRENT_HEADING_ATTR),
      );
    }
  };

  if (headings.length > 0) {
    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 1,
    });
    headings.forEach((heading) => observer.observe(heading));
  }
}

setupObserver();

document.addEventListener("astro:after-swap", setupObserver);
