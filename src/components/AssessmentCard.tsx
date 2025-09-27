import { Link } from "react-router-dom";
import Card from "./ui/Card";

interface Props {
  title: string;
  description: string;
  id: number;
  type: string;
  classroom: string;
}
const AssessmentCard = ({ title, description, id, classroom }: Props) => {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
      <p>
        {classroom} - {description}
      </p>
      <Link to={`/assessments/${id}/evaluation`} className="primary-button">
        Start Evaluation
      </Link>
    </Card>
  );
};
export default AssessmentCard;
