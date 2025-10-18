import type { AssessmentStatus } from "../../types/assessment";
import { useNavigate } from "react-router-dom";
import { useAssessmentMutation } from "../../hooks/useAssessmentMutation";

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
  const navigate = useNavigate();

  const { mutateStartGrading, mutateFinishGrading, mutateClose, isPending } =
    useAssessmentMutation(id, classroomId);

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
      {status === "draft" && (
        <ActionButton
          title="Fechar Avaliação"
          onClick={mutateClose}
          icon="folder_check"
        />
      )}
    </div>
  );
};

export default AssessmentActions;
