"use server";

import { AT_NAME } from "@/constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const signInAction = async () => {
  const cookieStore = await cookies();
  cookieStore.set(AT_NAME, "1234567890");
  redirect("/");
};
