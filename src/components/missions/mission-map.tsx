"use client";

import { useMission } from "@/hooks/queries/useMissions";
import React from "react";
import Route1Checkpoints from "@/components/svg-maps/route-1-checkpoints";
import Route2Checkpoints from "@/components/svg-maps/route-2-checkpoints";
import Route3Checkpoints from "@/components/svg-maps/route-3-checkpoints";

interface MissionMapProps {
  missionId: string;
}

const MissionMap = ({ missionId }: MissionMapProps) => {
  const mission = useMission(missionId);
  if (!mission) return null;

  return (
    <div>
      {mission.routeId === "jeju-001" && (
        <Route1Checkpoints checkpoints={mission?.checkpoints} />
      )}
      {mission.routeId === "busan-002" && (
        <Route2Checkpoints checkpoints={mission?.checkpoints} />
      )}
      {mission.routeId === "seoul-003" && (
        <Route3Checkpoints checkpoints={mission?.checkpoints} />
      )}
    </div>
  );
};

export default MissionMap;
