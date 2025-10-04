import { useMutation, useQueryClient } from "@tanstack/react-query";
import { startGrading } from "../../api/assessments";
import type { AssessmentStatus } from "../../types/assessment";

interface Props {
  status: AssessmentStatus;
  id: number;
  classroomId: string;
}

const AssessmentActions = ({ status, id, classroomId }: Props) => {
  const queryClient = useQueryClient();

  function handleClick(e: React.MouseEvent) {
    e.stopPropagation();
    mutateStartGrading();
  }

  const { mutate: mutateStartGrading, isPending } = useMutation({
    mutationFn: () => startGrading(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assessments", classroomId] });
    },
    onError: (error) => {
      console.error("Error starting grading:", error);
      alert("Erro ao iniciar a correção. Tente novamente.");
    },
  });

  if (isPending) {
    return (
      <span className="material-symbols-outlined animate-spin text-primary">
        progress_activity
      </span>
    );
  }

  return (
    <div>
      {status === "closed" && (
        <button
          title="Iniciar Correção"
          className="cursor-pointer text-primary hover:text-amber-700"
          onClick={handleClick}
        >
          <span className="material-symbols-outlined">contract_edit</span>
        </button>
      )}
    </div>
  );
};

export default AssessmentActions;
