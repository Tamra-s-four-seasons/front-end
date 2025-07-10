"use client";

import { useMission } from "@/hooks/queries/useMissions";
import React from "react";
import Route1Checkpoints from "@/components/svg-maps/route-1-checkpoints";

interface MissionMapProps {
  missionId: string;
}

const MissionMap = ({ missionId }: MissionMapProps) => {
  const mission = useMission(missionId);
  if (!mission) return null;

  return (
    <div>
      <Route1Checkpoints checkpoints={mission?.checkpoints} />
    </div>
  );
};

export default MissionMap;
