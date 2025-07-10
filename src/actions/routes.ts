"use server";
import { mockRouteData } from "@/constants/mock-data";

export const getAllRoutesAction = async () => {
  console.log("get all routes actions");
  return mockRouteData;
};
