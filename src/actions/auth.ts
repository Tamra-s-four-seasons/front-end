"use server";

// import { AT_NAME } from "@/constants";
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

const API_URL_HTTPS = "https://backend-team6.goorm.training";
// const API_URL_HTTP = "http://backend-team6.goorm.training";

export const signInAction = async (id: string, password: string) => {
  const res = await fetch(`${API_URL_HTTPS}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      password,
    }),
  });

  const data = await res.text();
  if (data && data.startsWith("{")) {
    return {
      message: "아이디와 비밀번호가 올바르지 않습니다.",
    };
  }
  return data;
};
