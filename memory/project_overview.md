---
name: project-overview
description: Core purpose, stack, and architecture of the oms-bot-backend project
metadata:
  type: project
---

RAG chatbot backend for the **Orio OMS Dashboard** — answers user questions about the Orio Order Management System using a local HNSWLib vector store + Google Gemini.

**Why:** The Orio support team needed an AI-powered consultant bot embedded in their dashboard.

**How to apply:** When suggesting new features or debugging, always respect the two-phase setup: (1) ingest knowledge base → (2) run server. The vector store at `vector_store_index/` must be present before the server starts.

**Stack:** Bun runtime, Express 5, TypeScript, LangChain, Google Gemini (chat + embeddings), HNSWLib (local vector store), Zod validation, Winston logging.
