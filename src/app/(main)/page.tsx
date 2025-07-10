import React from "react";
import { CardRoot, CardBody } from "@vapor-ui/core";
import MissionBoard from "@/components/home/mission-board";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { mockMissionData } from "@/constants/mock-data";

const prefetchMissions = async (queryClient: QueryClient) => {
  const getMissions = async () => {
    return mockMissionData;
  };

  const missions = await queryClient.fetchQuery({
    queryKey: ["missions"],
    queryFn: () => getMissions(),
  });

  return missions;
};

const HomePage = async () => {
  const queryClient = new QueryClient();
  const missions = await prefetchMissions(queryClient);
  const formattedMissions = missions.map((mission) => ({
    missionId: mission.missionId.toString(),
    keyword: mission.routeKeyword,
    description: mission.routeKeyword,
    routeName: mission.routeName,
    completedCheckpointCnt: mission.checkpoints.filter(
      (checkpoint) => checkpoint.isComplete
    ).length,
    totalCheckpointCnt: mission.checkpoints.length,
  }));
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="mt-5">
        <CardRoot className="rounded-2xl border-none bg-card p-5">
          <CardBody className="p-0">
            <MissionBoard items={formattedMissions} />
          </CardBody>
        </CardRoot>
        {/* <Script
          type="module"
          src="https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js"
        ></Script>
        <div className="model-viewer">
          <model-viewer
            src={"/dol.glb"}
            ios-src={"/dol.usdz"}
            alt={"model-viewer"}
            ar
            ar-modes="webxr scene-viewer quick-look"
            ar-scale="auto"
            environment-image="neutral"
            camera-controls
          >
            <button slot="ar-button" id="ar-button">
              View in AR
            </button>
          </model-viewer>
        </div> */}
        <div className="h-28" />
      </div>
    </HydrationBoundary>
  );
};

export default HomePage;
