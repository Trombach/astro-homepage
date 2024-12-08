import { getLatestCommitDate } from "@it-astro:content/git";
import { getEntry } from "astro:content";

export async function GET() {
  const person = await getEntry("person", "lukas");

  if (!person) {
    return new Response("Person not found", { status: 404 });
  }

  const { data } = person;
  const [firstName, lastName] = data.name.split(" ");
  const { city, region, zip, country } = data.currentLocation;
  const revision = await getLatestCommitDate(person);

  return new Response(
    `BEGIN:VCARD
VERSION:3.0
FN;CHARSET=UTF-8:${data.name}
N;CHARSET=UTF-8:${lastName};${firstName};;;
EMAIL;CHARSET=UTF-8;type=HOME,INTERNET:${data.contact.email}
ADR;CHARSET=UTF-8;TYPE=HOME:;;;${city};${region};${zip};${country}
URL;CHARSET=UTF-8:${data.contact.web}
X-SOCIALPROFILE;TYPE=linkedin:${data.contact.linkedIn}
REV:${revision.toISOString()}
END:VCARD
`,
    {
      headers: { "Content-Type": "text/vcard" },
    },
  );
}
