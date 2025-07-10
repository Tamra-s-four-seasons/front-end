export interface User {
  id: string;
  username: string;
}

const AUTH_KEY = "auth_user";

export const setAuthUser = (user: User) => {
  if (typeof window !== "undefined") {
    // localStorage에 저장
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));

    // 쿠키에도 저장 (미들웨어에서 사용)
    document.cookie = `${AUTH_KEY}=${JSON.stringify(user)}; path=/`;
  }
};

export const getAuthUser = (): User | null => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem(AUTH_KEY);
    return user ? JSON.parse(user) : null;
  }
  return null;
};

export const removeAuthUser = () => {
  if (typeof window !== "undefined") {
    // localStorage에서 제거
    localStorage.removeItem(AUTH_KEY);

    // 쿠키에서도 제거
    document.cookie = `${AUTH_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
  }
};

export const isAuthenticated = (): boolean => {
  return getAuthUser() !== null;
};
