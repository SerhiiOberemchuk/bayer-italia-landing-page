<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project architecture rules

- Organize server operations by feature: `actions/<feature>/<operation>.ts`.
- Import an operation from its concrete file. Do not add barrel `index.ts` files or pass-through re-export wrappers.
- Keep one public operation per action file. Keep its schema, private helpers, validation, and orchestration in that file until code has at least two real consumers.
- Use `"use server"` only for mutations invoked from Client Components. Use `import "server-only"` for server-side reads and infrastructure modules.
- Treat every Server Action argument as untrusted. Validate it on the server, re-read security-sensitive values from the source of truth, and return only the minimum UI result.
- Keep `app/` focused on route composition and `components/` focused on UI. Put reusable infrastructure clients and shared domain types in `lib/`.
- Use Route Handlers only when an external system needs an HTTP endpoint, such as a webhook. Internal UI mutations use Server Actions.
- Prefer direct, descriptive function names and early returns. Do not introduce repositories, services, factories, or adapters for a single use case.
