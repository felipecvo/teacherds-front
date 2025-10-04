import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postRubric } from "../api/rubrics";

interface UseRubricsOptions {
  onSuccess?: () => void;
}

export const useRubrics = ({ onSuccess }: UseRubricsOptions = {}) => {
  const queryClient = useQueryClient();

  const { mutate: create } = useMutation({
    mutationFn: postRubric,
    onSuccess: () => {
      console.log("Rubric created successfully");
      queryClient.invalidateQueries({ queryKey: ["rubrics"] });
      onSuccess?.();
    },
  });

  const { mutate: update } = useMutation({
    mutationFn: async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Data updated:");
    },
  });

  return { create, update };
};
