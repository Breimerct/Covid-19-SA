# Covid-19-SA

A frontend project built with React, TypeScript, and Vite.

> **Project status:** This repository currently contains the default React/Vite.

## Requirements

- Node.js 20.19+ or 22.12+
- pnpm

## Getting Started

Install the dependencies and start the development server:

```bash
pnpm install
pnpm dev
```

Open the local URL printed in the terminal. Vite usually uses `http://localhost:5173`.

## Available Commands

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the development server. |
| `pnpm lint` | Run Oxlint. |
| `pnpm build` | Type-check the project and create a production build in `dist/`. |
| `pnpm preview` | Preview the production build locally. Run `pnpm build` first. |

## Project Structure

```text
src/
  assets/      Images and other visual assets
  App.tsx      Main application screen
  App.css      Application styles
  index.css    Global styles
  main.tsx     Application entry point
public/        Static files
index.html     HTML document used by Vite
```

## Technologies

- React 19
- TypeScript
- Vite 8
- Oxlint
