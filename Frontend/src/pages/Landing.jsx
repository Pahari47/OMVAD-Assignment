import { useState } from "react";
import AuthModal from "../components/AuthModal";

export default function Landing() {
  const [showAuth, setShowAuth] = useState(false);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white px-4 py-8">
      <div className="w-full max-w-2xl flex flex-col items-center justify-center">
        <h1 className="text-3xl sm:text-5xl font-bold mb-4 text-center">Link Saver + Auto-Summary</h1>
        <p className="text-base sm:text-xl mb-8 max-w-xl text-center">
          Save your favorite links, auto-fetch titles & favicons, and get instant AI-powered summaries. Organize, tag, and reorder your bookmarks with ease. Secure, fast, and modern.
        </p>
        <button
          className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-semibold shadow-lg transition text-center"
          onClick={() => setShowAuth(true)}
        >
          Get Started
        </button>
        {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
      </div>
    </div>
  );
} 