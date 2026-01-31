# Query Memory & Task Tracking

This file maintains query history and tracks ongoing work across AI agent sessions.

---

## Query History

### [2026-01-31 00:00 UTC] - Query: Initialize project scaffolding

**Query**: Create project scaffolding from synthetic-usage-tracker, stripping project-specific content

**Context**: User wants to extract and recreate the scaffolding from another project to use as a template for new projects. Keep environment-specific stuff (test API keys) but remove project-specific references.

**Outcome**: Completed
- Initialized git repository
- Created .gitignore with standard exclusions
- Set up package.json with TypeScript dependencies
- Configured ESLint and commitlint
- Created TypeScript configuration
- Set up .env.example for environment variables
- Created memory system documentation (shared-memory.md, tool-registry.md, git_commit_format.md, README.md)
- Created AGENTS.md and agents.min.md with development guidelines
- All files committed using enhanced conventional commit format

---

## Current Focus

### Last Query

**Query**: Initialize project scaffolding
**Time**: 2026-01-31 00:00 UTC
**Summary**: Created project scaffolding template with AI agent memory system and development tooling

### Context

Project scaffolding is complete and ready for use as a template for new projects. All essential files are in place:

- Git repository initialized
- TypeScript, ESLint, commitlint configured
- Memory system documented
- Development guidelines written
- Environment variables template provided

### Planning

Project is now ready for:
1. Adding new project-specific code in `src/` directory
2. Creating project-specific configuration
3. Starting development work

### Remaining Items

- [ ] None - scaffolding is complete

---

## Sub-tasks Tracking

No sub-tasks pending.

---

## Quick Reference

### Critical Files

| File | Purpose |
|------|---------|
| [`agents.min.md`](agents.min.md) | Optimized quick-start guide (read first) |
| [`AGENTS.md`](AGENTS.md) | Full development guide |
| [`docs/memory/shared-memory.md`](docs/memory/shared-memory.md) | Cross-tool context and tasks |
| [`docs/memory/tool-registry.md`](docs/memory/tool-registry.md) | AI tool registry |
| [`docs/MEMORY.md`](docs/MEMORY.md) | This file - query history |
| [`docs/memory/git_commit_format.md`](docs/memory/git_commit_format.md) | Commit message format |
| [`package.json`](package.json) | NPM scripts and dependencies |
| [`tsconfig.json`](tsconfig.json) | TypeScript configuration |

### Common Commands

```bash
npm run compile    # Compile TypeScript
npm run lint       # Run linter
npm run lint:fix   # Fix linting issues
npm run test       # Run tests
npm run pretest    # Compile + lint + test
npm run watch      # Watch mode
npm run buildrelease  # Build release
```

### Configuration Storage

**Environment variables**: `.env` file (git-ignored)
- Copy from `.env.example` to `.env`
- Add test API keys and other environment variables
- Never commit `.env` file

### Memory System Usage

**Read order** (for new agents):
1. `agents.min.md` - Quick start
2. `docs/memory/shared-memory.md` - Cross-tool context
3. `docs/MEMORY.md` - Query history
4. `docs/memory/tool-registry.md` - Tool info

**Update when**:
- Starting new query session
- Completing work or making progress
- Learning new information
- Making architectural decisions

---

## Status Updates

### Project Status

- **Phase**: Scaffolding Complete
- **Last Updated**: 2026-01-31
- **Ready for**: New project development

### Tools

All AI tools (Kilocode, Roocode, Opencode, Amp, Gemini, Claude, Antigravity) can use this project with shared memory system for cross-tool continuity.
