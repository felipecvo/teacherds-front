import Card from "./ui/Card";

interface Props {
  id: string;
  selectedLevel: string;
  name: string;
  description: string;
  levels: { id: string; name: string; description: string }[];
  onSelectLevel: (id: string, levelId: string) => void;
}

const EvaluateCriterion = ({
  id,
  name,
  description,
  levels,
  selectedLevel,
  onSelectLevel,
}: Props) => {
  return (
    <Card>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-700">{name}</h3>
        <p>{description}</p>
        <div className="flex mt-4 gap-4">
          {levels.map((level) => (
            <div
              key={level.id}
              className={`border border-gray-300 p-4 rounded-md flex-1 mx-1 cursor-pointer shadow-sm hover:shadow-lg hover:scale-105 transform transition ${
                selectedLevel === level.id ? "bg-blue-200" : ""
              }`}
              onClick={() => onSelectLevel(id, level.id)}
            >
              <h4 className="font-semibold text-gray-700">{level.name}</h4>
              <p>{level.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default EvaluateCriterion;
