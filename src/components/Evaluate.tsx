import { useQuery } from "@tanstack/react-query";
import { getEvaluation } from "../api/evaluations";
import StudentGroup from "./StudentGroup";
import EvaluateCriterion from "./EvaluateCriterion";
import { useState } from "react";
import Card from "./ui/Card";

interface Props {
  id: number;
  onNext: () => void;
  onPrevious: () => void;
  onSave: (completed: boolean) => void;
}

const Evaluate = ({ id, onNext, onPrevious, onSave }: Props) => {
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
      <Card>
        <div className="p-6">
          <h2 className="font-semibold text-2xl text-gray-700">
            Final Feedback
          </h2>
          <p>Provide overall comments for this assessment</p>
          <textarea className="w-full mt-4 p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
        </div>
      </Card>
      <div className="flex justify-between">
        <button className="primary-button" onClick={onPrevious}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="h-4 w-4 mr-2"
            data-lov-id="src/components/AssessmentEvaluation.tsx:290:10"
            data-lov-name="ArrowLeft"
            data-component-path="src/components/AssessmentEvaluation.tsx"
            data-component-line="290"
            data-component-file="AssessmentEvaluation.tsx"
            data-component-name="ArrowLeft"
            data-component-content="%7B%22className%22%3A%22h-4%20w-4%20mr-2%22%7D"
          >
            <path d="m12 19-7-7 7-7"></path>
            <path d="M19 12H5"></path>
          </svg>
          Previous Student
        </button>
        <div className="space-x-4">
          <button
            className="primary-button bg-transparent text-gray-500"
            onClick={() => onSave(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="h-4 w-4 mr-2"
              data-lov-id="src/components/AssessmentEvaluation.tsx:296:12"
              data-lov-name="Save"
              data-component-path="src/components/AssessmentEvaluation.tsx"
              data-component-line="296"
              data-component-file="AssessmentEvaluation.tsx"
              data-component-name="Save"
              data-component-content="%7B%22className%22%3A%22h-4%20w-4%20mr-2%22%7D"
            >
              <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"></path>
              <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"></path>
              <path d="M7 3v4a1 1 0 0 0 1 1h7"></path>
            </svg>
            Save Progress
          </button>
          <button className="primary-button" onClick={() => onSave(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="h-4 w-4"
              data-lov-id="src/components/AssessmentEvaluation.tsx:300:12"
              data-lov-name="CheckCircle"
              data-component-path="src/components/AssessmentEvaluation.tsx"
              data-component-line="300"
              data-component-file="AssessmentEvaluation.tsx"
              data-component-name="CheckCircle"
              data-component-content="%7B%22className%22%3A%22h-4%20w-4%20mr-2%22%7D"
            >
              <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
              <path d="m9 11 3 3L22 4"></path>
            </svg>
            Complete Evaluation
          </button>
        </div>
        <button
          className="primary-button bg-blue-900 hover:bg-blue-900/80"
          onClick={onNext}
        >
          Next Student
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="h-4 w-4 ml-2"
            data-lov-id="src/components/AssessmentEvaluation.tsx:310:10"
            data-lov-name="ArrowRight"
            data-component-path="src/components/AssessmentEvaluation.tsx"
            data-component-line="310"
            data-component-file="AssessmentEvaluation.tsx"
            data-component-name="ArrowRight"
            data-component-content="%7B%22className%22%3A%22h-4%20w-4%20ml-2%22%7D"
          >
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};
export default Evaluate;
