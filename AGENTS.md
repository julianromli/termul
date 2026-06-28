# AGENTS.md

This project uses `CLAUDE.md` as the single source of truth for AI contributor guidelines, CI gates, and review requirements.

👉 **Read [`CLAUDE.md`](./CLAUDE.md) before making any changes.**

## Project Documentation

For architecture, task routing, and implementation rules, see the docs listed in [`CLAUDE.md`](./CLAUDE.md).

## Cursor Cloud specific instructions

Standard commands live in `README.md` and `package.json` scripts. The notes below are non-obvious caveats for this cloud environment (the update script already runs `bun install`).

- **Package manager is `bun`** (pinned `bun@1.3.1`), not npm/node. Installed at `~/.bun/bin` (on `PATH` via `~/.bashrc`).
- **Rust toolchain must be ≥ 1.85** — the vendored crate `src-tauri/vendor/agent-client-protocol` requires edition 2024. If `cargo`/`bun run dev` fails with `feature 'edition2024' is required`, run `rustup update stable && rustup default stable` (the updated toolchain persists in the VM snapshot).
- **Running the desktop app:** `bun run dev` (= `tauri dev`) is a native GTK/WebKit GUI app and needs a display. A virtual X server is available on the cloud VM at `DISPLAY=:1`, so launch with `DISPLAY=:1 bun run dev`. First Rust build takes a few minutes. The Vite renderer serves on **port 5180** (`strictPort`); the native window opens once compilation finishes.
- **Native file-picker quirk:** the GTK file-chooser dialog (e.g. the New Project "Browse" button) may render its file list as a blank/white area in this headless desktop. Navigate via the dialog sidebar "+ Other Locations" → "Computer", or type the path directly. This is a portal rendering quirk, not an app bug.
- **Landing site (`landing/`)** is a separate product with its own `bun.lock`; run `bun install` inside `landing/` before `bun run landing:dev` (dev server on Vite default port 5173). It is not needed to run/test the desktop app.