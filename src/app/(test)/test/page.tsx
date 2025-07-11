"use client";

import React from "react";
import { Button } from "@vapor-ui/core";

const API_URL_HTTPS = "https://backend-team6.goorm.training:8080";
const API_URL_HTTP = "http://backend-team6.goorm.training:8080";

const Page = () => {
  return (
    <div>
      <Button
        onClick={async () => {
          const res = await fetch(`${API_URL_HTTPS}/login`, {
            method: "POST",
            body: JSON.stringify({
              id: "admin",
              password: "admin",
            }),
          });
          const data = await res.json();
          console.log(data);
        }}
        className="!bg-red-500 !py-2 !px-4 !rounded-md text-white"
      >
        어드민 로그인(HTTPS)
      </Button>
      <Button
        onClick={async () => {
          const res = await fetch(`${API_URL_HTTP}/login`, {
            method: "POST",
            body: JSON.stringify({
              id: "admin",
              password: "admin",
            }),
          });
          const data = await res.json();
          console.log(data);
        }}
        className="!bg-red-500 !py-2 !px-4 !rounded-md text-white"
      >
        어드민 로그인(HTTP)
      </Button>
      <Button
        onClick={async () => {
          const res = await fetch(`${API_URL_HTTPS}/mission/in-progress`, {
            method: "POST",
            body: JSON.stringify({
              userId: "admin",
              routeId: 1,
            }),
          });
          const data = await res.json();
          console.log(data);
        }}
        className="!bg-red-500 !py-2 !px-4 !rounded-md text-white"
      >
        미션 하나 시작하기(HTTPS)
      </Button>
      <Button
        onClick={async () => {
          const res = await fetch(`${API_URL_HTTP}/mission/in-progress`, {
            method: "POST",
            body: JSON.stringify({
              userId: "admin",
              routeId: 1,
            }),
          });
          const data = await res.json();
          console.log(data);
        }}
        className="!bg-red-500 !py-2 !px-4 !rounded-md text-white"
      >
        미션 하나 시작하기(HTTP)
      </Button>

      <Button
        onClick={async () => {
          const res = await fetch(`${API_URL_HTTPS}/mission/check-point`, {
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
        className="!bg-red-500 !py-2 !px-4 !rounded-md text-white"
      >
        체크포인트완료요청(HTTPS)
      </Button>
      <Button
        onClick={async () => {
          const res = await fetch(`${API_URL_HTTP}/mission/check-point`, {
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
        className="!bg-red-500 !py-2 !px-4 !rounded-md text-white"
      >
        체크포인트완료요청(HTTP)
      </Button>
    </div>
  );
};

export default Page;
