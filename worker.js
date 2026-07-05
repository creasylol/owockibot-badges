export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname.split('/').filter(Boolean);

    if (path.length === 0) {
      return new Response('Usage: /<walletAddress>.svg', { status: 400 });
    }

    const walletAddress = path[0].replace('.svg', '');

    try {
      const response = await fetch('https://www.owockibot.xyz/api/bounty-board');
      const data = await response.json();
      const workers = data.workers || [];
      const worker = workers.find((w) => w.walletAddress === walletAddress || w.name === walletAddress);

      if (!worker) {
        return new Response('Worker not found', { status: 404 });
      }

      const svg = `
<svg width="300" height="100" viewBox="0 0 300 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="300" height="100" rx="10" fill="#1A1A1A"/>
  <text x="20" y="30" fill="white" font-family="Arial" font-size="16" font-weight="bold">${worker.name}</text>
  <text x="20" y="55" fill="#AAAAAA" font-family="Arial" font-size="12">Rank: ${worker.rank} | Tasks: ${worker.tasks}</text>
  <text x="20" y="75" fill="#AAAAAA" font-family="Arial" font-size="12">Streak: ${worker.streak} | Earnings: ${worker.earnings}</text>
  <rect x="240" y="20" width="40" height="40" rx="20" fill="#4CAF50"/>
</svg>`.trim();

      return new Response(svg, {
        headers: {
          'Content-Type': 'image/svg+xml',
          'Cache-Control': 'public, max-age=1800'
        }
      });
    } catch (error) {
      return new Response('Error fetching data', { status: 500 });
    }
  }
};
