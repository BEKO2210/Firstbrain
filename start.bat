@echo off
chcp 65001 >nul 2>&1
title Firstbrain - AI-Native Second Brain

:: Navigate to vault root
cd /d "%~dp0"

echo.
echo   +-------------------------------------+
echo   ^|         Firstbrain v3.5              ^|
echo   ^|    AI-Native Second Brain            ^|
echo   +-------------------------------------+
echo.

:: -- Step 1: Check Node.js --------------------------------
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo   [ERROR] Node.js is not installed.
    echo   Install it from: https://nodejs.org ^(^>= v22^)
    echo.
    pause
    exit /b 1
)

for /f "tokens=1,2,3 delims=v." %%a in ('node -v') do (
    set NODE_MAJOR=%%a
    set NODE_MINOR=%%b
    set NODE_PATCH=%%c
)
echo   [OK] Node.js v%NODE_MAJOR%.%NODE_MINOR%.%NODE_PATCH% detected

if %NODE_MAJOR% LSS 22 (
    echo   [ERROR] Node.js version 22 or higher is required.
    pause
    exit /b 1
)

:: -- Step 2: Check Claude Code CLI -------------------------
where claude >nul 2>&1
if %errorlevel% neq 0 (
    echo   [ERROR] Claude Code CLI is not installed.
    echo.
    echo   Install it with:
    echo     npm install -g @anthropic-ai/claude-code
    echo.
    set /p INSTALL="  Install now? (y/N) "
    if /i "%INSTALL%"=="y" (
        echo   Installing Claude Code...
        npm install -g @anthropic-ai/claude-code
        where claude >nul 2>&1
        if %errorlevel% neq 0 (
            echo   [ERROR] Installation failed. Please install manually.
            pause
            exit /b 1
        )
        echo   [OK] Claude Code installed
    ) else (
        pause
        exit /b 1
    )
) else (
    echo   [OK] Claude Code CLI detected
)

:: -- Step 3: Check vault structure -------------------------
set VAULT_OK=1
if not exist "CLAUDE.md" (
    echo   [ERROR] Missing CLAUDE.md
    set VAULT_OK=0
)
if not exist "00 - Inbox" (
    echo   [ERROR] Missing folder: 00 - Inbox
    set VAULT_OK=0
)
if not exist "05 - Templates" (
    echo   [ERROR] Missing folder: 05 - Templates
    set VAULT_OK=0
)

if %VAULT_OK%==1 (
    echo   [OK] Vault structure intact
) else (
    echo   [ERROR] Vault structure incomplete. Please re-clone the repository.
    pause
    exit /b 1
)

:: -- Step 4: Check optional semantic search ----------------
if exist "node_modules\@huggingface" (
    echo   [OK] Semantic search ^(Transformers.js^)
) else (
    echo   [--] Semantic search not installed ^(optional^)
)

:: -- Step 5: Launch Dashboard Loop -------------------------
:: Dashboard returns exit codes: 0=exit, 10=claude, 20=scan, 30=daily, 40=process, 50=briefing
:: start.bat handles the actual launches so stdin works correctly.

set STATUS_MSG=
echo.

:menu_loop
node .agents/dashboard.cjs "%STATUS_MSG%"
set CHOICE=%errorlevel%
set STATUS_MSG=

if %CHOICE%==0 goto :end

if %CHOICE%==10 (
    echo.
    echo   Initializing Neural Stream...
    echo.
    claude
    set STATUS_MSG=Neural Stream session complete
    goto :menu_loop
)

if %CHOICE%==20 (
    echo.
    echo   Synchronizing vault data...
    echo.
    node index.js scan
    if %errorlevel%==0 (
        set STATUS_MSG=Vault synchronized successfully
    ) else (
        set STATUS_MSG=Sync completed with warnings
    )
    goto :menu_loop
)

if %CHOICE%==30 (
    echo.
    echo   Generating daily note...
    echo.
    claude -p "/daily"
    set STATUS_MSG=Daily note created
    goto :menu_loop
)

if %CHOICE%==40 (
    echo.
    echo   Processing inbox...
    echo.
    claude -p "/process"
    set STATUS_MSG=Inbox processed
    goto :menu_loop
)

if %CHOICE%==50 (
    echo.
    echo   Generating briefing...
    echo.
    claude -p "/briefing"
    set STATUS_MSG=Briefing complete
    goto :menu_loop
)

:: Unknown exit code — return to menu
set STATUS_MSG=
goto :menu_loop

:end
echo.
echo   Session terminated. Until next time.
echo.
