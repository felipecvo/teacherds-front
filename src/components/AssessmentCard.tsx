import { Link } from "react-router-dom";
import Card from "./ui/Card";

interface Props {
  title: string;
  description: string;
  id: number;
  type: string;
}
const AssessmentCard = ({ title, description, id, type }: Props) => {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">{title}</h2>
      <p>{description}</p>
      <Link to={`/assessments/${id}/evaluation`} className="primary-button">
        Start Evaluation
      </Link>
    </Card>
  );
};
export default AssessmentCard;
