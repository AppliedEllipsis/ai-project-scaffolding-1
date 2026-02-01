<script src="status-badge.js"></script>

<style>
.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 18px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
  border-radius: 25px;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.1);
}

.status-badge:hover {
  transform: scale(1.05) translateY(-3px);
  box-shadow: 0 8px 30px rgba(102, 126, 234, 0.6);
  border-color: rgba(255, 255, 255, 0.2);
}

.status-icon {
  font-size: 18px;
  display: inline-block;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.status-text {
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.5px;
  animation: glow 2s ease-in-out infinite alternate;
}

@keyframes glow {
  from { opacity: 0.85; text-shadow: 0 0 5px rgba(255, 255, 255, 0.2); }
  to { opacity: 1; text-shadow: 0 0 15px rgba(255, 255, 255, 0.5); }
}

.status-badge:active {
  transform: scale(0.98);
}

/* Pulse effect to catch attention */
.status-badge::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  border-radius: 25px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  animation: ripple 1.5s ease-out infinite;
}

@keyframes ripple {
  0% { width: 100%; height: 100%; opacity: 1; }
  100% { width: 160%; height: 160%; opacity: 0; }
}

@media (max-width: 768px) {
  .status-badge {
    top: auto;
    bottom: 20px;
    left: 20px;
    right: 20px;
    transform: none;
  }
  
  .status-badge:hover {
    transform: scale(1.02);
  }
}
</style>

<div align="right">
  <a href="#" title="Last updated: 2026-02-01" class="status-badge">
    <span class="status-icon">🔄</span>
    <span class="status-text">Updating...</span>
  </a>
</div>

# Project Scaffolding

A complete scaffolding template for TypeScript projects with AI agent memory system and development tooling.

## Quick Start

### 1. Clone or Copy This Template

Start by copying this entire directory to your new project location.

### 2. Set Up Environment

```bash
# Copy the environment template
cp .env.example .env

# Edit .env and add your test API keys and configuration
# Your favorite editor
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start Development

```bash
# Compile TypeScript
npm run compile

# Run tests
npm run test

# Watch mode for development
npm run watch
```

---

## Project Structure

```
.
├── .env.example          # Environment variables template (git-tracked)
├── .env                  # Your actual environment variables (git-ignored)
├── .gitignore            # Standard git exclusions
├── AGENTS.md             # Full AI agent development guide
├── agents.min.md         # Quick-start guide (read this first!)
├── CHANGELOG.md          # Released changes and version history
├── commitlint.config.mjs # Commit message linting configuration
├── docs/
│   ├── MEMORY.md         # Query history and task tracking
│   ├── common_prompts.md  # Prompt reference system and reusable templates
│   └── memory/
│       ├── README.md                 # Shared memory system documentation
│       ├── git_commit_format.md      # Git commit message format
│       ├── shared-memory.md          # Cross-tool memory pool
│       └── tool-registry.md          # AI tool registry
├── eslint.config.mjs      # ESLint configuration
├── package.json          # NPM scripts and dependencies
├── releases/             # Versioned packages (.tgz files)
├── scripts/              # Automation scripts
├── src/                  # TypeScript source files
│   └── .gitkeep          # Marker file (remove when adding source code)
└── tsconfig.json         # TypeScript configuration
```

---

## Features

### 🤖 AI Agent Memory System

Integrated memory system for cross-tool continuity:

- **Shared Memory Pool**: All AI tools share context and task tracking
- **Tool Registry**: Documents capabilities of different AI agents
- **Query History**: Tracks all interactions and decisions
- **Cross-Tool Handoff**: Seamlessly transition between AI tools

Files:
- [`agents.min.md`](agents.min.md) - Start here for AI agent onboarding
- [`docs/memory/shared-memory.md`](docs/memory/shared-memory.md) - Main memory pool
- [`docs/memory/tool-registry.md`](docs/memory/tool-registry.md) - Tool registry

### 📝 Enhanced Commit Messages

Standardized commit message format with emojis:

```
~ [ short up to 8 word summary ]:

