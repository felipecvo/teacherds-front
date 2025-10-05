import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getClassroomAssessments } from "../../api/classrooms";
import { formatDate } from "../../utils/format";
import AssessmentStatusBadge from "../../components/domain/AssessmentStatusBadge";
import AssessmentActions from "../../components/domain/AssessmentActions";

const AssessmentsTab = () => {
  const navigate = useNavigate();
  const { classroomId } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["assessments", classroomId],
    queryFn: () => getClassroomAssessments(classroomId!),
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError)
    return <div className="text-red-500">Erro ao carregar avaliações.</div>;
  if (!data || data.length === 0)
    return <div>Não há avaliações cadastradas para esta turma.</div>;

  return (
    <table className="w-full">
      <thead className="bg-primary/10 font-bold text-stone-700 tracking-wider">
        <tr>
          <th className="py-4">Nome</th>
          <th>Tipo</th>
          <th>Rubrica</th>
          <th>Data aplicação</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-primary/10 dark:divide-primary/20">
        {data.map((row) => (
          <tr
            key={row.id}
            className="whitespace-nowrap text-base font-medium text-stone-800 hover:cursor-pointer hover:bg-primary/5"
            onClick={() => navigate(`/assessments/${row.id}`)}
          >
            <td className="px-6 py-5">{row.title}</td>
            <td className="text-center px-6 py-5">{row.type}</td>
            <td className="text-center px-6 py-5">{row.rubric.name}</td>
            <td className="text-center px-6 py-5">{formatDate(row.openAt)}</td>
            <td className="px-6 py-5">
              <AssessmentStatusBadge status={row.status} />
            </td>
            <td className="px-6 py-5">
              <AssessmentActions
                status={row.status}
                id={row.id}
                classroomId={classroomId!}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default AssessmentsTab;
