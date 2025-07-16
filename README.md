# Link Saver + Auto-Summary

A full-stack web app to save, organize, and auto-summarize your favorite links. Built for the OMVAD Assignment.

---

## 🚀 Tech Stack

- **Frontend:** React (Vite), Tailwind CSS, @hello-pangea/dnd
- **Backend:** Node.js, Express, MongoDB (Mongoose)
- **Auth:** JWT, bcrypt
- **AI Summary:** Jina AI r.jina.ai public API

---

## 🛠️ Setup Instructions

### 1. **Clone the Repo**
```bash
git clone <your-repo-url>
cd <project-root>
```

### 2. **Backend Setup**
```bash
cd Backend
npm install
# Create a .env file with:
# MONGO_URI=your_mongodb_uri
# JWT_SECRET=your_jwt_secret
# PORT=5000
npm run dev
```

### 3. **Frontend Setup**
```bash
cd ../Frontend
npm install
# Create a .env file with:
# VITE_API_URL=http://localhost:5000
npm run dev
```

- Visit [http://localhost:5173](http://localhost:5173) to use the app.

---

## 🌐 Deployment
- **Frontend:** Deploy to Vercel (recommended for static React/Vite sites)
- **Backend:** Deploy to Render, Railway, or Heroku (Vercel is not suitable for Express servers)
- **Update** `VITE_API_URL` in the frontend to your backend's public URL after deployment.

---

## 📝 What I'd Do Next
- Add email verification and password reset
- Add user profile and settings
- Add bookmark editing and tag management UI
- Add pagination or infinite scroll for large bookmark lists
- Add analytics/dashboard for user activity
- Add more robust error handling and user feedback
- Add tests (unit, integration, e2e)
- Polish mobile UI further

---

## ⏱️ Time Spent
- **Planning & Design:** 1 hour
- **Backend Implementation:** 3 hours
- **Frontend Implementation:** 2 hours
- **Testing & Debugging:** 1 hours
- **UI/UX Polish & Cleanup:** 1 hours
- **Total:** ~8 hours

---

## 🙌 Credits
- [Jina AI r.jina.ai](https://r.jina.ai/) for free summarization API
- [unDraw](https://undraw.co/) for illustrations

---
