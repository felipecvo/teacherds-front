import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getEvaluation, saveEvaluation } from "../api/evaluations";
import StudentGroup from "./StudentGroup";
import EvaluateCriterion from "./EvaluateCriterion";
import { useState } from "react";
import Card from "./ui/Card";
import StudentCard from "./StudentCard";
import type { Evaluation } from "../types/evaluation";
import type { Criterion } from "../types/criterion";
import type { CriterionLevel } from "../types/criterionLevel";
import EvaluationPenalty from "./EvaluationPenalty";

interface Props {
  id: number;
  onNext: () => void;
  onPrevious: () => void;
  onSave: (completed: boolean) => void;
}

const Evaluate = ({ id, onNext, onPrevious, onSave }: Props) => {
  const [show, setShow] = useState(false);
  const [criteria, setCriteria] = useState<{ [key: string]: number }>({});
  const [penalties, setPenalties] = useState<number[]>([]);
  const [feedback, setFeedback] = useState("");
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: { id: number; payload: Evaluation }) =>
      saveEvaluation(data.id, data.payload),
    onSuccess: () => {
      setShow(true);
      setTimeout(() => setShow(false), 3_000);
      console.log("Evaluation saved successfully");
      queryClient.invalidateQueries({ queryKey: ["evaluation", id] });
    },
    onError: (error) => {
      console.error("Error saving evaluation:", error);
    },
  });

  const { data, isLoading, error } = useQuery<Evaluation>({
    queryKey: ["evaluation", id],
    queryFn: async () => getEvaluation(id),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading evaluation</div>;

  function onSelectLevel(criterionId: number, levelId: number) {
    setCriteria((prev) => ({ ...prev, [criterionId]: levelId }));
  }

  function handlePenalty(id: number, flagged: boolean) {
    if (flagged) {
      setPenalties((prev) => [...prev, id]);
    } else {
      setPenalties((prev) => prev.filter((item) => item !== id));
    }
  }

  function computePoints(c: Criterion): number {
    const selectedLevel = c.levels.find(
      (l: CriterionLevel) => l.id === criteria[c.id]
    );

    if (!selectedLevel) return 0;

    return c.points * selectedLevel.weight;
  }

  function handleSave(completed: boolean) {
    console.log("handleSave", completed);
    const payload: Evaluation = {
      scores: data!.rubric!.criteria.map((c: Criterion) => ({
        criterion: { id: c.id },
        criterionLevel: { id: criteria[c.id] },
        evaluation: { id },
        points: computePoints(c),
        feedbackDraft: "",
        feedbackRefined: "",
        feedbackFinal: "",
      })),
      penalties: data!
        .rubric!.penalties.map((penalty) => {
          if (penalties.includes(penalty.id)) {
            return {
              evaluation: { id },
              penalty: { id: penalty.id },
              feedback: "",
              points: penalty.points,
            };
          } else {
            return null;
          }
        })
        .filter((item) => item !== null),
      feedback,
    };

    mutate({ id, payload });
  }

  if (!data) return null;

  return (
    <div className="space-y-6">
      {show && (
        <div className="fixed bottom-4  left-1/2 transform -translate-x-1/2 z-50 animate-slide-up">
          <div className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg">
            ✅ Saved successfully!
          </div>
        </div>
      )}
      {data.studentGroup && <StudentGroup {...data.studentGroup} />}
      {data.student && <StudentCard {...data.student} />}
      {data.rubric!.criteria.map((criterion: Criterion) => (
        <EvaluateCriterion
          key={criterion.id.toString()}
          {...criterion}
          onSelectLevel={onSelectLevel}
          selectedLevel={criteria[criterion.id]}
        />
      ))}
      {data.rubric!.penalties.map((penalty) => (
        <EvaluationPenalty
          key={penalty.id.toString()}
          {...penalty}
          onPenalty={handlePenalty}
          checked={penalties.includes(penalty.id)}
        />
      ))}
      <Card>
        <div className="p-6">
          <h2 className="font-semibold text-2xl text-gray-700">
            Final Feedback
          </h2>
          <p>Provide overall comments for this assessment</p>
          <textarea
            className="w-full mt-4 p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </div>
      </Card>
      <div className="flex justify-between">
        <button className="green-button" onClick={onPrevious}>
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
            className="green-button bg-transparent text-gray-500"
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
          <button
            className="green-button"
            onClick={() => handleSave(true)}
            disabled={isPending}
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
          className="green-button bg-blue-900 hover:bg-blue-900/80"
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
