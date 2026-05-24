"use client";

import { useEffect, useState } from "react";

import { getUserInfo } from "../utils/auth";

export function useAuth() {
  const [userInfo, setUserInfo] = useState(() =>
    getUserInfo()
  );

  useEffect(() => {
    const sync = () => setUserInfo(getUserInfo());

    // Cross-tab updates:
    window.addEventListener("storage", sync);
    // Same-tab updates:
    window.addEventListener("auth:changed", sync);

    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("auth:changed", sync);
    };
  }, []);

  return {
    userInfo,
    isLoggedIn: Boolean(userInfo?.token),
    token: userInfo?.token ?? null,
  };
}

