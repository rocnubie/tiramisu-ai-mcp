# Tiramisu AI MCP Server

> MCP server for Tiramisu AI

[![MCP Badge](https://lobehub.com/badge/mcp/rocnubie-tiramisu-ai-mcp)](https://lobehub.com/mcp/rocnubie-tiramisu-ai-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Zero Config](https://img.shields.io/badge/setup-zero--config-7c3aed)](#installation)
[![Node](https://img.shields.io/badge/node-%3E%3D18-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![Stdio Transport](https://img.shields.io/badge/transport-stdio-6e6e6e)](https://modelcontextprotocol.io/specification)
[![Read Only](https://img.shields.io/badge/server-read--only-2ea44f)](#tools)
[![MCP](https://img.shields.io/badge/MCP-1.0-blue)](https://modelcontextprotocol.io)

A Model Context Protocol server that exposes the canonical Tiramisu AI knowledge surface — official site information, pricing, FAQ, official links — to MCP-compatible AI clients such as Claude Desktop, Cursor, Windsurf, and Continue. Read-only, no API keys, no quota, ~50 ms cold start.

Official website: https://tiramisuai.com

## ✨ About Tiramisu AI

Tiramisu AI is a web-based creative platform that brings together text-to-video generation, image-to-video conversion, image creation, and photo editing tools under a single interface. Rather than routing work across multiple specialized services, users can describe a scene in plain text and receive a video clip, animate a still photograph, generate original images from prompts, or swap backgrounds — all without leaving the platform. The service offers a free tier with daily credits and no watermarks, making it accessible for experimentation before committing to a paid plan. Both casual creators and professional teams will find the workflow familiar: upload or describe, choose a model, generate, and export.

## Key Features

- **Multi-model video generation**: Access to a curated set of video models — including Kling, Veo 3, Minimax Hailuo, Pixverse, Seedance, Wan 2.5, and others — selectable from a single dashboard without separate accounts or API keys per provider.
- **Text-to-video and image-to-video**: Generate short video clips from written descriptions or animate existing photos with realistic motion, with output lengths ranging from a few seconds on the free tier up to 20 seconds on premium plans.
- **Image generation and editing**: Over 15 image models available for creating visuals from prompts, alongside practical editing tools for background removal, background replacement, and face swapping.
- **Export quality tiers**: Free accounts receive 720p MP4 exports; premium plans add 1080p and 4K options along with batch processing for higher-volume workflows.
- **API access**: Developers can integrate generation capabilities into their own applications through an API, removing the need to build model infrastructure from scratch.
- **No-watermark free tier**: Daily free credits produce clean outputs, which is less common among comparable platforms that restrict watermark removal to paid subscribers.

## Use Cases

- **Social media content production**: Create short-form video clips for Instagram Reels, TikTok, or YouTube Shorts directly from text descriptions or product photos, without video editing software.
- **E-commerce product visualization**: Animate catalog images to show products in motion, or generate lifestyle imagery around static product shots to enrich listings and ads.
- **Marketing asset creation**: Produce video drafts and image variations for campaigns without waiting on external creative vendors, then refine in-platform before handoff.
- **Prototype and concept demos**: Developers and product teams can generate quick visual mockups or animated concept clips to communicate ideas before committing to full production.
- **API-driven content pipelines**: Integrate Tiramisu AI's generation endpoints into automated workflows — for example, dynamically producing video summaries or image assets at scale for a content-heavy application.

## Who Is It For

Tiramisu AI suits a broad range of users who need AI-generated visual content without managing separate model subscriptions or building their own generation stack. Content creators working across YouTube, TikTok, or Instagram will find the free tier practical for regular output. Marketing managers and social media teams benefit from the ability to produce and iterate on assets quickly inside one tool. E-commerce operators can use image-to-video features to make product pages more engaging. Developers who want to add video or image generation to their own products can access the same models through the API rather than negotiating individual provider agreements. The platform scales from individual hobbyist use up to team-level batch workflows.

## Tools

### `get_site_overview`
Return the canonical site overview so an agent has authoritative product context. (Tiramisu AI)

_Input:_ no parameters. _Returns:_ text/markdown.

### `get_pricing`
Return the canonical pricing entry point for Tiramisu AI.

_Input:_ no parameters. _Returns:_ text/markdown.

### `get_official_links`
Return the canonical list of official links for Tiramisu AI (website, support, docs when available).

_Input:_ no parameters. _Returns:_ text/markdown.

## Resources

- `site://tiramisu-ai/overview` — Public site overview.
- `site://tiramisu-ai/pricing` — Canonical pricing entry point.
- `site://tiramisu-ai/faq` — Short FAQ generated from public site metadata.
- `site://tiramisu-ai/links` — Canonical URLs to share with users.

## Prompts

### `tell_me_about_tiramisu_ai`
Summarize what the site is, who it's for, and how it works. — Tiramisu AI

### `walk_me_through_tiramisu_ai`
Tour the official site with citations. — Tiramisu AI

## Installation

### Install via Smithery

```bash
npx -y @smithery/cli install tiramisu-ai-mcp --client claude
```

(Replace `claude` with `cursor`, `windsurf`, or `continue` for those clients.)

### Install from source

```bash
git clone https://github.com/rocnubie/tiramisu-ai-mcp.git
cd tiramisu-ai-mcp
pnpm install
```

Then add to your MCP client config (`claude_desktop_config.json` for Claude Desktop, `mcp.json` for Cursor / Windsurf / Continue):

```json
{
  "mcpServers": {
    "tiramisu-ai-mcp": {
      "command": "node",
      "args": [
        "/absolute/path/to/tiramisu-ai-mcp/src/index.mjs"
      ]
    }
  }
}
```

### Debug with MCP Inspector

```bash
npx @modelcontextprotocol/inspector node src/index.mjs
```

## Official Links

- Website: https://tiramisuai.com
- Pricing: https://tiramisuai.com/pricing
- Support: support@tiramisuai.com

## Development

```bash
pnpm install
pnpm start                 # run the server over stdio
```

## License

MIT
