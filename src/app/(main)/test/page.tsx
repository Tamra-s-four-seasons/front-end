import React from "react";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { mockRouteData } from "@/constants/mock-data";
import Test from "@/components/test/test";

const prefetchAllRoutes = async (queryClient: QueryClient) => {
  const getAllRoutes = async () => {
    console.log("get all routes rsc");
    return mockRouteData;
  };
  await queryClient.prefetchQuery({
    queryKey: ["routes"],
    queryFn: getAllRoutes,
  });
};

const CollectionPage = async () => {
  const queryClient = new QueryClient();
  await prefetchAllRoutes(queryClient);
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Test />
    </HydrationBoundary>
  );
};

export default CollectionPage;
