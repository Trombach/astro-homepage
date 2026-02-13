import { GH_TOKEN } from "astro:env/server";
import { z } from "astro:schema";
import fetch from "./fetchHelper";

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

export const schema = z
  .object({
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
  })
  .transform((data) => ({
    totalContributions:
      data.data.user.contributionsCollection.contributionCalendar
        .totalContributions,
    weeks: data.data.user.contributionsCollection.contributionCalendar.weeks,
  }));

export default async function getGithubContributions() {
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

    if ("issues" in contributions) {
      return {
        error: contributions,
        message: "Error validating data from Github",
      };
    }

    return contributions;
  } catch (e) {
    console.error(e);
    return {
      error: e,
      message: "Error fetching data from Github",
    };
  }
}
