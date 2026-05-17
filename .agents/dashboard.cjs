/**
 * Firstbrain Elite Dashboard (v3.5)
 * Menu-only UI. Returns exit code for start.bat to handle launches.
 * Exit codes: 0=exit, 10=claude, 20=scan, 30=daily, 40=process, 50=briefing
 */
'use strict';

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// --- Styling (ANSI 256) ---
const C = {
    reset:    "\x1b[0m",
    bright:   "\x1b[1m",
    dim:      "\x1b[2m",
    cyan:     "\x1b[38;5;51m",
    blue:     "\x1b[38;5;33m",
    purple:   "\x1b[38;5;99m",
    gray:     "\x1b[38;5;242m",
    white:    "\x1b[38;5;255m",
    green:    "\x1b[38;5;84m",
    red:      "\x1b[38;5;196m",
    yellow:   "\x1b[38;5;220m",
    bgSelect: "\x1b[48;5;236m"
};

const BOX_WIDTH = 68;

let selectedIndex = 0;
let stats = { notes: 0, projects: 0, lastScan: 'never' };
let statusMessage = process.argv[2] || '';
let statusColor = C.green;

const menu = [
    { id: 'claude',   exitCode: 10, icon: '\u25C8', label: "Neural Stream",   desc: "Open Claude in Firstbrain Mode",  key: '1' },
    { id: 'scan',     exitCode: 20, icon: '\u25C9', label: "Sync Vault",      desc: "Update indexes & embeddings",     key: '2' },
    { id: 'daily',    exitCode: 30, icon: '\u25CB', label: "Daily Note",      desc: "Generate today's workspace",      key: '3' },
    { id: 'process',  exitCode: 40, icon: '\u25CA', label: "Process Inbox",   desc: "Execute pending prompts & tasks",  key: '4' },
    { id: 'briefing', exitCode: 50, icon: '\u25CE', label: "Briefing",        desc: "1-minute executive vault summary", key: '5' },
    { id: 'exit',     exitCode: 0,  icon: '\u2718', label: "Exit",            desc: "Disconnect",                       key: 'q' }
];

// --- Data ---

function loadStats() {
    try {
        const idxPath = path.join(process.cwd(), '.claude/indexes/vault-index.json');
        if (fs.existsSync(idxPath)) {
            const data = JSON.parse(fs.readFileSync(idxPath, 'utf8'));
            stats.notes = data.noteCount || 0;
            stats.lastScan = new Date(fs.statSync(idxPath).mtime).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
        }
    } catch (e) { /* ignore */ }

    try {
        const projDir = path.join(process.cwd(), '01 - Projects');
        if (fs.existsSync(projDir)) {
            stats.projects = fs.readdirSync(projDir).filter(f => f.endsWith('.md') && !f.startsWith('.')).length;
        }
    } catch (e) { /* ignore */ }
}

// --- Rendering ---

