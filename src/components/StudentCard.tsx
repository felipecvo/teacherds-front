import Card from "./ui/Card";

interface Props {
  id: number;
  name: string;
  githubUsername: string;
}

const StudentCard = ({ name, githubUsername }: Props) => {
  return (
    <Card>
      <div className="flex p-6 gap-6">
        <div className="w-12 h-12 rounded-full bg-gray-200 inline-flex items-center justify-center">
          <img
            src={`https://github.com/${githubUsername}.png`}
            alt={name}
            className="rounded-full"
          />
        </div>
        <div className="flex-col flex-1">
          <h2 className="text-2xl font-semibold text-gray-700">{name}</h2>
          <p className="text-gray-500">@{githubUsername}</p>
        </div>
      </div>
    </Card>
  );
};

export default StudentCard;
