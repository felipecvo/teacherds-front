import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getAssessment } from "../../api/assessments";
import Markdown from "react-markdown";
import AssessmentStatusBadge from "../../components/domain/AssessmentStatusBadge";
import StudentGrades from "../../components/domain/StudentGrades";

const ShowAssessmentPage = () => {
  const { assessmentId } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["assessments", assessmentId],
    queryFn: () => getAssessment(assessmentId!),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading assessment.</div>;
  if (!data) return <div>No assessment found.</div>;

  console.log(data);
  return (
    <div className="space-y-4">
      <h1 className="font-cinzel text-2xl font-bold mb-4">{data.title}</h1>
      <Markdown>{data.description}</Markdown>
      <AssessmentStatusBadge status={data.status} />
      <div className="inline-flex items-center rounded-full border border-gray-200 px-2 py-0.5 text-xs font-semibold text-gray-800">
        {data.type === "individual" ? `Individual` : `Group`} Assessment
      </div>
      <StudentGrades assessmentId={data.id} />
    </div>
  );
};

export default ShowAssessmentPage;
