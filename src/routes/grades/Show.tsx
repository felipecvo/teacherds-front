import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getGrade } from "../../api/grade";
import StudentCard from "../../components/StudentCard";
import StudentGroup from "../../components/StudentGroup";

const ShowGradePage = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["grades", id],
    queryFn: () => getGrade(id!),
  });

  if (isLoading) return <div>Loading grade...</div>;
  if (isError) return <div>Error loading grade.</div>;
  if (!data) return <div>No grade found.</div>;

  return (
    <main className="flex flex-1 justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="layout-content-container flex flex-col max-w-4xl flex-1 gap-8">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex min-w-72 flex-col gap-2">
            <p className="text-[#0d141b] text-4xl font-black leading-tight tracking-[-0.033em]">
              {data.assessment.title}
            </p>
            <p className="text-[#4c739a] text-base font-normal leading-normal">
              {data.assessment.description}
            </p>
          </div>
        </div>
        {data.evaluation.studentGroup && (
          <StudentGroup {...data.evaluation.studentGroup} />
        )}
        {data.evaluation.student && (
          <StudentCard {...data.evaluation.student} />
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2 rounded-xl p-6 border border-[#cfdbe7] bg-white">
            <p className="text-[#0d141b] text-base font-medium leading-normal">
              Overall Status
            </p>
            <p className="text-green-600 tracking-light text-2xl font-bold leading-tight">
              {data.assessment.status}
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded-xl p-6 border border-[#cfdbe7] bg-white">
            <p className="text-[#0d141b] text-base font-medium leading-normal">
              Final Score
            </p>
            <p className="text-primary tracking-light text-2xl font-bold leading-tight">
              {data.finalScore}/{data.assessment.rubric.totalPoints}
            </p>
          </div>
        </div>
        <div>
          <h2 className="text-[#0d141b] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
            Critérios
          </h2>
          <div className="overflow-x-auto">
            <div className="flex overflow-hidden rounded-lg border border-[#cfdbe7] bg-white">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="px-6 py-4 text-left text-[#0d141b] text-sm font-medium leading-normal w-1/4">
                      Critério
                    </th>
                    <th className="px-6 py-4 text-left text-[#0d141b] text-sm font-medium leading-normal w-1/2">
                      Descrição
                    </th>
                    <th className="px-6 py-4 text-left text-[#0d141b] text-sm font-medium leading-normal w-1/4">
                      Nota
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#cfdbe7]">
                  {data.evaluation.scores.map((score) => (
                    <tr>
                      <td className="px-6 py-4 text-[#0d141b] text-sm font-normal leading-normal">
                        {score.criterion.name}
                      </td>
                      <td className="px-6 py-4 text-[#4c739a] text-sm font-normal leading-normal">
                        <strong>{score.criterionLevel.name}</strong> -{" "}
                        {score.criterionLevel.description}
                      </td>
                      <td className="px-6 py-4 text-[#0d141b] text-sm font-medium leading-normal">
                        {score.points}/{score.criterion.points}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-[#0d141b] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
            Penalidades
          </h2>
          <div className="overflow-x-auto">
            <div className="flex overflow-hidden rounded-lg border border-[#cfdbe7] bg-white">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="px-6 py-4 text-left text-[#0d141b] text-sm font-medium leading-normal w-3/4">
                      Penalidade
                    </th>
                    <th className="px-6 py-4 text-left text-[#0d141b] text-sm font-medium leading-normal w-1/4">
                      Pontos subtraídos
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#cfdbe7]">
                  {data.evaluation.penalties.map((penalty) => (
                    <tr>
                      <td className="px-6 py-4 text-[#4c739a] text-sm font-normal leading-normal">
                        {penalty.penalty.name}
                      </td>
                      <td className="px-6 py-4 text-red-600 text-sm font-medium leading-normal">
                        {penalty.points}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-[#0d141b] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
            Feedback
          </h2>
          <div className="rounded-xl border border-primary/30 bg-primary/10 dark:bg-primary/20 p-6">
            <p className="text-[#0d141b] text-base font-normal leading-relaxed">
              {data.feedbackDraft}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};
export default ShowGradePage;
