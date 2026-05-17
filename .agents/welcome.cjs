/**
 * Firstbrain Welcome Banner
 * Prints a styled box with system information.
 */
'use strict';

const fs = require('fs');
const path = require('path');

function getMemory() {
    try {
        const memoryPath = path.join(process.cwd(), 'MEMORY.md');
        const content = fs.readFileSync(memoryPath, 'utf8');
        const nameMatch = content.match(/Name:\s*(.*)/);
        const langMatch = content.match(/Sprache:\s*(.*)/);
        return {
            name: nameMatch ? nameMatch[1].trim() : 'Explorer',
            language: langMatch ? langMatch[1].trim() : 'Deutsch'
        };
    } catch (e) {
        return { name: 'Explorer', language: 'Deutsch' };
    }
}

function printBanner() {
    const memory = getMemory();
    const version = "3.0.0-PRO";
    const dir = process.cwd();
    const user = memory.name;

    const lines = [
        ` `,
        `   🧠 \x1b[1mFIRSTBRAIN -- OBSIDIAN EDITION\x1b[0m v${version}`,
        `   Your AI-Native Second Brain & Execution Engine`,
        ` `,
        `   Directory : ${dir}`,
        `   Partner   : ${user} | Language: ${memory.language}`,
        `   Session   : ${new Date().toLocaleString()}`,
        ` `,
        `   \x1b[32mTip: Type /scan to index your vault or /daily for today's note.\x1b[0m`,
        ` `
    ];

    const width = Math.max(...lines.map(l => l.replace(/\x1b\[\d+m/g, '').length)) + 4;
    
    console.log(`\x1b[36m┌${'─'.repeat(width)}┐\x1b[0m`);
    for (const line of lines) {
        const plainLength = line.replace(/\x1b\[\d+m/g, '').length;
        const padding = ' '.repeat(width - plainLength);
        console.log(`\x1b[36m│\x1b[0m${line}${padding}\x1b[36m│\x1b[0m`);
    }
    console.log(`\x1b[36m└${'─'.repeat(width)}┘\x1b[0m`);
}

printBanner();
