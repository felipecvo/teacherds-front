import { useQuery } from "@tanstack/react-query";
import { getEvaluation } from "../api/evaluations";
import StudentGroup from "./StudentGroup";
import EvaluateCriterion from "./EvaluateCriterion";
import { useState } from "react";

interface Props {
  id: number;
}

const Evaluate = ({ id }: Props) => {
  const [criteria, setCriteria] = useState<{ [key: string]: string }>({});

  const { data, isLoading, error } = useQuery({
    queryKey: ["evaluation", id],
    queryFn: async () => getEvaluation(id),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading evaluation</div>;

  function onSelectLevel(criterionId: string, levelId: string) {
    setCriteria((prev) => ({ ...prev, [criterionId]: levelId }));
  }

  return (
    <div className="space-y-6">
      {data.studentGroup && <StudentGroup {...data.studentGroup} />}
      {data.rubric.criteria.map((criterion: any) => (
        <EvaluateCriterion
          key={criterion.id}
          {...criterion}
          onSelectLevel={onSelectLevel}
          selectedLevel={criteria[criterion.id]}
        />
      ))}
      <div className="text-gray-500">
        Evaluate {id} - {JSON.stringify(data)}
      </div>
    </div>
  );
};
export default Evaluate;
