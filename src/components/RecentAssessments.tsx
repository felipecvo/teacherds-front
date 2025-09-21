import { useQuery } from "@tanstack/react-query";
import { getRecentAssessments } from "../api/assessments";
import AssessmentCard from "./AssessmentCard";

const RecentAssessments = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["recentAssessments"],
    queryFn: getRecentAssessments,
  });

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-600">Error loading assessments</p>}
      {data && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((assessment: any) => (
            <AssessmentCard key={assessment.id} {...assessment} />
          ))}
        </div>
      )}
    </div>
  );
};
export default RecentAssessments;
