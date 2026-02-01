# Prompt Reference System

This file contains reusable prompt patterns and templates for AI agents.

## Prompt Format

Prompts follow this structure:

```markdown
#prompt_name#
{prompt description with placeholders}
```

**Important**: Use `~` (tilde) instead of `!` for prompt names to avoid shell command conflicts.

**Placeholder Usage**:

- Use `{placeholder_name}` for dynamic content
- Replace placeholders with actual values when executing prompts
- Prompts can have or without a name
- Prompt matching is fuzzy/general, not necessarily exact

## Available Prompts

### #update_from_project#

look into {path provided} for project memory updates that we might add to best practices. enhance yourself based off non-project specific best practices and document and memorize, and implement it.

**Use when**:

- Discovering workflows from other projects
- Learning best practices from existing codebases
- Extracting reusable patterns
- Enhancing scaffolding or documentation

**Placeholders**:

- `{path provided}` - Path to project to examine

**Matching Logic**:

- Look for general prompt intent, not exact string match
- "update memory" patterns match this prompt
- "update from project" patterns match this prompt
- Context-aware: distinguish from code comments or inline explanations

---

## Adding New Prompts

**When to add**:

- Discover a workflow that would be useful to repeat
- Learn a new pattern from another project
- Create a reusable template for common tasks
- Document best practices that should be standardized

**How to add**:

1. Use `#prompt_name#` format (with `~` not `!`)
2. Include prompt description with `{placeholders}`
3. Document when to use the prompt
4. Add matching logic (what triggers this prompt)
5. Include example usage if helpful

**Prompt Management**:

- Keep prompts focused and reusable
- Use descriptive names with `~` prefix
- Document placeholders clearly
- Update prompts based on feedback and usage
- Make matching flexible/general, not strict

**Matching Guidelines**:

- Agents should check for ~ patterns that look like prompt requests
- Distinguish from inline code or comments
- Look for intent/context, not exact string match
- "update" + "memory/project" matches #update_from_project#
- User requests like "update from project" should trigger prompts
- Consider user's specific tool and context when matching

#### Extended Matching Examples

**Example 1**: User asks to learn from another project
```
User: "Update memory based on what I learned from z-ai-monitor project"

Agent Action:
1. Check docs/common_prompts.md for matching prompts
2. Match found: #update_from_project# (intent: "update" + "project")
3. Execute prompt with placeholder: {path provided} = "z-ai-monitor"
4. Process: Analyze project structure, extract best practices, update documentation
```

**Example 2**: User creates PR explicitly
```
User: "~create_pr# Merge feature/authentication into main"

Agent Action:
1. Recognize explicit prompt reference
2. Parse: prompt = "create_pr", target_branch = "main", pr_description provided separately
3. Execute #create_pr# with parsed parameters
4. Process: Create PR using gh CLI with user's commit format
```

**Example 3**: General memory update (no specific prompt)
```
User: "Update memory with what we just did"

Agent Action:
1. Check docs/common_prompts.md for matching prompts
2. No specific match found (general "update memory" request)
3. Proceed with standard memory update workflow
4. Update docs/MEMORY.md and docs/memory/shared-memory.md with session summary
```

#### Advanced Matching Scenarios

