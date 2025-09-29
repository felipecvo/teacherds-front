import Card from "./ui/Card";

interface Props {
  id: number;
  name: string;
  description: string;
  onPenalty: (id: number, checked: boolean) => void;
  checked: boolean;
}

const EvaluationPenalty = ({
  id,
  name,
  description,
  onPenalty,
  checked,
}: Props) => {
  return (
    <Card>
      <div className="flex items-center p-6">
        <div className="flex-1 flex-col">
          <h3 className="text-xl font-semibold text-gray-700">{name}</h3>
          <p>{description}</p>
        </div>
        <input
          className="h-8 w-8"
          type="checkbox"
          onChange={(e) => onPenalty(id, e.target.checked)}
          checked={checked}
        />
      </div>
    </Card>
  );
};
export default EvaluationPenalty;