<emoji> <type>(<scope>): <subject>

<body>
```

See [`docs/memory/git_commit_format.md`](docs/memory/git_commit_format.md) for details.

### 🧪 TypeScript + ESLint

- **TypeScript**: Strict type checking with comprehensive configuration
- **ESLint**: Linting with TypeScript support and custom rules
- **Pre-commit**: Automated compilation and linting before tests

### 🔒 Security

- Environment variables stored in `.env` (git-ignored)
- Template file `.env.example` for reference
- Comprehensive `.gitignore` for sensitive files

---

## Development Workflow

### Making Changes

1. **Understand current state**: Read relevant files and documentation
2. **Make small changes**: One focused change at a time
3. **Compile**: `npm run compile`
4. **Lint**: `npm run lint`
5. **Test**: `npm run test`
6. **Commit**: Use the enhanced conventional commit format

### Committing Changes

Follow the commit message format:

```bash
git add .
git commit -m "~ [ add user authentication ]:

✨ feat(auth): implement JWT-based authentication

- add login and registration endpoints
- implement token refresh mechanism
- secure routes with JWT validation"
```

---

## Scripts

| Script | Description |
|--------|-------------|
| `npm run compile` | Compile TypeScript to `out/` directory |
| `npm run watch` | Watch mode for development |
| `npm run lint` | Run ESLint on TypeScript files |
| `npm run lint:fix` | Auto-fix ESLint issues |
| `npm run test` | Run test suite |
| `npm run pretest` | Compile + lint + test (pre-commit) |
| `npm run buildrelease` | Full release workflow (10-step) |
| `npm run update-changelog` | Automated CHANGELOG update |
| `npm run update-memory` | Automated memory update for release |
| `npm run package` | Create package tarball |
| `npm run move-to-releases` | Move package to releases/ directory |

### Release Workflow

Automated release process with Keep a Changelog format:

```bash
npm run buildrelease
```

**10-step automated process**:
1. Update CHANGELOG.md (moves "Unreleased" to version header)
2. Commit CHANGELOG
3. Update docs/MEMORY.md with release summary
4. Commit memory update
5. Bump version (npm version patch)
6. Create git tag
7. Push commits and tags
8. Compile TypeScript
9. Create package tarball
10. Move package to releases/ directory

**Pre-release checklist**:
1. Update CHANGELOG.md "Unreleased" section with proper categorization
2. Ensure working tree is clean
3. Run `npm run test` → `npm run compile` → `npm run lint`
4. Update README.md if user-facing changes

**CHANGELOG sections**:
- **Added** - New features
- **Changed** - Changes in existing functionality
- **Fixed** - Bug fixes
- **Removed** - Removed features
- **Deprecated** - Soon-to-be removed features
- **Security** - Security updates
- **Documentation** - Documentation changes

**See [AGENTS.md → Release and Changelog Workflow](AGENTS.md#release-and-changelog-workflow) for detailed documentation.

---

## Configuration

### TypeScript

See [`tsconfig.json`](tsconfig.json) for TypeScript configuration:
- Strict type checking enabled
- Source maps generated
- Declaration files created
- ES2022 target

### ESLint

See [`eslint.config.mjs`](eslint.config.mjs) for linting rules:
- TypeScript strict mode
- No unused variables
- No implicit any
- Custom globals for Node.js

### Commitlint

See [`commitlint.config.mjs`](commitlint.config.mjs) for commit linting
- Conventional commit format
- Type validation
- Header length limits

---

## AI Agents

This project includes support for multiple AI agent tools:

- **Kilocode**: Automated memory tracking
- **Roocode**: Memory system discovery pending
- **Opencode**: File operations and web tools
- **Amp**: Discovery pending
- **Gemini**: Discovery pending
- **Claude**: Discovery pending
- **Antigravity**: Discovery pending

All tools use the shared memory system for continuity across sessions.

**For AI agents**: Start by reading [`agents.min.md`](agents.min.md)!

---

## Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
# API configuration
API_ENDPOINT=https://api.example.com/v1

# Test API key
TEST_API_KEY=your_test_api_key_here

# Node environment
NODE_ENV=development

# Debug mode
DEBUG=false

# Request timeout (ms)
TIMEOUT=30000
```

