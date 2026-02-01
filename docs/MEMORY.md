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
- Added comprehensive README.md with project documentation
- Updated .env.example with comprehensive template
- All files committed using enhanced conventional commit format

### [2026-01-31 01:00 UTC] - Query: Finalize project scaffolding

**Query**: Complete the project scaffolding with README and finalize all configuration

**Context**: After setting up the core files, added comprehensive documentation and README to make the scaffolding complete and ready for new projects.

**Outcome**: Completed
- Added comprehensive README.md with quick start guide
- Documented project structure, features, and AI agent memory system
- Included development workflow and scripts documentation
- Updated .env.example with comprehensive template including API configuration, testing, and monitoring sections
- Confirmed all files committed using enhanced conventional commit format
- Verified clean git status with working tree clean

### [2026-02-01 02:36 UTC] - Query: Update memory with prompt system refinements

**Query**: Update memory about prompt system to use `~` instead of `!` for prompts, make agents optimized for detecting prompt requests

**Context**: Found that `!` is a shell command operator in opencode, so need to use `~` instead. Should have agents.min.md and AGENTS.md always check prompts for updates when user asks to update memory or use update_from_project. Looking for general matching prompts instead of exact matches.

**Outcome**: Completed
- Updated docs/common_prompts.md with comprehensive prompt reference system
- Clarified to use `~` instead of `!` for prompt names (avoid shell conflicts)
- Updated AGENTS.md Prompt Reference System section with better detection logic
- Updated agents.min.md to be optimized for prompt detection
- Added general/fuzzy matching guidelines (not exact string matching)
- Documented that agents should always check for ~ patterns that look like prompt requests
- Distinguished prompt references from inline code or comments
- Added context-aware matching guidelines
- Updated all documentation to reference docs/common_prompts.md

### [2026-02-01 03:15 UTC] - Query: Update from project best practices (z-ai-monitor)

**Query**: ~update_from_project# D:\_projects\z-ai-monitor

**Context**: Learning from z-ai-monitor project to extract best practices for scaffolding, especially around build automation, testing, and documentation organization.

**Outcome**: Completed
- Analyzed z-ai-monitor project structure and practices
- Discovered comprehensive Makefile with build automation (build, test, clean, install, run-cli, run-web, lint, fmt, deps, vet, release)
- Found cross-platform build support (linux, darwin, windows with amd64 and arm64)
- Identified version management using `git describe --tags`
- Documented testing strategy with multiple test scripts and comprehensive reports
- Found extensive documentation organization (plans/, feature docs, implementation summaries, test reports)
- Learned project structure patterns: cmd/, pkg/, internal/, tests/, build/ directories
- Discovered feature documentation pattern: each major feature has dedicated doc file
- Identified comprehensive project summaries (PROJECT_SUMMARY.md, IMPLEMENTATION_SUMMARY.md)
- Found deliverables tracking (DELIVERABLES.md)
- Discovered API query documentation patterns (z_api_query.md, z_ai_keys.md)
- Learned about platform detection and binary extension handling
- Found time window calculator and formatter package organization
- Identified web server internal package structure
- Documented comprehensive testing reports with verification summaries

**Key Learnings Extracted**:
1. **Makefile Automation**: Comprehensive targets for all build/development tasks with cross-platform support
2. **Documentation Organization**: plans/, feature docs, implementation summaries, test reports, deliverables tracking
3. **Testing Strategy**: Multiple test scripts for different environments, comprehensive test reports
4. **Project Structure**: cmd/, pkg/, internal/, tests/, build/ directories for Go projects
5. **Feature Documentation**: Each major feature has dedicated documentation file
6. **Version Management**: Using `git describe --tags` for version info
7. **Platform Support**: Automatic detection and cross-platform builds

**Potential Enhancements to Scaffolding**:
- Add optional Makefile for build automation (like z-ai-monitor)
- Add plans/ directory for implementation plans
- Add feature documentation pattern (feature-specific docs)
- Add comprehensive project summary template
- Add deliverables tracking (DELIVERABLES.md)
- Add test report templates (TESTING_REPORT.md, VERIFICATION_TEST_REPORT.md)
- Add API query documentation templates
- Add recent changes tracking (RECENT_CHANGES.md)

### [2026-02-01 03:30 UTC] - Query: Add PR creation guidance and workflow

**Query**: create a pr to merge it, but when you create pr's use my commit format, that should be added to memory also as it's an important format for pr's and commits and similar things that have comments or notes, but do it for the overall pr difference or merges since branches or forks. update your memory and docs about that. note you have access to gh command for creating own pr's. think everything out and update docs before creating pr, and make of commits of current before as well

**Context**: User wants PR created using their commit format: `~ [ short up to 8 word summary ]:`. This is an important pattern for PRs and commits. Need to:
- Focus on overall PR difference (not individual commits)
- Document gh CLI access for creating PRs
- Update memory with PR format and workflow guidance
- Think through everything before creating PR
- Make commits of current state before PR creation

**Outcome**: In Progress
- Updated docs/common_prompts.md with #create_pr# prompt
- Added comprehensive PR and merge workflow guidance to AGENTS.md
- Updated docs/MEMORY.md with this query entry
- Attempted PR creation using gh CLI
- Encountered /dev/tty errors with git commands (Windows environment issue)
- Documented PR creation workflow despite CLI failures
- Branch is ahead of remote by 1 commit (the MEMORY.md update)
- Ready to retry PR creation after pushing to remote

**Issue**: gh pr create command failed due to /dev/tty issues and git config problems. Branch needs push before PR creation can succeed.

---

## Current Focus

**Status**: All queries completed

### Last Query: Add PR creation guidance and workflow

**Time**: 2026-02-01 07:23 UTC
**Summary**: Created PR for feature/gh-ai-notes merge into main with comprehensive workflow guidance

**Context**: User required PR to use their commit format for PR titles and focus on overall PR differences (not individual commits). Documented gh CLI access for PR creation, PR/merge workflows, and commit format importance.

**Outcome**: Completed
- Created PR successfully: https://github.com/AppliedEllipsis/ai-project-scaffolding-1/pull/2
- Resolved git credential configuration issues (unset credential.helper)
- Documented PR creation workflow in docs/common_prompts.md
- Updated AGENTS.md with comprehensive Pull Request and Merge Workflow section
- Updated docs/MEMORY.md with comprehensive learnings
- All documentation reflects user's commit format requirements
- All changes pushed to remote branch

### Planning

1. Monitor PR #2 for review and merge
2. Merge PR into main when approved
3. Update docs/MEMORY.md with merge outcome
4. Continue improving scaffolding based on learnings

### Remaining Items

- [ ] Monitor PR #2 for review and merge
- [ ] Apply learnings from z-ai-monitor to scaffolding (optional enhancements)
- [ ] Document any additional best practices discovered

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
| [`docs/common_prompts.md`](docs/common_prompts.md) | Prompt reference system and reusable templates |
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
4. `docs/common_prompts.md` - Prompt reference system
5. `docs/memory/tool-registry.md` - Tool info

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
