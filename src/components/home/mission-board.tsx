"use client";

import { Badge } from "@vapor-ui/core";
import Link from "next/link";
import React from "react";

interface MissionBoardProps {
  items: MissionBoardItemProps[];
}

const MissionBoard = ({ items }: MissionBoardProps) => {
  return (
    <div className="flex flex-col gap-3.75">
      {items.map((item, index) => (
        <MissionBoardItem key={index} {...item} />
      ))}
    </div>
  );
};

interface MissionBoardItemProps {
  missionId: string;
  keyword: string;
  description: string;
  routeName: string;
  completedCheckpointCnt: number;
  totalCheckpointCnt: number;
}

const MissionBoardItem = ({
  missionId,
  keyword,
  description,
  routeName,
  completedCheckpointCnt,
  totalCheckpointCnt,
}: MissionBoardItemProps) => {
  return (
    <Link href={`/missions/${missionId}`}>
      <div className="flex p-5 justify-between items-center bg-white rounded-xl">
        <div className="flex flex-col gap-1.5">
          <Badge className="bg-secondary text-primary w-fit rounded-full">
            {keyword}
          </Badge>
          <h1 className="text-lg font-bold">{routeName}</h1>
          <h2 className="text-sm text-muted-foreground">{description}</h2>
        </div>
        <div className="flex flex-col rounded-full h-21 aspect-square bg-secondary items-center justify-center">
          <span className="text-sm text-gray-500 font-medium">달성 스팟</span>
          <div>
            <span className="text-2xl font-semibold text-accent">
              {completedCheckpointCnt}
            </span>
            <span className="text-lg text-gray-500">
              {" "}
              / {totalCheckpointCnt}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MissionBoard;
