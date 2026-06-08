export function loader() {
  const content = [
    "User-agent: *",
    "Allow: /",
    "",
    "Sitemap: https://thamserkuexpedition.com/sitemap.xml",
  ].join("\n");

  return new Response(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