**Scenario 1**: Multiple prompt patterns match
- User says: "Create PR to merge feature and update memory from project X"
- Action: Execute both prompts in order (#create_pr# first, then #update_from_project#)

**Scenario 2**: Implicit prompt reference
- User says: "I want to use that update project prompt you have"
- Action: Recognize intent, match #update_from_project#, ask for path parameter

**Scenario 3**: Complex request with multiple goals
- User says: "Learn from project Y, then create PR for changes"
- Action: Execute #update_from_project# first, then offer to create PR after changes are ready

---

## Fuzzy Matching Guidelines

### What is Fuzzy Matching?

Fuzzy matching allows agents to recognize prompt intent even when:
- User uses different wording than the exact prompt name
- User combines multiple concepts in one request
- User's intent aligns with a known workflow
- User refers to prompt indirectly (e.g., "that update project prompt")

### Fuzzy Matching Rules

**Apply fuzzy matching when**:
- User request contains key trigger words (update, create, document, learn, enhance)
- Intent aligns with documented workflow patterns
- User's goal matches a prompt's purpose, even if wording differs
- No specific task or exact command is requested

**Do NOT apply fuzzy matching when**:
- Clear, specific task is requested (e.g., "refactor function X in file Y")
- User asks a direct question requiring reasoning
- Request is ambiguous and needs clarification
- User explicitly declines to use prompt workflows

### Fuzzy Matching Examples

**Example 1**: Wording variation
```
User: "Teach me what you know from z-ai-monitor project"

Match: #update_from_project# (intent: learn from project, not exact wording)
Action: Execute learning workflow
```

**Example 2**: Combined intent
```
User: "Open a PR for my feature branch"

Match: #create_pr# (intent: create pull request, not exact "create a pr")
Action: Offer PR creation workflow
```

**Example 3**: Indirect reference
```
User: "Use the enhancement prompt for this scaffolding"

Match: #update_from_project# (intent: enhance based on other project)
Action: Ask for project path to analyze
```

### Confidence Thresholds

**High Confidence (Execute immediately)**:
- Clear intent match with minor wording variation
- User mentions specific prompt features by name or purpose
- Request contains all required parameters

**Medium Confidence (Ask for clarification)**:
- Intent matches but parameters are missing
- Multiple prompts could apply
- Wording is ambiguous

**Low Confidence (Do not match)**:
- Vague request without clear workflow intent
- User asks for help or information, not a workflow
- Request requires significant interpretation

---

## Integration with Memory System

- Prompt additions should be documented in docs/MEMORY.md
- Update Quick Reference section with new prompt patterns
- Reference prompts in AGENTS.md and agents.min.md for context
- Share prompt knowledge via docs/memory/shared-memory.md
- Always check docs/common_prompts.md when user asks to update memory or learn from projects

---

## Example Usage

**User says**: "Update from z-ai-monitor project"

**Agent action**:

1. Check docs/common_prompts.md for matching prompts
2. Find #update_from_project# matches (general matching, not exact)
3. Execute prompt with placeholder: `{path provided}` = `z-ai-monitor`
4. Process: look into D:\_projects\z-ai-monitor for best practices...

**User says**: "Update memory with what I learned"

**Agent action**:

1. Check for prompt patterns matching "update memory"
2. If no specific match found, proceed with general memory update
3. Check docs/common_prompts.md for relevant prompts
4. Execute if match found, otherwise use standard memory update workflow

**User says**: "~update_from_project# D:\_projects\some-project"

**Agent action**:

1. Recognize this as an explicit prompt reference
2. Parse prompt name and placeholder value
3. Execute #update_from_project# with `{path provided}` = `D:\_projects\some-project`

---

### #create_pr#
Create a pull request to merge current branch into target branch using GitHub CLI.

**Use when**:
- Needing to create a PR for a feature branch
- Ready to merge changes into main/master
- Collaborating with team via code review

**Placeholders**:
- `{target_branch}` - Target branch to merge into (usually 'main' or 'master')
- `{pr_description}` - Description of the PR being created

**Instructions**:
1. Check that gh CLI is installed and authenticated
2. Ensure all changes are committed and pushed to remote
3. Review commits that will be included in PR
4. Focus PR description on overall changes (not individual commits)
5. Use user's commit format for PR title if specified
6. Mention any breaking changes or migration steps
7. Link to relevant issues or documentation

**Example**:
```bash
gh pr create --title "✨ feat(scope): description" --body "PR description here"
```

**Matching Logic**:
- "create a pr" patterns match this prompt
- "merge into main" patterns match this prompt
- "open pull request" patterns match this prompt
- Context-aware: look for branch and target information

---
