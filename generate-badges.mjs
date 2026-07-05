import fs from 'fs';
import path from 'path';

async function fetchStats() {
    try {
        const response = await fetch('https://www.owockibot.xyz/api/bounty-board');
        const data = await response.json();
        return data.workers || [];
    } catch (error) {
        console.error('Error fetching stats:', error);
        return [];
    }
}

function generateSVG(worker) {
    const { name, tasks, rank, streak, earnings } = worker;
    return `
<svg width="300" height="100" viewBox="0 0 300 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="300" height="100" rx="10" fill="#1A1A1A"/>
  <text x="20" y="30" fill="white" font-family="Arial" font-size="16" font-weight="bold">${name}</text>
  <text x="20" y="55" fill="#AAAAAA" font-family="Arial" font-size="12">Rank: ${rank} | Tasks: ${tasks}</text>
  <text x="20" y="75" fill="#AAAAAA" font-family="Arial" font-size="12">Streak: ${streak} | Earnings: ${earnings}</text>
  <rect x="240" y="20" width="40" height="40" rx="20" fill="#4CAF50"/>
</svg>
    `.trim();
}

async function main() {
    const workers = await fetchStats();
    const docsDir = path.join(process.cwd(), 'docs');

    if (!fs.existsSync(docsDir)) {
        fs.mkdirSync(docsDir);
    }

    workers.forEach(worker => {
        const svg = generateSVG(worker);
        const fileName = `${worker.walletAddress || worker.name}.svg`;
        fs.writeFileSync(path.join(docsDir, fileName), svg);
    });

    console.log(`Generated ${workers.length} badges.`);
}

main();
