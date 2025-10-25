# 🤖 AI@UCF - Intro to RAG

Welcome to the **Intro to RAG** live coding session!  
This project is designed to help you build a chatbot that can **retrieve context from a MongoDB vector database** and use it with an LLM to answer questions more accurately.

---

## 🧱 Overview

You’ll be working in a **Next.js (App Router)** project with the goal of:

1. Setting up MongoDB for the vectorDB
2. Implementing a **RAG chat** flow using embeddings and a MongoDB vector database.

There is **1 file** you'll be editing : `src/app/api/chat/route.ts`.

---

### 1. `src/app/page.tsx`

- The **frontend UI** for the chatbot.
- Handles:
  - Rendering chat messages (user → right, assistant → left)
  - Sending messages to the backend
  - Displaying responses from the assistant
- **You don’t need to edit this** for the RAG logic — it works the same as a normal chat.

---

### 2. `src/app/api/chat/route.ts`

- Backend API route for **RAG chat**.
- Handles a POST request with user messages and returns a response from the assistant.
- **Your task:** Edit this file to:

  1. Read messages from the request.
  2. Extract the latest user query.
  3. Generate an embedding for the query using the embedding model (`all-MiniLM-L6-v2`).
  4. Query the MongoDB vector database to retrieve top relevant documents.
  5. Combine the retrieved context with a system message.
  6. Send the augmented messages to the LLM (`groq.chat.completions.create`) and return the reply as JSON.

- **Hint:** Use the provided `pipeline` function to create an embedding and `$vectorSearch` to retrieve top documents from MongoDB.

---

## 🧩 Solution Branch

Once you’ve completed your implementation, you can compare your work with the reference solution in the `solution` branch:

```bash
git checkout solution
```

---

## ⚙️ Stepup Instructions

Clone the repo:

```bash
git clone <repo-url>
cd <project-folder>
```

Install the dependencies:

```bash
npm install
```

Set up environment variables:

```bash
GROQ_API_KEY=[your_api_key_here]
MONGO_URI=[your_mongo_URI_here]
DATABASE_NAME=[your_db_name_here]
COLLECTION_NAME=[your_collection_name_here]
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
