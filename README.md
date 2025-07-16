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
git clone https://github.com/Pahari47/OMVAD-Assignment
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
- **Frontend:** Deploy on Vercel
- **Backend:** Deploy on Render
- **Update** frontend : https://omvad-assignment.vercel.app/  backend : https://omvad-assignment-4sw3.onrender.com

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

---
