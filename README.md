# OpenDesktop

> **The Open-Source "Agentic Window UI" App Shell for AI Coding Agents.**  
> Build your own harness with OpenDesktop and enjoy a premium, fast desktop workspace UI inspired by OpenTUI's headless philosophy.

> **Attention:** OpenDesktop is in **early experimental** stage (pre-alpha). Nothing is stable yet — APIs, architecture, and UI may change without notice. This is a **vibe-coded side project**; expect rough edges, not production-grade polish yet.

---

## What is OpenDesktop?

**OpenDesktop** is a highly optimized, fully open-source **Desktop UI Application Shell** designed specifically for the next generation of autonomous AI coding agents. Built with **Electron + Svelte**, it addresses the massive "AI UI/UX crisis" by decoupling the agent's logic from the visual workspace.

Instead of wrestling with hanky-clunky web interfaces or being locked down by heavy commercial IDEs (like VS Code/Copilot ecosystem or Cursor), OpenDesktop provides a standalone, dedicated canvas for your agents. It does **not** contain any AI logic or proprietary models out of the box; it is a pure, language-agnostic graphical interface that controls window management, multi-session tracking, diff-views, and sandboxed runtimes.

---

## Key Features (The Agentic UI Paradigm)

- **Multi-Session Architecture:** Run, monitor, and toggle between multiple parallel agent sessions (e.g., refactoring backend code in one tab while upgrading a database schema in another).
- **Live Diff View Component:** Native, fast side-by-side diff view to instantly track, inspect, approve, or reject changes proposed by your agent.
- **Language & Engine Agnostic (App Shell Approach):** Whether your agent is written in Python (LangChain, CrewAI), Rust, Go, or TypeScript, it can seamlessly control OpenDesktop via a lightweight local socket.
- **Integrated Web Sandbox:** Features an embedded webview so agents can build, render, and visually debug frontend elements right beside the conversation flow.

---

## How it Works: The App Shell Architecture

OpenDesktop operates complex graphical desktop layouts. It spins up a local **WebSocket server / MCP (Model Context Protocol) endpoint**.

Your external agent script connects to this local port and pushes structured JSON commands to render UI updates in real-time.
