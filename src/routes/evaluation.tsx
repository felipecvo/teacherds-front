import { useLoaderData } from "react-router-dom";
import Card from "../components/ui/Card";
import EvaluateCriteria from "../components/EvaluateCriteria";
import Evaluate from "../components/Evaluate";
import { useState } from "react";

const EvaluationPage = () => {
  const [currentEvaluation, setCurrentEvaluation] = useState(0);
  const { assessment, evaluations } = useLoaderData();
  console.log("Loaded assessment data:", assessment.title);

  return (
    <div className="flex flex-col gap-6">
      <div>voltar / student 1 of {evaluations.length}</div>
      <Card>
        <div className="flex p-6">
          <div className="flex-col flex-1">
            <h2 className="text-2xl font-semibold text-gray-700">
              {assessment.title}
            </h2>
            <p>{assessment.classroom.name}</p>
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
            <div>17%</div>
          </div>

          <div className="relative h-4 w-full overflow-hidden rounded-full bg-gray-200 my-2">
            <div className="h-full w-full flex-1 bg-blue-900 -translate-x-[87%]"></div>
          </div>
        </div>
      </Card>
      <p>{evaluations.length}</p>
      <Evaluate id={evaluations[currentEvaluation].id} />
    </div>
  );
};

export default EvaluationPage;
