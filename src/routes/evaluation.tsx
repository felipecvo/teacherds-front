import { useLoaderData } from "react-router-dom";
import Card from "../components/ui/Card";
import Evaluate from "../components/Evaluate";
import { useEffect, useState } from "react";

const EvaluationPage = () => {
  const [currentEvaluation, setCurrentEvaluation] = useState(0);
  const { assessment, evaluations } = useLoaderData();
  console.log("Loaded assessment data:", assessment.title);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentEvaluation]);

  function handleNext() {
    setCurrentEvaluation((prev) =>
      prev + 1 === evaluations.length ? 0 : prev + 1
    );
  }

  function handlePrevious() {
    setCurrentEvaluation((prev) =>
      prev === 0 ? evaluations.length - 1 : prev - 1
    );
  }

  function handleSave(completed: boolean) {
    console.log(
      "Saved evaluation, completed:",
      completed,
      evaluations[currentEvaluation].id
    );
  }

  const progress = 100 * (currentEvaluation / evaluations.length);
  console.log(assessment);

  return (
    <div className="flex flex-col gap-6">
      <div>
        voltar / student {currentEvaluation + 1} of {evaluations.length}
      </div>
      <Card>
        <div className="flex p-6">
          <div className="flex-col flex-1">
            <h2 className="text-2xl font-semibold text-gray-700">
              {assessment.title}
            </h2>
            <p>{assessment.classroom.name}</p>
            <p
              className="text-gray-400 italic"
              onClick={(e) =>
                navigator.clipboard.writeText(e.currentTarget.textContent)
              }
            >
              gh classroom clone student-repos -a{" "}
              {assessment.githubClassRoomAssignmentId}
            </p>
          </div>
          <div>
            <div className="inline-flex items-center rounded-full border border-gray-200 px-2 py-0.5 text-xs font-semibold text-gray-800">
              {assessment.type === "individual" ? `Individual` : `Group`}{" "}
              Assessment
            </div>
          </div>
        </div>
      </Card>
      <Card>
        <div className="p-6">
          <div className="flex text-[#1d2530]">
            <div className="flex-1">Evaluation Progress</div>
            <div>{progress.toFixed(0)}%</div>
          </div>

          <div className="relative h-4 w-full overflow-hidden rounded-full bg-gray-200 my-2">
            <div
              className="h-full w-full flex-1 bg-blue-900"
              style={{ transform: `translateX(-${100 - progress}%)` }}
            ></div>
          </div>
        </div>
      </Card>
      <Evaluate
        key={evaluations[currentEvaluation].id}
        id={evaluations[currentEvaluation].id}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onSave={handleSave}
      />
    </div>
  );
};

export default EvaluationPage;
