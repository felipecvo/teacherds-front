import type { LoaderFunction } from "react-router-dom";
import { queryClient } from "../utils/queryClient";
import { getClassrooms } from "../api/classrooms";

export const classroomsLoader: LoaderFunction = async () => {
  return queryClient.fetchQuery({
    queryKey: ["classroomList"],
    queryFn: async () => {
      return getClassrooms();
    },
  });
};
