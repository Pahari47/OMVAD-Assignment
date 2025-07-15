import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthModal from "./AuthModal";

export default function NavBar() {
  const isAuth = !!localStorage.getItem("token");
  const navigate = useNavigate();
  const [showAuth, setShowAuth] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 w-full min-h-[64px] flex items-center justify-between px-8 py-4 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white shadow border-b border-gray-200 dark:border-gray-800">
        <Link to="/" className="text-2xl font-bold tracking-tight">LinkSaver</Link>
        <div className="flex items-center gap-4">
          {!isAuth && (
            <button
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold transition text-white"
              onClick={() => setShowAuth(true)}
            >
              Get Started
            </button>
          )}
          {isAuth && (
            <button
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold transition text-white"
              onClick={() => { localStorage.removeItem("token"); navigate("/"); window.location.reload(); }}
            >
              Logout
            </button>
          )}
        </div>
      </nav>
      {/* Spacer to prevent content from being hidden behind the fixed navbar */}
      <div className="min-h-[64px]" />
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </>
  );
} 