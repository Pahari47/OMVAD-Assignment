import { BrowserRouter, Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";

function PrivateRoute({ children }) {
  return localStorage.getItem("token") ? children : <Navigate to="/" />;
}

function NavBar() {
  const isAuth = !!localStorage.getItem("token");
  const navigate = useNavigate();
  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 bg-gray-900 text-white shadow">
      <Link to="/" className="text-2xl font-bold tracking-tight">LinkSaver</Link>
      <div>
        {!isAuth && (
          <button
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold transition"
            onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
          >
            Get Started
          </button>
        )}
        {isAuth && (
          <button
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold transition"
            onClick={() => { localStorage.removeItem("token"); navigate("/"); window.location.reload(); }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}