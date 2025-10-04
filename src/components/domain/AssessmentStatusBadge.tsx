import type { AssessmentStatus } from "../../types/assessment";

interface Props {
  status: AssessmentStatus;
}

const statusPairs: {
  [key in Props["status"]]: { text: string; color: string };
} = {
  draft: { text: "Rascunho", color: "text-gray-500 bg-gray-200" },
  scheduled: { text: "Agendado", color: "text-blue-500 bg-blue-100" },
  open: { text: "Aberto", color: "text-green-500 bg-green-100" },
  closed: { text: "Fechado", color: "text-red-500 bg-red-100" },
  under_review: { text: "Em Correção", color: "text-yellow-600 bg-yellow-100" },
  graded: { text: "Avaliado", color: "text-purple-500 bg-purple-100" },
  released: { text: "Liberado", color: "text-teal-500 bg-teal-100" },
  archived: { text: "Arquivado", color: "text-gray-400 bg-gray-200" },
  cancelled: { text: "Cancelado", color: "text-red-400 bg-red-200" },
};

const AssessmentStatusBadge = ({ status }: Props) => {
  const { text, color } = statusPairs[status];
  return (
    <div
      className={`${color} inline-flex rounded-full px-3 py-1 text-sm font-semibold`}
    >
      {text}
    </div>
  );
};
export default AssessmentStatusBadge;
