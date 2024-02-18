import { z } from "astro/zod";
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
  return await fetch(schema, GH_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.GH_TOKEN}`,
    },
    body: JSON.stringify({ query: QUERY, variables: { userName: USERNAME } }),
  });
}
export type GithubContributions = Awaited<
  ReturnType<typeof getGithubContributions>
>;
