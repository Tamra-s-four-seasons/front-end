import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";
import { mockMissionData } from "@/constants/mock-data";
import MissionMap from "@/components/missions/mission-map";

interface MissionDetailPageProps {
  params: Promise<{ missionId: string }>;
}

const prefetchMissions = async (queryClient: QueryClient) => {
  const getMissions = async () => {
    return mockMissionData;
  };

  await queryClient.prefetchQuery({
    queryKey: ["missions"],
    queryFn: () => getMissions(),
  });
};

const MissionDetailPage = async ({ params }: MissionDetailPageProps) => {
  const { missionId } = await params;

  const queryClient = new QueryClient();
  await prefetchMissions(queryClient);

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <MissionMap missionId={missionId} />
    </HydrationBoundary>
  );
};

export default MissionDetailPage;
