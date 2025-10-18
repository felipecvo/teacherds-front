import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  closeAssessment,
  finishGrading,
  startGrading,
} from "../api/assessments";

export const useAssessmentMutation = (
  id: number,
  classroomId: number | string,
  onSuccess?: () => void,
  onError?: () => void
) => {
  function handleError(error: Error) {
    console.error("Error starting grading:", error);
    alert("Erro ao iniciar a correção. Tente novamente.");
    onError?.();
  }

  function handleSucces() {
    queryClient.invalidateQueries({
      queryKey: ["assessments", classroomId],
    });
    onSuccess?.();
  }

  const queryClient = useQueryClient();

  const { mutate: mutateStartGrading, isPending: isPendingStart } = useMutation(
    {
      mutationFn: () => startGrading(id),
      onSuccess: handleSucces,
      onError: handleError,
    }
  );

  const { mutate: mutateFinishGrading, isPending: isPendingFinish } =
    useMutation({
      mutationFn: () => finishGrading(id),
      onSuccess: handleSucces,
      onError: handleError,
    });

  const { mutate: mutateClose, isPending: isPendingClose } = useMutation({
    mutationFn: () => closeAssessment(id),
    onSuccess: handleSucces,
    onError: handleError,
  });

  const isPending = isPendingStart || isPendingFinish || isPendingClose;

  return {
    mutateStartGrading,
    mutateFinishGrading,
    mutateClose,
    isPending,
  };
};