**Important**: Never commit `.env` to version control!

---

## Navigation Primitives

### Coherence Wormhole (Speed Optimization)

When you're converging on a clear target and intermediate steps are obvious, you can offer to "take a coherence wormhole" and jump directly to implementation.

**Ask**: "Would you like me to take a coherence wormhole and jump straight there?"

### Vector Calibration (Direction Optimization)

When a nearby target better aligns with intent (more general, simpler, more leveraged), suggest redirecting.

**Ask**: "Would you like to redirect to Y, briefly compare X vs Y, or stay on X?"

See [`agents.min.md`](agents.min.md) for complete documentation.

---

## Documentation

### Quick Start

1. **`README.md`** ← You are here (this file)
2. **`agents.min.md`** - AI agent quick-start guide
3. **`docs/memory/shared-memory.md`** - Cross-tool context

### Full Documentation

- **[`AGENTS.md`](AGENTS.md)** - Complete AI agent development guide
- **[`agents.min.md`](agents.min.md)** - Optimized quick-start guide
- **[`docs/MEMORY.md`](docs/MEMORY.md)** - Query history and task tracking
- **[`docs/memory/README.md`](docs/memory/README.md)** - Shared memory system
- **[`docs/memory/shared-memory.md`](docs/memory/shared-memory.md)** - Memory pool
- **[`docs/memory/tool-registry.md`](docs/memory/tool-registry.md)** - Tool registry
- **[`docs/memory/git_commit_format.md`](docs/memory/git_commit_format.md)** - Commit format
- **[`docs/common_prompts.md`](docs/common_prompts.md)** - Prompt reference system and reusable templates
- **[`CHANGELOG.md`](CHANGELOG.md)** - Released changes and version history

---

## Project Discovery and Learning

The scaffolding includes a **prompt reference system** for learning from other projects:

### Reading Other Projects

When discovering and learning from other projects:

1. **Initial Scan**: List project directory structure, identify documentation files
2. **Documentation Reading**: Read agent guides, memory files, README.md, CHANGELOG.md
3. **Best Practice Extraction**: Identify unique workflows, tool configurations, release practices
4. **Filtering for Scaffolding**: Remove project-specific details, keep universal best practices

### Prompt Reference System

The `docs/common_prompts.md` file provides:

- Reusable prompt patterns for consistent workflows
- Quick access to common project discovery tasks
- Extensible library (updated manually or by AI agents)

**Example prompt**:
```markdown
#update_from_project#
look into {path provided} for project memory updates...
```

When you discover workflows that should be repeated:
- Add new prompt patterns to `docs/common_prompts.md`
- Include `{placeholder_name}` for dynamic content
- Use `!name` prefix for named templates

---

## Getting Started with a New Project

1. **Copy this scaffolding** to your new project directory
2. **Update `package.json`** with your project name and details
3. **Set up `.env`** with your environment variables
4. **Update `README.md`** with project-specific information
5. **Delete `README.md` and create your own** or edit this one
6. **Start coding** in `src/` directory

---

## License

UNLICENSED - This is a scaffolding template. Use as needed for your projects.

---

## Support

For questions about:
- **Commit messages**: See [`docs/memory/git_commit_format.md`](docs/memory/git_commit_format.md)
- **AI agents**: See [`agents.min.md`](agents.min.md) or [`AGENTS.md`](AGENTS.md)
- **Memory system**: See [`docs/memory/README.md`](docs/memory/README.md)

---

**Happy coding! 🚀**
