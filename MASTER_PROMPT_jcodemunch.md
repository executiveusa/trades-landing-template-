# 🚀 MASTER PROMPT: jCodemunch Global Setup (One-Shot)

**Save this prompt. Use it whenever you need to set up jcodemunch globally + workspace-scoped for optimal agent performance.**

---

## SETUP COMMAND (Copy-Paste Into Terminal)

```powershell
# STEP 1: Install globally
pip install --upgrade jcodemunch-mcp

# STEP 2: Verify installation
jcodemunch-mcp --help

# STEP 3: Configure Claude Desktop (Global)
@"
{
  "mcpServers": {
    "jcodemunch": {
      "command": "jcodemunch-mcp",
      "env": {
        "JCODEMUNCH_SHARE_SAVINGS": "1"
      }
    }
  }
}
"@ | Out-File -FilePath "$env:APPDATA\Claude\claude_desktop_config.json" -Encoding utf8

# STEP 4: Verify config created
Get-Content "$env:APPDATA\Claude\claude_desktop_config.json"

echo "✓ Global setup complete. Claude Desktop MCP enabled."
```

---

## WORKSPACE SETUP (In Your Project Root)

```powershell
# Create .vscode folder and config
mkdir -p .vscode

# Create VS Code workspace config
@"
{
  "claude.mcpServers": {
    "jcodemunch": {
      "command": "jcodemunch-mcp",
      "env": {
        "JCODEMUNCH_SHARE_SAVINGS": "1"
      }
    }
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  }
}
"@ | Out-File -FilePath ".vscode/settings.json" -Encoding utf8

# Create workspace agent instructions
@"
# jCodeMunch Best Practices

**GOLDEN RULE:** Use jcodemunch for ALL code exploration. Never read entire files to find one function.

## Quick Reference
- \`search_symbols(query='name')\` — Find by name (200 tokens)
- \`get_symbol(symbol_id='...')\` — Get source exactly (150-300 tokens)
- \`get_file_outline(file_path='...')\` — Structure without loading (100-200 tokens)
- \`get_repo_outline()\` — Architecture (1-2k tokens)

## Token Savings
| Task | jCodeMunch | Traditional | Savings |
|------|-----------|------------|---------|
| Find function | 200 | 40,000 | 99% |
| Understand API | 800 | 15,000 | 95% |
| Repo overview | 2,500 | 200,000 | 99% |

## Never Do This
❌ "Read components/Contact.tsx"
✅ "search_symbols(query='Contact')"

❌ "Open lib/tenant.ts"
✅ "get_file_outline(file_path='lib/tenant.ts')"
"@ | Out-File -FilePath ".vscode/agent-instructions.md" -Encoding utf8

echo "✓ Workspace setup complete."
```

---

## CLAUDE CODE PROMPT (Copy Into VS Code Chat)

```
Start here for this project:

1. index_folder(path=".") — Index once
2. search_symbols(query="component-name") — Find by name
3. get_symbol(symbol_id="...") — Get exact source
4. Never open entire files. Always jcodemunch first.

Token savings: 90-99% on every search. Show me the _meta response.
```

---

## CLAUDE DESKTOP PROMPT (Copy Into Claude)

```
Analyze this project with jcodemunch:

Project: [paste your project path]

1. Index the project
2. Show repo_outline()
3. search_symbols() for key components
4. Show token savings from _meta

Use jcodemunch for EVERYTHING. Never read raw files.
```

---

## WHAT YOU GET

✅ **Global:** jcodemunch available everywhere (Claude Desktop, Claude Code, other IDEs)  
✅ **Workspace:** Each project auto-loads jcodemunch config  
✅ **Agent Instructions:** Every Claude agent knows the rules  
✅ **Token Savings:** 90-99% reduction on code exploration  

---

## VERIFICATION

```powershell
# Verify global install
jcodemunch-mcp --help

# Verify Claude Desktop config
Get-Content "$env:APPDATA\Claude\claude_desktop_config.json" | ConvertFrom-Json

# Verify workspace config
Get-Content ".vscode/settings.json" | ConvertFrom-Json
```

All three show jcodemunch? **You're set. Restart Claude Desktop + VS Code.**

---

## NEXT TIME YOU SET UP A NEW PROJECT

Just run the "WORKSPACE SETUP" section above. Global is done forever.

---

**Master Prompt Last Updated:** March 4, 2026  
**Status:** Production Ready
