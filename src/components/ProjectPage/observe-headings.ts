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
      for (const link of links) {
        link.removeAttribute(CURRENT_HEADING_ATTR);
      }

      return;
    }

    // get first intersecting entry an set it as active
    const entry = entries.filter(({ isIntersecting }) => isIntersecting)[0];
    if (entry) {
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
          indicator.style.top = `${top + 4}px`;
        }
      }
      // set all other links as inactive
      for (const link of links) {
        link.hash !== `#${entry.target.id}` &&
          link.removeAttribute(CURRENT_HEADING_ATTR);
      }
    }
  };

  if (headings.length > 0) {
    const observer = new IntersectionObserver(handleIntersect, {
      rootMargin: "0% 0% -85% 0%",
      threshold: 0,
    });
    for (const heading of headings) observer.observe(heading);
  }
}

setupObserver();

document.addEventListener("astro:after-swap", setupObserver);
