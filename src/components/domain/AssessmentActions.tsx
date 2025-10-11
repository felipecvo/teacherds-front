import { useMutation, useQueryClient } from "@tanstack/react-query";
import { finishGrading, startGrading } from "../../api/assessments";
import type { AssessmentStatus } from "../../types/assessment";
import { useNavigate } from "react-router-dom";

interface Props {
  status: AssessmentStatus;
  id: number;
  classroomId: string;
}

interface ActionButtonProps {
  title: string;
  onClick: () => void;
  icon: string;
}

const ActionButton = ({ title, onClick, icon }: ActionButtonProps) => {
  function handleClick(e: React.MouseEvent) {
    e.stopPropagation();
    onClick();
  }

  return (
    <button
      title={title}
      className="cursor-pointer text-primary hover:text-amber-700"
      onClick={handleClick}
    >
      <span className="material-symbols-outlined">{icon}</span>
    </button>
  );
};

const AssessmentActions = ({ status, id, classroomId }: Props) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: mutateStartGrading, isPending: isPendingStart } = useMutation(
    {
      mutationFn: () => startGrading(id),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["assessments", classroomId],
        });
      },
      onError: (error) => {
        console.error("Error starting grading:", error);
        alert("Erro ao iniciar a correção. Tente novamente.");
      },
    }
  );

  const { mutate: mutateFinishGrading, isPending: isPendingFinish } =
    useMutation({
      mutationFn: () => finishGrading(id),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["assessments", classroomId],
        });
      },
      onError: (error) => {
        console.error("Error starting grading:", error);
        alert("Erro ao iniciar a correção. Tente novamente.");
      },
    });
  const isPending = isPendingStart || isPendingFinish;

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
        <ActionButton
          title="Iniciar Correção"
          onClick={mutateStartGrading}
          icon="contract_edit"
        />
      )}
      {status === "under_review" && (
        <ActionButton
          title="Finalizar Correção"
          onClick={mutateFinishGrading}
          icon="rubric"
        />
      )}
      {status === "under_review" && (
        <ActionButton
          title="Corrigir Avaliações"
          onClick={() => navigate(`/assessments/${id}/evaluation`)}
          icon="rate_review"
        />
      )}
    </div>
  );
};

export default AssessmentActions;
