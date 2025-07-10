import React from "react";
import { CardRoot, CardBody } from "@vapor-ui/core";
import MissionBoard from "@/components/home/mission-board";

interface MissionBoardItemProps {
  keyword: string;
  description: string;
  routeName: string;
  completedCheckpointCnt: number;
  totalCheckpointCnt: number;
}

const mockMissionItems: MissionBoardItemProps[] = [
  {
    keyword: "키워드",
    description: "지도 한 줄 설명",
    routeName: "지도 이름",
    completedCheckpointCnt: 1,
    totalCheckpointCnt: 3,
  },
  {
    keyword: "키워드",
    description: "지도 한 줄 설명",
    routeName: "지도 이름",
    completedCheckpointCnt: 2,
    totalCheckpointCnt: 3,
  },
  {
    keyword: "키워드",
    description: "지도 한 줄 설명",
    routeName: "지도 이름",
    completedCheckpointCnt: 1,
    totalCheckpointCnt: 4,
  },
];

const HomePage = () => {
  return (
    <div className="mt-5">
      <CardRoot className="rounded-2xl border-none bg-card p-5">
        <CardBody className="p-0">
          <MissionBoard items={mockMissionItems} />
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
    </div>
  );
};

export default HomePage;
