import type { LoaderFunction } from "react-router-dom";
import { queryClient } from "../utils/queryClient";
import { getEvaluations } from "../api/evaluations";

export const evaluationLoader: LoaderFunction = async ({ params }) => {
  console.log("Loader called with params:", params);
  return queryClient.fetchQuery({
    queryKey: ["evaluationData", params.assessmentId],
    queryFn: async () => {
      console.log("Fetching assessment in loader", params.assessmentId);
      return getEvaluations(params.assessmentId!);
    },
  });
};
