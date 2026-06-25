# Contributing

This repository enforces a single naming convention for branches, commits, and pull requests. **No exceptions.**

## Types

| Type       | Use for                                                 |
| ---------- | ------------------------------------------------------- |
| `feat`     | New behavior or capability                              |
| `fix`      | Bug fix                                                 |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `docs`     | Documentation only                                      |
| `test`     | Tests only                                              |
| `chore`    | Tooling, dependencies, repo maintenance                 |
| `build`    | Build system or packaging                               |
| `ci`       | CI configuration                                        |
| `style`    | Formatting, whitespace, no logic change                 |
| `perf`     | Performance improvement                                 |

## Branch names

Format:

```text
type/scope
```

- `type` — one of the [types](#types) above.
- `scope` — lowercase, short noun for the area of change (e.g. `diff-view`, `sessions`, `sidebar`, `ipc`).

Examples:

```text
feat/diff-view
fix/sessions
refactor/sidebar
docs/contributing
chore/deps
```

Create branches from `main`:

```bash
git checkout main
git pull origin main
git checkout -b feat/diff-view
```

## Commit messages

Format:

```text
type(scope): message
```

| Part      | Rules                                                        |
| --------- | ------------------------------------------------------------ |
| `type`    | One of the [types](#types) above.                            |
| `scope`   | Same as the branch `scope`; must match on topic branches.    |
| `message` | Lowercase imperative. No trailing period. Max 72 characters. |

Examples:

```text
feat(diff-view): add side-by-side file comparison
fix(sessions): persist active tab on reload
docs(contributing): document branch and commit rules
chore(deps): bump electron to 35.2.0
```

## Pull requests

**Title** (required):

```text
type(scope): message
```

Use the same format as [commit messages](#commit-messages). The PR title must use the same type and scope as the branch name.

**Body** — include:

1. **Summary** — what changed and why (1–3 bullets).
2. **Test plan** — how you verified the change (`npm run check`, manual steps, etc.).

Examples:

| Branch           | PR title                                            |
| ---------------- | --------------------------------------------------- |
| `feat/diff-view` | `feat(diff-view): add side-by-side file comparison` |
| `fix/sessions`   | `fix(sessions): persist active tab on reload`       |

## Before you push

```bash
npm run check        # type-check, lint, format
npm run check:push   # check + build (same as pre-push hook)
```

Pre-commit runs `lint-staged` on staged files. Pre-push runs `npm run check:push`.
