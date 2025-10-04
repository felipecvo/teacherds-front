import type { LoaderFunction } from "react-router-dom";
import { queryClient } from "../../utils/queryClient";
import { getRubrics } from "../../api/rubrics";

export const rubricsLoader: LoaderFunction = async () =>
  queryClient.fetchQuery({
    queryKey: ["rubrics"],
    queryFn: getRubrics,
  });
