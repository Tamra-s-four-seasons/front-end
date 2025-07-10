"use client";

import React from "react";
import { useRoutes } from "@/hooks/queries/useRoutes";

const Test = () => {
  const { data } = useRoutes();
  return <div>{data?.map((route) => route.routeName)}</div>;
};

export default Test;
