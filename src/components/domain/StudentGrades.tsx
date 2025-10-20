import { useQuery } from "@tanstack/react-query";
import { getAssessmentGrades } from "../../api/assessments";
import { useNavigate } from "react-router-dom";

interface Props {
  assessmentId: number;
}
const StudentGrades = ({ assessmentId }: Props) => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["studentGrades", assessmentId],
    queryFn: () => getAssessmentGrades(assessmentId),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError)
    return <div className="text-red-500">Erro ao carregar notas.</div>;
  if (!data || data.length === 0)
    return <div>Nenhum estudante foi avaliado nesta avaliação.</div>;

  return (
    <table className="w-full">
      <thead className="bg-primary/10 font-bold text-stone-700 tracking-wider">
        <tr>
          <th className="py-4">RM</th>
          <th>Nome</th>
          <th>Nota</th>
          <th>Feedback</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-primary/10 dark:divide-primary/20">
        {data.map((row) => (
          <tr
            key={row.id}
            className="text-base font-medium text-stone-800 hover:cursor-pointer hover:bg-primary/5"
            onClick={() => navigate(`/grades/${row.id}`)}
          >
            <td className="px-6 py-5">{row.registrationNumber}</td>
            <td className="px-6 py-5 text-sm whitespace-nowrap">
              {row.studentName}
            </td>
            <td className="text-center px-6 py-5">{row.finalScore}</td>
            <td className="px-6 py-5">{row.feedbackDraft}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StudentGrades;
