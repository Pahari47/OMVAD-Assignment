import { useEffect, useState } from "react";

export default function useAuth() {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"));
  useEffect(() => {
    setIsAuth(!!localStorage.getItem("token"));
  }, []);
  return { isAuth };
}