# AI Agent Development Guide

This guide provides comprehensive instructions for AI agents working on projects with this scaffolding. It covers memory systems, development practices, documentation standards, and coding conventions.

## Table of Contents

- [Memory System Workflow](#memory-system-workflow)
  - [Overview](#overview)
  - [When to Update MEMORY.md](#when-to-update-memorymd)
  - [Query Documentation Guidelines](#query-documentation-guidelines)
  - [Release and Changelog Workflow](#release-and-changelog-workflow)
- [Incremental Development Approach](#incremental-development-approach)
- [Documentation Practices](#documentation-practices)
- [Coding Practices](#coding-practices)
- [Memory and Decision Logic](#memory-and-decision-logic)
- [Project-Specific Guidelines](#project-specific-guidelines)

---

## Memory System Workflow

### Overview

The project includes a **Query Memory & Task Tracking** system to maintain context across AI agent sessions. This system helps track work progress, remember important decisions, and provide continuity between different AI tools.

**Key File**: [`docs/MEMORY.md`](docs/MEMORY.md) - Query history and task tracking

**Purpose**:
- Maintain context across multiple AI agent sessions
- Track progress on ongoing tasks and sub-tasks
- Document query history (sanitized of sensitive information)
- Provide quick reference for commonly used information
- Enable smooth handoffs between different AI sessions

### MEMORY.md Structure

The [`docs/MEMORY.md`](docs/MEMORY.md) file is organized into four main sections:

#### 1. Query History
Chronological list of all queries made to the agent, with:
- Timestamp in ISO 8601 UTC format
- Short descriptive title for each query
- Full query text (sanitized - no sensitive info)
- Context at the time of the query
- Outcome or status

**Important**: Always sanitize sensitive information before documenting:
- API keys → `[API_KEY]`
- Personal emails → `[USER_EMAIL]`
- Credentials → `[CREDENTIAL]`
- URLs with sensitive data → `[SENSITIVE_URL]`
- File paths with personal info → `[PERSONAL_PATH]`

#### 2. Current Focus
Details about the most recent or ongoing work:
- Last query title and timestamp
- Summary of what was being worked on
- Context needed to continue
- Planning or considerations
- Remaining items as a checklist

#### 3. Sub-tasks Tracking
Table format tracking active sub-tasks:
| # | Sub-task | Status | Notes |
|---|----------|--------|-------|
| 1 | Description | [Pending/In Progress/Complete] | Additional info |

#### 4. Quick Reference
Commonly referenced information:
- **Critical Files**: Key files with their purposes
- **Common Commands**: Frequently used commands
- **Configuration Storage**: Where sensitive data is stored
- **Memory System Usage**: Guidelines for using the memory system

### When to Update MEMORY.md

Update [`docs/MEMORY.md`](docs/MEMORY.md) in the following scenarios:

1. **Beginning a New Query Session**
   - Read the Current Focus section to understand what was previously being worked on
   - Review Sub-tasks Tracking to see if any tasks are in progress
   - Check if the new query relates to previous work

2. **During Query Processing**
   - Add the new query to Query History (sanitized)
   - Update Current Focus with the current work summary
   - Add sub-tasks to Sub-tasks Tracking as they are identified

3. **Completing Sub-tasks**
   - Update status in Sub-tasks Tracking table
   - Add relevant notes about the completion
   - Update Current Focus if the context has changed

4. **Finishing a Query**
   - Update Outcome in Query History
   - Clear or update Current Focus section
   - Mark completed sub-tasks as "Complete"
   - Update Quick Reference if new information was learned

5. **Learning New Information**
   - Add to Quick Reference section if it's commonly referenced
   - Update relevant sections with new insights

### Query Documentation Guidelines

When documenting queries in [`docs/MEMORY.md`](docs/MEMORY.md):

#### Sanitization Rules
**ALWAYS** replace sensitive information with placeholders:
```markdown
# Bad - Contains actual sensitive data
**Query**: "My API key is syn_abc123xyz789 and I'm having trouble"

# Good - Sanitized
**Query**: "My API key is [API_KEY] and I'm having trouble"
```

#### Query Entry Format
```markdown
### [YYYY-MM-DD HH:MM UTC] - Query: Short descriptive title
**Query**: Sanitized query text
**Context**: Any relevant context at the time (environment, previous state, etc.)
**Outcome**: Result or status (e.g., "Completed", "In Progress", "Blocked")
```

#### Current Focus Format
```markdown
### Last Query: [Same title as above]
**Time**: [timestamp]
**Summary**: Brief but detailed summary of what was being worked on
**Context**: What was needed to continue (files to read, commands to run, etc.)
**Planning**: What was planned or being considered (implementation approach, alternatives)
**Remaining Items**: Checklist of incomplete items or next steps
- [ ] Item 1
- [ ] Item 2
```

#### Sub-task Status Values
Use one of these status values:
- **Pending**: Not started yet
- **In Progress**: Currently being worked on
- **Complete**: Finished successfully
- **Blocked**: Waiting on something (e.g., user input, external dependency)

#### Quick Reference Guidelines
Add items to Quick Reference when:
- You find yourself looking up the same information repeatedly
- New files are created that are frequently referenced
- New commands are used often
- Configuration or architecture patterns emerge

### Release and Changelog Workflow

The project uses an automated release workflow with Keep a Changelog format and semantic versioning.

**Key Files**:
- [`CHANGELOG.md`](CHANGELOG.md) - Released changes and version history
- [`scripts/update-changelog-for-release.js`](scripts/update-changelog-for-release.js) - Automated changelog updater
- [`scripts/update-memory-for-release.js`](scripts/update-memory-for-release.js) - Automated memory updater
- [`scripts/move-to-releases.js`](scripts/move-to-releases.js) - Package mover to releases directory

**Release Workflow** (10-step automated process):

1. **Update CHANGELOG**: Moves "Unreleased" section to version header with today's date
2. **Commit CHANGELOG**: Creates a git commit for the CHANGELOG update
3. **Update memory**: Runs memory update script to document the release
4. **Commit memory**: Creates a git commit for the memory update
5. **Bump version**: Runs `npm version patch` to increment the patch version
6. **Create git tag**: Tags the version commit with the version number
7. **Push to remote**: Pushes commits and tags to the remote repository
8. **Compile TypeScript**: Builds the project
9. **Package extension**: Creates the package tarball
10. **Move to releases**: Moves the package to the releases/ directory

**Running the Release Workflow**:

```bash
npm run buildrelease
```

**Pre-Release Requirements**:

Before running the release workflow:

1. **Update CHANGELOG.md**: Add all changes to the "Unreleased" section with proper categorization (Added, Changed, Fixed, Removed, Documentation)
   - Use "Nothing yet" placeholder if there are no changes
2. **Ensure working tree is clean**: All changes should be committed or stashed
3. **Verify tests pass**: `npm run test`
4. **Verify compilation**: `npm run compile`
5. **Verify linting**: `npm run lint`
6. **Update user-facing documentation**: Update README.md if user-facing changes were made

**CHANGELOG Structure**:

Follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) format:

- **Unreleased**: Upcoming changes (use "Nothing yet" placeholder)
- **[Version] - YYYY-MM-DD**: Released version with date
  - **Added**: New features
  - **Changed**: Changes in existing functionality
  - **Deprecated**: Soon-to-be removed features
  - **Removed**: Removed features
  - **Fixed**: Bug fixes
  - **Security**: Security updates
  - **Documentation**: Documentation changes

**Version Numbering**:

Uses standard SemVer (X.Y.Z) format for compatibility with package registries.

**Automatic Change Categorization**:

The memory update script automatically categorizes changes:
- Source files (src/*)
- Documentation files (docs/*, README.md, CHANGELOG.md)
- Test files (test/*)
- Configuration files (package.json, .vscodeignore)
- Script files (scripts/*)

This generates factual change notes like:
- "2 source files modified, 1 doc file updated, 1 test file modified"

**Releases Directory**:

The releases/ directory contains versioned artifacts:
- Package tarballs (.tgz files)
- Change notes (.tgz.md files)
- Organized by version number for easy access

**Change Notes Documentation**:

The memory update script analyzes:
- Git commits since last release
- Changed files categorized by type
- Commit counts and file counts
- File types modified

This provides factual documentation of what changed in each release.

---

## Quick Reference

### Release and Changelog

**Key Files**:
- [`CHANGELOG.md`](CHANGELOG.md) - Released changes and version history
- [`scripts/update-changelog-for-release.js`](scripts/update-changelog-for-release.js) - Automated changelog updater
- [`scripts/update-memory-for-release.js`](scripts/update-memory-for-release.js) - Automated memory updater

**Release Workflow**:
```bash
npm run buildrelease  # 10-step automated release process
```

**Pre-release checklist**:
1. Update CHANGELOG.md "Unreleased" section
2. Ensure working tree clean
3. Run `npm run test` → `npm run compile` → `npm run lint`
4. Update README.md if needed
5. Run `npm run buildrelease`

**CHANGELOG sections**:
- **Added** - New features
- **Changed** - Changes in existing functionality
- **Fixed** - Bug fixes
- **Removed** - Removed features
- **Deprecated** - Soon-to-be removed features
- **Security** - Security updates
- **Documentation** - Documentation changes

**Releases directory**:
- Contains versioned artifacts (.tgz files)
- Created automatically by buildrelease workflow
- Organized by version number

### Development Commands

```bash
npm run compile     # Compile TypeScript
npm run watch       # Watch mode for development
npm run lint        # Run linter
npm run lint:fix    # Fix linting issues
npm run test        # Run tests
npm run pretest     # Compile + lint + test
npm run buildrelease # Full release workflow
```

### Memory System

**Read order**:
1. `agents.min.md` - Quick start guide
2. `docs/memory/shared-memory.md` - Cross-tool context
3. `docs/MEMORY.md` - Query history
4. `docs/memory/tool-registry.md` - Tool info

**Update when**:
- Starting new query session
- Completing work
- Learning new information
- Making architectural decisions

### Common Workflow

**Before starting any task**:
1. Read AGENTS.md sections relevant to work
2. Read docs/MEMORY.md for current focus
3. Read docs/memory/shared-memory.md for context
4. Identify task type (narrative vs assigned)
5. Report context to user

**During task execution**:
1. Read files in chunks (max 500 lines)
2. Document decisions in code comments
3. Update docs/memory/shared-memory.md with context
4. Consider impact on future tasks

**After completing task**:
1. Update docs/memory/shared-memory.md
2. Update docs/MEMORY.md Query History
3. Mark completed sub-tasks
4. Document new patterns
5. Report completion

---

## Incremental Development Approach

### Making Incremental Changes

When working on this project, follow this incremental development workflow:

#### Step 1: Understand the Current State

Before making changes:

1. **Read relevant files**: Understand the existing implementation
2. **Review documentation**: Check [`docs/`](docs/) for architecture and design decisions
3. **Identify impact**: Determine which components will be affected

#### Step 2: Make Small, Focused Changes

Follow these principles:

- **One change at a time**: Make the smallest possible change that achieves your goal
- **Atomic commits**: Each change should be independently testable and reviewable
- **Clear scope**: Focus on a single feature, bug fix, or improvement

#### Step 3: Verify Compilation

After each change:

```bash
npm run compile
```

Ensure TypeScript compilation succeeds without errors. This catches:
- Type errors
- Import issues
- Syntax errors
- Missing dependencies

#### Step 4: Run Linter

Check code quality:

```bash
npm run lint
```

Fix any linting issues before proceeding. This ensures:
- Consistent code style
- Adherence to best practices
- No obvious bugs or anti-patterns

#### Step 5: Test Your Changes

Run the test suite:

```bash
npm run test
```

If tests fail:
1. Identify the failing test
2. Understand why it failed
3. Fix the issue or update the test if the behavior change is intentional

---

## Documentation Practices

### When to Update Documentation

Update documentation **every time** you make changes that affect:

- User-facing features
- API interfaces
- Configuration options
- Architecture or design decisions
- Installation or setup procedures
- Troubleshooting information

### Documentation Standards

#### Clear and Professional

- **Use active voice**: "Click the button" not "The button should be clicked"
- **Be concise**: Get to the point without unnecessary fluff
- **Use examples**: Show, don't just tell
- **Be consistent**: Use the same terminology throughout

#### Relevant and Up-to-Date

- **Remove outdated information**: Delete old procedures that no longer apply
- **Update examples**: Ensure code examples work with current version
- **Cross-reference**: Link to related documentation
- **Version-specific**: Note when features require specific versions

#### Structure and Formatting

- **Use headers**: Organize with `##` and `###` headers
- **Use code blocks**: Format code with backticks
- **Use lists**: Use bullet points for multiple items
- **Use tables**: For configuration options or parameters

---

## Coding Practices

### TypeScript Best Practices

This project follows strict TypeScript configuration. Key practices:

#### Type Safety

**Always use explicit types**:
```typescript
// Good
const interval: number = config.refreshInterval;

// Bad - relies on inference
const interval = config.refreshInterval;
```

**Use interfaces for data structures**:
```typescript
interface UserInfo {
  id: string;
  name: string;
  email: string;
}
```

**Use enums for fixed sets**:
```typescript
enum DisplayState {
  Loading = "loading",
  Idle = "idle",
  Success = "success",
  Error = "error",
}
```

#### Null and Undefined Handling

**Use strict null checks**:
```typescript
// Good - explicit null check
if (this.config !== undefined) {
  // use config
}

// Good - optional chaining
const message = error instanceof Error ? error.message : "Unknown error";

// Bad - loose equality
if (this.config) {
  // might fail for empty string or 0
}
```

#### Error Handling

**Use custom error types**:
```typescript
export class AppError extends Error {
  constructor(
    public type: ErrorType,
    message: string,
    public originalError?: Error,
  ) {
    super(message);
    this.name = "AppError";
  }
}
```

### Comment Standards

This project emphasizes **decision-logic comments** over descriptive comments. The goal is to explain **why** code is written a certain way, not **what** the code does.

#### What to Comment

**DO comment:**

1. **Design decisions and rationale**:
```typescript
/**
 * Design decision: We catch errors at this level to prevent system failures from
 * bubbling up. The system should remain functional even if initial operations fail,
 * allowing users to retry manually.
 */
async initialize(): Promise<void> {
  try {
    await this.setup();
  } catch (error) {
    console.error("Failed to initialize:", error);
    this.handleError(error);
  }
}
```

2. **Non-obvious implementation choices**:
```typescript
// Track initialization state to prevent race conditions during early lifecycle events
private isInitialized: boolean = false;
```

3. **Trade-offs and alternatives considered**:
```typescript
/**
 * Design rationale:
 * - maxRetries: 3 attempts balance reliability with responsiveness
 * - initialDelay: 1000ms gives transient failures time to recover
 * - maxDelay: 10000ms prevents excessively long wait times
 * - backoffFactor: 2 follows standard exponential backoff to reduce load
 */
const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxRetries: 3,
  initialDelay: 1000,
  maxDelay: 10000,
  backoffFactor: 2,
};
```

4. **Cross-file dependencies or contracts**:
```typescript
/**
 * Watch for changes in shared state (for multi-window updates)
 * Uses polling to detect changes from other windows
 */
watchSharedStateChanges(pollInterval: number = 5000): Disposable
```

5. **Performance considerations**:
```typescript
// Cache to prevent unnecessary redraws
// Design rationale: UI updates can cause visual flickering
// if done too frequently. Caching the last rendered values allows us to skip
// redundant updates when data hasn't changed, improving UX and performance.
private lastText: string | null = null;
```

**DON'T comment:**

1. **Obvious code**:
```typescript
// Bad - the code is self-explanatory
const sum = a + b;  // Add a and b together

// Good - no comment needed
const sum = a + b;
```

2. **What the code does (not why)**:
```typescript
// Bad - describes what, not why
if (usage.percentageUsed >= config.threshold) {
  this.displayState = DisplayState.Critical;  // Set display state to critical
}

// Good - explains the design decision
// Critical takes precedence over warning, which takes precedence over success
if (usage.percentageUsed >= config.threshold) {
  this.displayState = DisplayState.Critical;
}
```

#### Comment Format

**Use JSDoc for public APIs**:
```typescript
/**
 * Fetch information from API
 * @returns Information including relevant data
 */
async fetchData(): Promise<Info>
```

**Use inline comments for decision logic**:
```typescript
// Don't retry on authentication errors - they won't succeed
if (lastError instanceof AppError && lastError.type === ErrorType.Authentication) {
  throw lastError;
}
```

**Use block comments for complex rationale**:
```typescript
/**
 * Design decision: Early return when no configuration is present to avoid unnecessary operations.
 * Users expect the system to be silent until configured.
 */
private async initialize(): Promise<void> {
  const hasConfig = await this.configManager.hasConfig();
  if (!hasConfig) {
    this.statusIndicator.setIdle();
    return;
  }
  // ... rest of initialization
}
```

---

## Memory and Decision Logic

### Documenting Architectural Decisions

Architectural decisions should be documented with clear rationale explaining:

1. **The problem being solved**
2. **The chosen solution**
3. **Alternatives considered and rejected**
4. **Trade-offs made**

### What to Comment

**Comment:**

1. **Design decisions and rationale**
2. **Non-obvious implementation choices**
3. **Trade-offs and alternatives considered**
4. **Cross-file dependencies or contracts**
5. **Performance considerations**
6. **Security considerations**
7. **Migration paths or backward compatibility**

**Don't comment:**

1. **Obvious code**
2. **What the code does (not why)**
3. **Redundant type information**
4. **Outdated comments**
5. **Workarounds that should be fixed**

---

## Project-Specific Guidelines

This section should be customized for each project that uses this scaffolding. Add:

- Project-specific architecture decisions
- API endpoints and their usage
- Configuration options and their purposes
- Testing strategies specific to the project
- Deployment considerations
- Any other project-specific guidelines

### Quick Start Workflow

When starting a new session:

1. **Read agents.min.md first** - Optimized quick-start guide
2. **Read docs/memory/shared-memory.md** - Cross-tool context and pending tasks
3. **Read docs/MEMORY.md** - Query history and current focus
4. **Read relevant project documentation** - APIs, architecture, etc.
5. **Report context to user** - Summarize what you know, list pending tasks

### Commit Message Format

Follow the enhanced conventional commit format defined in [`docs/memory/git_commit_format.md`](docs/memory/git_commit_format.md):

```
~ [ short up to 8 word summary ]:

<emoji> <type>(<scope>): <subject>

<body>
```

### Testing

- Run `npm run test` to execute tests
- Run `npm run pretest` to compile and lint before testing
- Test all new features and bug fixes
- Ensure all tests pass before committing

---

## See Also

- [`agents.min.md`](agents.min.md) - Optimized quick-start guide
- [`docs/memory/shared-memory.md`](docs/memory/shared-memory.md) - Main shared memory pool
- [`docs/memory/tool-registry.md`](docs/memory/tool-registry.md) - AI tool registry
- [`docs/memory/git_commit_format.md`](docs/memory/git_commit_format.md) - Git commit message format
- [`docs/memory/README.md`](docs/memory/README.md) - Shared memory system documentation
