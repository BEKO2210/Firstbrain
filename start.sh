#!/usr/bin/env bash
# ────────────────────────────────────────────────────────
#  Firstbrain Launcher
#  Starts Claude Code with full vault context
# ────────────────────────────────────────────────────────

set -euo pipefail

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color
BOLD='\033[1m'

# Navigate to vault root (where this script lives)
cd "$(dirname "$0")"
VAULT_DIR="$(pwd)"

echo ""
echo -e "${PURPLE}${BOLD}  ┌─────────────────────────────────────┐${NC}"
echo -e "${PURPLE}${BOLD}  │         Firstbrain v3.0              │${NC}"
echo -e "${PURPLE}${BOLD}  │    AI-Native Second Brain            │${NC}"
echo -e "${PURPLE}${BOLD}  └─────────────────────────────────────┘${NC}"
echo ""

# ── Step 1: Check Node.js ──────────────────────────────
if ! command -v node &> /dev/null; then
    echo -e "${RED}${BOLD}  Node.js is not installed.${NC}"
    echo -e "  Install it from: ${CYAN}https://nodejs.org${NC} (>= v22)"
    echo ""
    exit 1
fi

NODE_VERSION=$(node -v | sed 's/v//' | cut -d. -f1)
if [ "$NODE_VERSION" -lt 22 ]; then
    echo -e "${YELLOW}  Node.js v$(node -v) detected -- v22+ recommended.${NC}"
else
    echo -e "${GREEN}  ✓ Node.js $(node -v)${NC}"
fi

# ── Step 2: Check Claude Code CLI ──────────────────────
if ! command -v claude &> /dev/null; then
    echo -e "${RED}${BOLD}  Claude Code CLI is not installed.${NC}"
    echo ""
    echo -e "  Install it with:"
    echo -e "  ${CYAN}npm install -g @anthropic-ai/claude-code${NC}"
    echo ""
    echo -e "  More info: ${CYAN}https://docs.anthropic.com/en/docs/claude-code${NC}"
    echo ""
    read -p "  Install now? (y/N) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo -e "  ${BLUE}Installing Claude Code...${NC}"
        npm install -g @anthropic-ai/claude-code
        echo ""
        if ! command -v claude &> /dev/null; then
            echo -e "${RED}  Installation failed. Please install manually.${NC}"
            exit 1
        fi
        echo -e "${GREEN}  ✓ Claude Code installed${NC}"
    else
        exit 1
    fi
else
    CLAUDE_VERSION=$(claude --version 2>/dev/null || echo "unknown")
    echo -e "${GREEN}  ✓ Claude Code CLI ($CLAUDE_VERSION)${NC}"
fi

# ── Step 3: Check Obsidian vault structure ─────────────
MISSING=0
for dir in "00 - Inbox" "01 - Projects" "02 - Areas" "03 - Resources" "05 - Templates" "06 - Atlas/MOCs"; do
    if [ ! -d "$dir" ]; then
        echo -e "${RED}  ✗ Missing folder: $dir${NC}"
        MISSING=1
    fi
done

if [ ! -f "CLAUDE.md" ]; then
    echo -e "${RED}  ✗ Missing CLAUDE.md${NC}"
    MISSING=1
fi

if [ "$MISSING" -eq 0 ]; then
    echo -e "${GREEN}  ✓ Vault structure intact${NC}"
else
    echo -e "${RED}  Vault structure incomplete. Please re-clone the repository.${NC}"
    exit 1
fi

# ── Step 4: Check optional semantic search ─────────────
if [ -d "node_modules/@huggingface" ]; then
    echo -e "${GREEN}  ✓ Semantic search (Transformers.js)${NC}"
else
    echo -e "${YELLOW}  ○ Semantic search not installed (optional)${NC}"
    echo -e "    Run ${CYAN}npm install${NC} to enable local embeddings"
fi

# ── Step 5: Launch ─────────────────────────────────────
echo ""
echo -e "${PURPLE}${BOLD}  Starting Claude Code...${NC}"
echo -e "  Vault: ${CYAN}$VAULT_DIR${NC}"
echo ""
echo -e "  ${BOLD}Quick commands:${NC}"
echo -e "    ${BLUE}/scan${NC}       Build vault indexes"
echo -e "    ${BLUE}/briefing${NC}   Daily summary"
echo -e "    ${BLUE}/create${NC}     Create a note"
echo -e "    ${BLUE}/daily${NC}      Today's daily note"
echo -e "    ${BLUE}/process${NC}    Execute inbox prompts"
echo ""
echo -e "  ${PURPLE}─────────────────────────────────────${NC}"
echo ""

# Start Claude Code with initial system prompt
exec claude --verbose
