// 로컬 스토리지 키 상수
export const STORAGE_KEYS = {
  GOORM: "goorm",
} as const;

// goorm 완료 상태 설정
export const setGoormComplete = () => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.GOORM, "true");
  }
};

// goorm 완료 상태 확인
export const isGoormComplete = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(STORAGE_KEYS.GOORM) === "true";
  }
  return false;
};
