import { z } from "astro/zod";
import fetch from "./fetchHelper";
import { getSecret } from "astro:env/server";

const GH_API = "https://api.github.com/graphql";
const USERNAME = "Trombach";
const QUERY = `
  query($userName:String!) {
    user(login: $userName){
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`;

export const schema = z.object({
  data: z.object({
    user: z.object({
      contributionsCollection: z.object({
        contributionCalendar: z.object({
          totalContributions: z.number(),
          weeks: z.array(
            z.object({
              contributionDays: z.array(
                z.object({
                  contributionCount: z.number(),
                  date: z.coerce.date(),
                }),
              ),
            }),
          ),
        }),
      }),
    }),
  }),
});

export default async function getGithubContributions() {
  const GH_TOKEN = getSecret("GH_TOKEN");

  if (!GH_TOKEN) {
    return {
      error: new Error("Missing auth token"),
      message: "Error fetching data from Github",
    };
  }

  try {
    const contributions = await fetch(schema, GH_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GH_TOKEN}`,
      },
      body: JSON.stringify({ query: QUERY, variables: { userName: USERNAME } }),
    });

    if (!("data" in contributions)) {
      return {
        error: contributions,
        message: "Error validation data from Github",
      };
    }

    return {
      totalContributions:
        contributions.data.user.contributionsCollection.contributionCalendar
          .totalContributions,
      weeks:
        contributions.data.user.contributionsCollection.contributionCalendar
          .weeks,
    };
  } catch (e) {
    console.error(e);
    return {
      error: e,
      message: "Error fetching data from Github",
    };
  }
}
