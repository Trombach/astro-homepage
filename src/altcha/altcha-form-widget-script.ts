import type { AltchaWidgetElement } from "altcha";
import type { AstroAltchaHydrationStrategy } from "./types";

const rawData = document.getElementById("altcha-data")?.innerText;

if (!rawData) {
  throw new Error("Missing altcha data");
}

const {
  name,
  strategy,
  debug,
}: {
  name: string;
  strategy: AstroAltchaHydrationStrategy;
  challengeEndpoint: string;
  debug: boolean;
} = JSON.parse(rawData);
const altchaWidget = document.querySelector(
  `altcha-widget[name=${name}]`,
) as AltchaWidgetElement;
const form = altchaWidget.closest("form");

if (!form) {
  throw new Error("Widget must be placed inside a form element");
}

// const submit = form.querySelector("[type=submit]");

init(strategy);

async function init(strategy: AstroAltchaHydrationStrategy) {
  form?.addEventListener(
    strategy === "onfocus" ? "focusin" : "onload",
    async () => {
      altchaWidget.dispatchEvent(loadStartEvent);
      await import("altcha");

      altchaWidget.configure({ debug: debug });
      altchaWidget.dispatchEvent(loadEndEvent);
    },
    { once: true },
  );
}

const loadStartEvent = new CustomEvent("before-load");
const loadEndEvent = new CustomEvent("after-load");
