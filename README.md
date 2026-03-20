# Vite+ Monorepo Starter

A starter for creating a Vite+ monorepo.

## Structure

```
apps/
  website/     # Default Vite+ template (vanilla TypeScript)
  form-demo/   # React + react-hook-form + zod + shadcn/ui demo
packages/
  utils/       # Shared utilities
```

## Development

- Install dependencies:

```bash
vp install
```

- Check everything is ready:

```bash
vp run ready
```

- Run the tests:

```bash
vp run test -r
```

- Build the monorepo:

```bash
vp run build -r
```

- Run the development server:

```bash
vp run dev
```

## Apps

### website

Default Vite+ template with a counter demo.

```bash
vp dev apps/website
```

### form-demo

Contact form demo built with React, react-hook-form, zod (v4), and shadcn/ui components on Tailwind CSS.

```bash
vp dev apps/form-demo
```

Features:

- Zod schema validation (name, email, category, message)
- Real-time validation error display
- Character counter for textarea
- Submit / Reset with submitted data preview
- Dark mode support

Tech stack:

- React 19
- react-hook-form + @hookform/resolvers
- zod v4
- Tailwind CSS v4 (@tailwindcss/vite)
- shadcn/ui components (Button, Input, Label, Textarea, Select, Form)
