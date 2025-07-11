"use server";

import { mockMissionData } from "@/constants/mock-data";

export const getAllMissionsAction = async () => {
  const data = mockMissionData;
  return data;
};
