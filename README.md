# 🚀 eChat (Chat and Storage)

### *(Email-Based Application — Like WhatsApp is Phone Number-Based)*

A full-stack chat and file storage application built using **Next.js** and **Express (for sockets)**. It combines the power of messaging and file management into one seamless tool.

---

## 🎯 Purpose Behind Building This

```bash
We always use WhatsApp or similar chat applications for both personal and professional work.
During that, professionally received files often get mixed up with unnecessary images and documents.

That's why I came up with this idea — to merge chat and file storage into one application so that:

1. It can be used professionally.
2. All professional conversations and thoughts are kept in one place.
3. All professional files stay organized in one location.
4. Files can be managed easily with folder creation, deletion, renaming, and other operations.
```

---

## 👥 Target Audience

```bash
• Remote Workers
• Software Developers (SDEs)
• School Staff
• Corporate Employees
• Freelancers
• Lawyers
• Anyone who needs to separate work from personal clutter
```

---

## 🆚 Why This Competes with Similar Applications

```bash
The reason is:

• A clean and simple UI
• Familiar experience like other chat apps
• File Manager features
• Extremely accessible

With an intuitive interface, it can stand strong among existing chat and file-sharing apps.
```

---

## 🛠️ Application Features

---

### 🔐 Registration Methods

```bash
• Google Sign Up
• GitHub Sign Up
• Email Sign Up
```

---

### 🔑 Login Methods

```bash
• Google Sign In
• GitHub Sign In
• Email and Password Login
```

---

### 💬 Chat Features

```bash
• Add a Friend
• Create a Group
• Send Text Messages (with Emojis)
• Send Images, Videos, Files, etc.
• Forward Messages
• Delete Messages
• Delete for Everyone
• Select Multiple Messages (to Delete or Forward in One Action)
• View User Profile (with shared media history)
• Timestamps for All Messages
```

---

### 🗂️ Storage Features

```bash
• View All Files and Folders
• Filter by Photos, Videos, or Documents
• Create Folders
• Upload Files
• Delete Files or Folders
• Rename Files or Folders
• Send Files Directly from Storage to Chats
• Select Multiple Files (to Delete or Send in One Action)
```

---

## ⚙️ Environment Setup

### 🔧 Frontend `.env` File

```bash
DB_URI
AUTH_SECRET
AUTH_GOOGLE_ID
AUTH_GOOGLE_SECRET
AUTH_GITHUB_ID
AUTH_GITHUB_SECRET
DOMAIN_URL_BASE
NEXT_PUBLIC_SOCKET_URL
NEXT_PUBLIC_MESSAGE_ENCRYPT_KEY
```

---

### 🔧 Backend `.env` File

```bash
CHATAPP_URL="http://localhost:3000"
```

---

## 🧭 Development Journey

[Figma Design](https://www.figma.com/design/kwJA70CWswiRDP4yCWVBXu/echat?node-id=0-1&p=f&t=YUC3nB5TUUeyq0jZ-0)

```bash
1. Started from my existing backend login/signup template on GitHub.

2. Extended authentication to return the user ID and additional session details.

3. Began production setup to fix build-specific errors.

4. Faced a major Mongoose error in the auth.ts file — it took around 2 days to resolve.

Learning resources:
https://dev.to/thatanjan/2-ways-to-set-up-nextjs-with-mongodb-and-mongoose-4afo
https://medium.com/@aniruddh622003/setting-up-mongodb-with-mongoose-and-nextjs-13-3a598609c5d1

Fix found here:
https://stackoverflow.com/questions/78407469/the-error-was-caused-by-importing-mongoose-dist-browser-umd-js-in-src-model

5. Applied necessary production changes from my backend template’s README.

6. Initialized socket inside a client component in root layout — made it globally accessible by storing it in state.

7. Designed database schema for chat functionality.
ER Diagram: https://app.diagrams.net/#G15HfFKoVb7JMASQf8YkSKYo6MRhmcwnuY#%7B%22pageId%22%3A%22dWDINIOhN6ajU6t8rEm0%22%7D

8. Implemented schema using Mongoose models.

9. Created server actions and API routes for:
   - Creating connections
   - Group creation
   - Sending messages
   - Deleting messages

10. Used Supabase storage bucket for media management.

11. Implemented file upload to Supabase.

12. Updated database to store file metadata and support folder management.

13. Core features for uploading, managing, and sending files were completed.

14. Started frontend and connected all backend functionalities.

15. Initial version was working but had bugs and performance issues.

16. Decided to restructure DB and APIs to boost performance.

17. Read articles, blogs, and best practices to improve architecture.

18. Studied chat app standards to make this app scalable and production-ready.

19. Rebuilt everything with optimized APIs, data fetching strategies, and rendering logic.

20. Project completed. Looking forward to building more complex and impactful applications to grow my skills!
```

---

## ▶️ Getting Started

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

Visit: [http://localhost:3000](http://localhost:3000)

Start editing by modifying:

```bash
app/page.tsx
```

The app auto-updates as you save changes.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) for font performance.

---

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Next.js GitHub Repo](https://github.com/vercel/next.js/)

---

## 🚀 Deploy on Vercel

The easiest way to deploy your Next.js app is via [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Learn more: [Deployment Docs](https://nextjs.org/docs/deployment)
