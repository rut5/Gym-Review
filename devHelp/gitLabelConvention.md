# Git Commit Label Conventions

> Based on [Conventional Commits](https://www.conventionalcommits.org/)

---

## Standard Types

| Label       | Use Case                                               |
| ----------- | ------------------------------------------------------ |
| `feat:`     | New feature                                            |
| `fix:`      | Bug fix                                                |
| `docs:`     | Documentation changes                                  |
| `style:`    | Formatting, missing semicolons, etc. (no logic change) |
| `refactor:` | Code refactoring (no bug fix/feature)                  |
| `perf:`     | Performance improvements                               |
| `test:`     | Adding/updating tests                                  |
| `chore:`    | Build process, dependency updates, config              |
| `build:`    | Build system changes (e.g., `webpack`, `vite`)         |
| `ci:`       | CI/CD configuration                                    |
| `revert:`   | Reverts a previous commit                              |

---

## Extended Types

| Label              | Use Case                                              |
| ------------------ | ----------------------------------------------------- |
| `WIP:`             | Work in progress                                      |
| `BREAKING CHANGE:` | Introduces breaking changes (can combine with others) |

---

## Format

### Basic Syntax

```
type(scope): description
```

### Breaking Changes

```
type(scope)!: description
```

### With Body and Footer

```
type: description

Body (optional)

Footer (optional, e.g., "Closes #123")
```

---

## Examples

```
feat(auth): add OAuth login
fix(api): handle null user data
chore: update dependencies
feat(ui)!: remove legacy components
```
