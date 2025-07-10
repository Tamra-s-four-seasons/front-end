import { useQuery } from "@tanstack/react-query";

import { getAllRoutesAction } from "@/actions/routes";

export const useRoutes = () => {
  return useQuery({
    queryKey: ["routes"],
    queryFn: async () => {
      const data = await getAllRoutesAction();
      return data;
    },
    staleTime: Infinity,
  });
};
