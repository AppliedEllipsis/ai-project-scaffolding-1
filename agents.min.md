# AI Agent Quick Start Guide

**Read this first for fast onboarding!**

## 5-Step Onboarding Process

1. **Read [agents.min.md](agents.min.md)** ← You are here (this file)
2. **Read [docs/memory/shared-memory.md](docs/memory/shared-memory.md)** - Cross-tool context and pending tasks
3. **Read [docs/MEMORY.md](docs/MEMORY.md)** - Query history and current focus
4. **Read [docs/common_prompts.md](docs/common_prompts.md)** - Prompt reference system and reusable templates
5. **Identify your tool** in [docs/memory/tool-registry.md](docs/memory/tool-registry.md)
6. **Report to user** with context summary and task queue

---

## Critical Files

| File | Purpose | Priority |
|------|---------|----------|
| [`agents.min.md`](agents.min.md) | This file - quick start guide | 🔴 Start here |
| [`AGENTS.md`](AGENTS.md) | Full development guide (read when needed) | 🟡 Reference |
| [`docs/memory/shared-memory.md`](docs/memory/shared-memory.md) | Cross-tool context & tasks | 🔴 Must read |
| [`docs/memory/tool-registry.md`](docs/memory/tool-registry.md) | AI tool registry | 🔴 Must read |
| [`docs/common_prompts.md`](docs/common_prompts.md) | Prompt reference system | 🔴 Must read |
| [`docs/MEMORY.md`](docs/MEMORY.md) | Query history & current focus | 🟡 Read after |
| [`docs/memory/git_commit_format.md`](docs/memory/git_commit_format.md) | Commit message format | 🟡 Reference |

---

## Quick Commands

```bash
# Compile TypeScript
npm run compile

# Run linter
npm run lint

# Fix linting issues
npm run lint:fix

# Run tests
npm run test

# Run pretest (compile + lint + test)
npm run pretest

# Watch mode for development
npm run watch

# Build release
npm run buildrelease
```

### Release Workflow

**Full release process** (10 automated steps):

```bash
npm run buildrelease
```

**What it does**:
1. Updates CHANGELOG.md (moves "Unreleased" to version header)
2. Commits CHANGELOG
3. Updates docs/MEMORY.md with release summary
4. Commits memory update
5. Bumps version (npm version patch)
6. Creates git tag
7. Pushes commits and tags
8. Compiles TypeScript
9. Creates package tarball
10. Moves package to releases/ directory

**Pre-release checklist**:
1. Update CHANGELOG.md "Unreleased" section with proper categorization
2. Ensure working tree is clean
3. Run `npm run test` → `npm run compile` → `npm run lint`
4. Update README.md if user-facing changes

