import { config } from "virtual:astro-altcha-config";

export function getWidget(name?: string): HTMLElement {
  const altchaWidget = document.querySelector(
    `altcha-widget[name=${name || config.name}]`,
  );

  if (!(altchaWidget instanceof HTMLElement)) {
    throw new Error("Widget not initialised");
  }

  return altchaWidget;
}
