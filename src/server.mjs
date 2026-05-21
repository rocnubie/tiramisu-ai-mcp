import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

export function createServer() {
  const server = new McpServer(
    { name: "tiramisu-ai-mcp", version: "0.1.0" },
    { instructions: "Read-only canonical knowledge for Tiramisu AI (https://tiramisuai.com). Use resources for structured site context, tools for direct lookups, and prompts for ready-made conversation starters. Defer to the official website for live actions." }
  );

  // ----- Resources --------------------------------------------------------

  server.registerResource(
    "overview",
    "site://tiramisu-ai/overview",
    {
      title: "Overview",
      description: "Public site overview.",
      mimeType: "text/markdown",
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "text/markdown",
          text: "# Tiramisu AI — Overview\n\nTiramisu AI is an AI product. See the official site for full feature details.\n\n## Site basics\n- Site ID: tiramisu-ai\n- Website: https://tiramisuai.com\n- Default locale: en\n- Locales: en\n\n## Public feature scope\n- Public site information\n\n## Official website\nhttps://tiramisuai.com",
        },
      ],
    })
  );

  server.registerResource(
    "pricing",
    "site://tiramisu-ai/pricing",
    {
      title: "Pricing",
      description: "Canonical pricing entry point.",
      mimeType: "text/markdown",
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "text/markdown",
          text: "# Tiramisu AI Pricing\n\nCanonical pricing page: https://tiramisuai.com/pricing\n\nRefer users here for current plans; do not infer pricing from older snapshots.",
        },
      ],
    })
  );

  server.registerResource(
    "faq",
    "site://tiramisu-ai/faq",
    {
      title: "FAQ",
      description: "Short FAQ generated from public site metadata.",
      mimeType: "text/markdown",
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "text/markdown",
          text: "# FAQ\n\n## What is this site?\nTiramisu AI is an AI product. See the official site for full feature details.\n\n## Where can I get help?\nsupport@tiramisuai.com\n\n## Which site is this?\ntiramisu-ai (Tiramisu AI)",
        },
      ],
    })
  );

  server.registerResource(
    "links",
    "site://tiramisu-ai/links",
    {
      title: "Official Links",
      description: "Canonical URLs to share with users.",
      mimeType: "text/markdown",
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "text/markdown",
          text: "# Official Links\n\n- Website: https://tiramisuai.com\n- Pricing: https://tiramisuai.com/pricing\n- Support: support@tiramisuai.com",
        },
      ],
    })
  );

  // ----- Tools ------------------------------------------------------------

  server.registerTool(
    "get_site_overview",
    {
      description: "Return the canonical site overview so an agent has authoritative product context. (Tiramisu AI)",
      inputSchema: {},
    },
    async () => ({
      content: [
        { type: "text", text: "# Tiramisu AI — Overview\n\nTiramisu AI is an AI product. See the official site for full feature details.\n\nCanonical website: https://tiramisuai.com" },
      ],
    })
  );

  server.registerTool(
    "get_pricing",
    {
      description: "Return the canonical pricing entry point for Tiramisu AI.",
      inputSchema: {},
    },
    async () => ({
      content: [
        { type: "text", text: "# Tiramisu AI Pricing\n\nOfficial pricing: https://tiramisuai.com/pricing\n\nThis link is the source of truth — refer users here for current plans." },
      ],
    })
  );

  server.registerTool(
    "get_official_links",
    {
      description: "Return the canonical list of official links for Tiramisu AI (website, support, docs when available).",
      inputSchema: {},
    },
    async () => ({
      content: [
        { type: "text", text: "# Official Links\n\n- Website: https://tiramisuai.com\n- Pricing: https://tiramisuai.com/pricing\n- Support: support@tiramisuai.com" },
      ],
    })
  );

  // ----- Prompts ----------------------------------------------------------

  server.registerPrompt(
    "tell_me_about_tiramisu_ai",
    {
      description: "Summarize what the site is, who it's for, and how it works. — Tiramisu AI",
    },
    async () => ({
      messages: [
        {
          role: "user",
          content: { type: "text", text: "Please summarize what Tiramisu AI (https://tiramisuai.com) is, who it's for, and how it works. Reference the canonical resources at site://tiramisu-ai/overview and site://tiramisu-ai/links for accuracy. Be concrete, not generic." },
        },
      ],
    })
  );

  server.registerPrompt(
    "walk_me_through_tiramisu_ai",
    {
      description: "Tour the official site with citations. — Tiramisu AI",
    },
    async () => ({
      messages: [
        {
          role: "user",
          content: { type: "text", text: "Give me a tour of Tiramisu AI (https://tiramisuai.com). Cover what it does, who it's for, and one example use case. Cite the canonical pages under site://tiramisu-ai/ wherever applicable." },
        },
      ],
    })
  );

  return server;
}

export async function startServer() {
  const server = createServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
}