**See [AGENTS.md → Release and Changelog Workflow](AGENTS.md#release-and-changelog-workflow) for details.

---

## Environment Setup

**Environment variable location**: `.env` file (git-ignored)

**Test API keys**: Copy from `.env.example` and add to your `.env`:

```bash
# Copy the example file
cp .env.example .env

# Edit .env and add your test API keys
TEST_API_KEY=your_test_api_key_here
```

**Important**: `.env` is git-ignored for security. Never commit it.

---

## Navigation Primitives

### Coherence Wormhole (Speed Optimization)

**When to offer**:
- You see clear convergence on a target
- Intermediate steps are obvious/implied
- Destination is stable and well-understood

**Protocol**:
- Ask: "Would you like me to take a coherence wormhole and jump straight there?"
- Only skip if user agrees
- Never skip for verification, auditability, or trust-critical work

**Example**:
```
User: "Continue with task t6 - implement progress bars"

You notice:
- t6 is clearly defined in docs/MEMORY.md
- Implementation pattern is standard
- No dependencies or risks

Offer:
"Would you like me to take a coherence wormhole and jump straight to implementing 
the progress bars feature? The intermediate steps (setup, UI integration, 
tooltip updates) are well-defined."
```

---

### Vector Calibration (Direction Optimization)

**When to offer**:
- Nearby target Y better aligns with intent
- Y is more general/simple/powerful
- Y has better leverage or durability
- High confidence in the redirect

**Protocol**:
- Ask: "Would you like to redirect to Y, briefly compare X vs Y, or stay on X?"
- Only trigger with high confidence
- No second-guessing if user stays on X
- One well-timed course correction option

**Example**:
```
User: "Refactor the API client code"

You notice:
- Current task focuses on refactoring specific API client methods
- There's a broader architectural improvement (Y) that would:
  - Solve the refactoring need
  - Apply to all API-related code
  - Be more maintainable long-term

Offer:
"I notice you're refactoring the API client methods. There's a broader 
architectural improvement (creating a unified API service layer) that would:
  - Solve your refactoring goal
  - Apply consistently to all API interactions
  - Be more maintainable and testable

Would you like to redirect to the unified service layer approach, 
briefly compare the two options, or stay with the current refactoring plan?"
```

---

## Git Commit Format

**Important**: All commits must use this enhanced conventional format:

```
~ [ short up to 8 word summary ]:

<emoji> <type>(<scope>): <subject>

<body>
```

**Types and Emojis**:
- ✨ `feat` - New feature
- 🐛 `fix` - Bug fix
- 📝 `docs` - Documentation
- 🎨 `style` - Code style
- ♻️ `refactor` - Refactoring
- ⚡️ `perf` - Performance
- ✅ `test` - Testing
- 📦 `build` - Build system
- 👷 `ci` - CI/CD
- 🔧 `chore` - Maintenance
- ⏪ `revert` - Revert
- 🌐 `i18n` - Internationalization

**Example**:
```
~ [ implement user authentication feature ]:

✨ feat(auth): add JWT-based authentication

- implement login and registration endpoints
- add token refresh mechanism
- secure endpoints with JWT validation
```

**See [`docs/memory/git_commit_format.md`](docs/memory/git_commit_format.md)** for complete specification.

---

## Current Project State

**Last checked**: [Check docs/memory/shared-memory.md for latest state]

**Current Phase**: [From shared-memory.md Current Focus]

**Pending Tasks**:
[These are listed in docs/memory/shared-memory.md Pending Tasks section]

---

## Documentation Practices

### When to Update

Always update docs when you:
- Add/remove/change features
- Modify APIs
- Change architecture
- Make configuration changes
- Fix bugs affecting documentation
- Learn new patterns

### Where to Update

1. **Shared Memory** ([`docs/memory/shared-memory.md`](docs/memory/shared-memory.md)):
   - Add memory entry for work completed
   - Update current focus
   - Document decisions

2. **Query History** ([`docs/MEMORY.md`](docs/MEMORY.md)):
   - Add query to Query History
   - Update Current Focus
   - Track sub-task progress

3. **Code Comments**:
   - Add decision-logic comments (why, not what)
   - Use JSDoc for public APIs
   - Never comment obvious code

---

## Development Workflow

### Before Making Changes

1. Read relevant files
2. Understand current implementation
3. Identify impact of changes

### Making Changes

1. Make small, focused changes (one thing at a time)
2. Use `edit` for existing files (must read first)
3. Use `write` only for new files

### After Each Change

1. **Compile**: `npm run compile` → verify no errors
2. **Lint**: `npm run lint` → check code quality
3. **Test**: `npm run test` → verify functionality
4. **Commit**: Use enhanced conventional format (see above)

---

## Key Patterns

### Decision-Logic Comments

**DO explain why**:
```typescript
// Don't retry on authentication errors - they won't succeed
if (error.type === ErrorType.Authentication) {
  throw error;
}
```

**DON'T explain what**:
```typescript
// Bad - the code is self-explanatory
const sum = a + b;  // Add a and b together
```

### File Reading Strategy

Read large files in chunks (500 lines max):
```typescript
read(filePath, offset=0, limit=500)   // First 500 lines
read(filePath, offset=500, limit=500)  // Next 500 lines
```

### Security Best Practices

**Always sanitize**:
- API keys → `[API_KEY]`
- Emails → `[USER_EMAIL]`
- Credentials → `[CREDENTIAL]`
- URLs → `[SENSITIVE_URL]`
- Paths → `[PERSONAL_PATH]`

---

## Security Guidelines

1. **Never expose secrets** in documentation or commits
2. **Check .gitignore** before committing sensitive files
3. **Review git diff** for accidentally included credentials
4. **Use environment variables** for all test keys

**Important files to ignore**:
- `.env` - Contains test API keys
- `.mcp/` - MCP configuration with credentials
- `*.key`, `*.pem`, `*.secret` - Certificate/credential files

---

## When to Read Full Documentation

Read [`AGENTS.md`](AGENTS.md) for detailed information about:

- Memory system workflow
- Token budget management
- Cross-tool handoff process
- Code organization principles
- Error handling patterns
- Performance considerations
- Project discovery and learning methods
- Prompt reference system usage

Read [`docs/memory/`](docs/memory/) for:
- Tool registry and capabilities
- Shared memory system architecture
- Integration guidelines
- Prompt reference system patterns

---

## Project Discovery

When working with other projects or learning best practices:

### Reading Other Projects

1. **Initial Scan**:
   - List project directory structure
   - Identify documentation files
   - Find memory systems and agent guides
   - Locate configuration files

2. **Documentation Reading**:
   - Read agent guides first
   - Read memory files
   - Review README.md
   - Check CHANGELOG.md for release practices

3. **Best Practice Extraction**:
   - Identify unique workflows
   - Note tool configurations
   - Document release practices
   - Extract testing strategies

4. **Filtering for Scaffolding**:
   - Remove project-specific details
   - Keep universal best practices
   - Adapt patterns to generic use

### Prompt Reference System

The `docs/common_prompts.md` file provides reusable prompt patterns:

- Consistent prompt usage across sessions
- Quick access to common workflows
- Extensible prompt library (updated manually or by AI)
- Use `{placeholder_name}` for dynamic content
- Add `~name` prefix for named templates (not `!` - it's a shell operator)

**Important**: Always check docs/common_prompts.md when user:
- Asks to "update memory" or "learn from project"
- Uses patterns like "~update_from_project#" or similar
- Requests updates or learning from other projects

**Detection Logic**:
- Look for ~ patterns that look like prompt requests (not inline code or comments)
- Distinguish from user's shell commands (e.g., in opencode)
- General matching based on intent, not exact strings
- "update" + "memory/project" matches #update_from_project#
- Context-aware matching considering user's tool and request

**Example**:
```markdown
#update_from_project#
look into {path provided} for project memory updates...
```

**When to add prompts**:
- Discover a workflow to repeat
- Learn a new pattern from other projects
- Create a reusable template for common tasks
- Always use `~` not `!` for prompt names
- Document matching guidelines (when/how the prompt is detected)

---

## Task Management

### Task References

Use `t{number}` prefix for referencing tasks from docs/MEMORY.md:
```
t1. Implement authentication
t2. Add user profile feature
t3. Fix authorization bug
```

### Status Updates

Mark tasks as you complete them in docs/MEMORY.md:
- **Pending** - Not started
- **In Progress** - Currently working on
- **Complete** - Finished successfully
- **Blocked** - Waiting on something

---

## Quick Reference Checklist

- [ ] Read agents.min.md ← You're here!
- [ ] Read docs/memory/shared-memory.md
- [ ] Read docs/memory/tool-registry.md
- [ ] Read docs/common_prompts.md
- [ ] Check docs/MEMORY.md for pending tasks
- [ ] Understand git commit format
- [ ] Set up .env file with test keys
- [ ] Report context to user

---

## Getting Help

- **Commit format**: See [`docs/memory/git_commit_format.md`](docs/memory/git_commit_format.md)
- **Tool info**: See [`docs/memory/tool-registry.md`](docs/memory/tool-registry.md)
- **Full guide**: See [`AGENTS.md`](AGENTS.md)
- **Shared memory**: See [`docs/memory/shared-memory.md`](docs/memory/shared-memory.md)
- **Prompt reference**: See [`docs/common_prompts.md`](docs/common_prompts.md)

---

**Ready to work!** Context loaded successfully. 🚀
