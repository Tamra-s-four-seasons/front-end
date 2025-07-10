import { useQuery } from "@tanstack/react-query";
import { getAllMissionsAction } from "@/actions/missions";

export const useMissions = () => {
  return useQuery({
    queryKey: ["missions"],
    queryFn: () => getAllMissionsAction(),
  });
};

export const useMission = (missionId: string) => {
  const { data } = useMissions();
  return data?.find((mission) => mission.missionId === Number(missionId));
};
