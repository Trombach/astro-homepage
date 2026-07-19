import type { CreateChallengeOptions } from "altcha-lib/types";

export type AstroAltchaConfig = {
  challengePath?: string;
  name?: string;
  challengeOptions?: AltchaChallengeOptions;
};

export type AltchaChallengeOptions = Omit<
  CreateChallengeOptions,
  "hmacSignatureSecret" | "hmacKeySignatureSecret"
>;

export type AstroAltchaHydrationStrategy = "onfocus" | "onload";