function stripAnsi(str) {
    return str.replace(/\x1b\[[0-9;]*m/g, '');
}

function centerText(text, width) {
    const plain = stripAnsi(text);
    const pad = Math.max(0, Math.floor((width - plain.length) / 2));
    return ' '.repeat(pad) + text + ' '.repeat(Math.max(0, width - plain.length - pad));
}

function padRight(text, width) {
    const plain = stripAnsi(text);
    return text + ' '.repeat(Math.max(0, width - plain.length));
}

function boxLine(content, color) {
    const inner = BOX_WIDTH - 2;
    const padded = padRight(content, inner);
    return `${color}\u2503${C.reset} ${padded} ${color}\u2503${C.reset}`;
}

function boxLineCentered(content, color) {
    const inner = BOX_WIDTH - 2;
    const centered = centerText(content, inner);
    return `${color}\u2503${C.reset} ${centered} ${color}\u2503${C.reset}`;
}

function render() {
    loadStats();
    const cols = process.stdout.columns || 80;
    const rows = process.stdout.rows || 24;
    const padX = Math.max(0, Math.floor((cols - BOX_WIDTH - 2) / 2));
    const totalLines = 6 + menu.length + 7;
    const padY = Math.max(1, Math.floor((rows - totalLines) / 2));
    const indent = ' '.repeat(padX);
    const bc = C.blue;
    const inner = BOX_WIDTH - 2;
    const hBar = '\u2501'.repeat(inner + 2);

    const lines = [];

    lines.push('\x1b[H\x1b[J\x1b[?25l');
    lines.push('\n'.repeat(padY));

    // Title
    lines.push(indent + centerText(`${C.bright}${C.cyan}\u25E2\u25E4 FIRSTBRAIN ELITE \u25E2\u25E4${C.reset}`, cols - padX * 2));
    lines.push(indent + centerText(`${C.dim}${C.gray}Neural Knowledge Interface v3.5${C.reset}`, cols - padX * 2));
    lines.push('');

    // Top border
    lines.push(`${indent}${bc}\u250F${hBar}\u2513${C.reset}`);

    // Status bar
    const statParts = [
        `${C.white}${C.bright}${stats.notes}${C.reset}${C.gray} notes`,
        `${C.white}${C.bright}${stats.projects}${C.reset}${C.gray} projects`,
        `${C.gray}sync ${C.white}${stats.lastScan}${C.reset}`
    ];
    const statLine = statParts.join(`${C.blue}  \u2502  ${C.reset}`);
    lines.push(`${indent}${boxLineCentered(statLine, bc)}`);

    // Separator
    lines.push(`${indent}${bc}\u2523${'\u2501'.repeat(inner + 2)}\u252B${C.reset}`);
    lines.push(`${indent}${boxLine('', bc)}`);

    // Menu items
    menu.forEach((item, i) => {
        const isSel = i === selectedIndex;
        const pointer = isSel ? `${C.cyan}\u25B6${C.reset}` : ' ';
        const keyHint = `${C.dim}${C.gray}[${item.key}]${C.reset}`;
        const icon = isSel ? `${C.cyan}${item.icon}${C.reset}` : `${C.gray}${item.icon}${C.reset}`;
        const label = isSel
            ? `${C.bright}${C.white}${item.label}${C.reset}`
            : `${C.white}${item.label}${C.reset}`;
        const desc = `${C.gray}${item.desc}${C.reset}`;

        const content = `  ${pointer} ${icon} ${keyHint} ${label}  ${desc}`;

        if (isSel) {
            const plainLen = stripAnsi(content).length;
            const rowPad = Math.max(0, inner - plainLen);
            const row = `${bc}\u2503${C.reset}${C.bgSelect} ${content}${' '.repeat(rowPad)} ${C.reset}${bc}\u2503${C.reset}`;
            lines.push(`${indent}${row}`);
        } else {
            lines.push(`${indent}${boxLine(content, bc)}`);
        }
    });

    lines.push(`${indent}${boxLine('', bc)}`);

    // Separator
    lines.push(`${indent}${bc}\u2523${'\u2501'.repeat(inner + 2)}\u252B${C.reset}`);

    // Help
    const helpText = `${C.dim}${C.gray}\u2191\u2193 Navigate    Enter Confirm    q Exit${C.reset}`;
    lines.push(`${indent}${boxLineCentered(helpText, bc)}`);

    // Bottom border
    lines.push(`${indent}${bc}\u2517${hBar}\u251B${C.reset}`);

    // Status message from previous action (passed via argv)
    if (statusMessage) {
        lines.push('');
        lines.push(indent + centerText(`${statusColor}${statusMessage}${C.reset}`, cols - padX * 2));
    }

    process.stdout.write(lines.join('\n') + '\n');
}

// --- Actions ---

function showCursor() {
    process.stdout.write('\x1b[?25h');
}

function selectAndExit() {
    const item = menu[selectedIndex];
    showCursor();
    process.exit(item.exitCode);
}

// --- Input ---

readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) process.stdin.setRawMode(true);

process.stdin.on('keypress', (str, key) => {
    if (!key) return;

    if (key.ctrl && key.name === 'c') {
        showCursor();
        process.exit(0);
    }

    if (key.name === 'up') {
        selectedIndex = (selectedIndex - 1 + menu.length) % menu.length;
        render();
        return;
    }
    if (key.name === 'down') {
        selectedIndex = (selectedIndex + 1) % menu.length;
        render();
        return;
    }

    if (key.name === 'return') {
        selectAndExit();
        return;
    }

    const shortcut = menu.findIndex(m => m.key === str);
    if (shortcut !== -1) {
        selectedIndex = shortcut;
        selectAndExit();
        return;
    }
});

process.stdout.on('resize', () => render());
process.on('exit', () => showCursor());
process.on('SIGINT', () => { showCursor(); process.exit(0); });

render();
