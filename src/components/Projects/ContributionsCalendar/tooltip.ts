import { arrow, computePosition, flip, offset, shift } from "@floating-ui/dom";

async function init() {
  const anchors = document.querySelectorAll("[data-tooltip]");

  for (const anchor of anchors) {
    if (!(anchor instanceof HTMLElement)) {
      continue;
    }

    const tooltipName = anchor.dataset.tooltip;

    const tooltipElement = document.querySelector(
      tooltipName
        ? `[data-tooltip-container="${tooltipName}"]`
        : "[data-tooltip-container]",
    );

    const arrowElement = tooltipElement?.querySelector("[data-tooltip-arrow]");

    async function update() {
      if (
        !(anchor instanceof HTMLElement) ||
        !(tooltipElement instanceof HTMLElement)
      ) {
        return;
      }

      // remove old content
      while (
        tooltipElement.lastChild?.nodeType !== Node.COMMENT_NODE &&
        tooltipElement.lastChild?.nodeValue !== "[tooltip content]"
      ) {
        tooltipElement.lastChild?.remove();
      }

      const comment = tooltipElement.lastChild;
      const template = anchor.querySelector("template");
      comment.after(
        template?.content.cloneNode(true) ?? document.createTextNode(""),
      );

      const { x, y, placement, middlewareData } = await computePosition(
        anchor,
        tooltipElement,
        {
          placement: "top",
          middleware: [
            offset(),
            flip({ fallbackAxisSideDirection: "start" }),
            shift(),
            arrowElement && arrow({ element: arrowElement }),
          ],
        },
      );
      Object.assign(tooltipElement.style, {
        left: `${x}px`,
        top: `${y}px`,
      });

      if (!middlewareData.arrow || !(arrowElement instanceof HTMLElement)) {
        return;
      }

      const key = placement.split("-")[0];

      if (!key) {
        return;
      }

      const staticSide = {
        top: "bottom",
        right: "left",
        bottom: "top",
        left: "right",
      }[key];

      if (!staticSide) {
        return;
      }

      const { x: arrowX, y: arrowY } = middlewareData.arrow;

      Object.assign(arrowElement.style, {
        left: arrowX != null ? `${arrowX}px` : "",
        top: arrowY != null ? `${arrowY}px` : "",
        right: "",
        bottom: "",
        [staticSide]: "-4px",
      });
    }

    function showTooltip() {
      if (tooltipElement instanceof HTMLElement) {
        tooltipElement.style.display = "block";
        update();
      }
    }

    function hideTooltip() {
      if (tooltipElement instanceof HTMLElement) {
        tooltipElement.style.display = "";
      }
    }

    for (const [event, listener] of [
      ["mouseenter", showTooltip],
      ["mouseleave", hideTooltip],
      ["focus", showTooltip],
      ["blur", hideTooltip],
    ] satisfies Array<[keyof HTMLElementEventMap, () => void]>) {
      anchor.addEventListener(event, listener);
    }
  }
}

await init();
