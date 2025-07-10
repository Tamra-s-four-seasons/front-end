"use client";

import React from "react";
import { Button } from "@vapor-ui/core";

const API_URL = "http://java-backend.goormthon-6.svc.cluster.local:80";

const Page = () => {
  return (
    <div>
      <Button
        onClick={async () => {
          const res = await fetch(`${API_URL}/login`, {
            method: "POST",
            body: JSON.stringify({
              id: "admin",
              password: "admin",
            }),
          });
          const data = await res.json();
          console.log(data);
        }}
      >
        어드민 로그인
      </Button>
      <Button
        onClick={async () => {
          const res = await fetch(`${API_URL}/mission/in-progress`, {
            method: "POST",
            body: JSON.stringify({
              userId: "admin",
              routeId: 0,
            }),
          });
          const data = await res.json();
          console.log(data);
        }}
      >
        미션 하나 시작하기
      </Button>
      <Button
        onClick={async () => {
          const res = await fetch(`${API_URL}/mission/in-progress`, {
            method: "POST",
            body: JSON.stringify({
              userId: "admin",
              routeId: 1,
            }),
          });
          const data = await res.json();
          console.log(data);
        }}
      >
        미션 하나 시작하기
      </Button>
      <Button
        onClick={async () => {
          const res = await fetch(`${API_URL}/mission/check-point`, {
            method: "POST",
            body: JSON.stringify({
              userId: "admin",
              missionId: 1,
              checkpointId: 1,
            }),
          });
          const data = await res.json();
          console.log(data);
        }}
      >
        체크포인트완료요청
      </Button>
    </div>
  );
};

export default Page;
