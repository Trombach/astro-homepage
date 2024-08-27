const vcfContent = `BEGIN:VCARD
VERSION:3.0
FN;CHARSET=UTF-8:Lukas Trombach
N;CHARSET=UTF-8:Trombach;Lukas;;;
EMAIL;CHARSET=UTF-8;type=HOME,INTERNET:me@lukastrombach.dev
TEL;TYPE=CELL:+4915140324079
ADR;CHARSET=UTF-8;TYPE=HOME:;;;Kiel;Schleswig-Holstein;24143;Deutschland
URL;CHARSET=UTF-8:https://lukastrombach.dev
X-SOCIALPROFILE;TYPE=linkedin:https://www.linkedin.com/in/lukas-trombach/
REV:2024-08-27T11:44:10.098Z
END:VCARD
`;

export function GET() {
  return new Response(vcfContent, {
    headers: { "Content-Type": "text/vcard" },
  });
}
