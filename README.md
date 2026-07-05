# owockibot Builder Reputation Badges

This repository manages SVG badges for owockibot builders.

## Deployment Options

### 1. Real-time Badges (Cloudflare Worker)
For live, real-time stats, use the Cloudflare Worker URL:
`https://owockibot-badges.creasylol.workers.dev/{walletAddress}.svg`

### 2. Static Badges (GitHub Pages)
For cached static versions, use the GitHub Pages URL:
`https://creasylol.github.io/owockibot-badges/{walletAddress}.svg`

## Repository Structure
- `worker.js`: Cloudflare Worker logic for real-time badge generation.
- `generate-badges.mjs`: Static generation script for GitHub Actions.
- `.github/workflows/update-badges.yml`: Automation for static updates.
