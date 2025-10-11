import Card from "./ui/Card";

interface Props {
  name: string;
  students: {
    id: number;
    name: string;
    githubUsername: string;
    registrationNumber: string;
  }[];
}

const StudentGroup = ({ name, students }: Props) => {
  return (
    <Card>
      <div className="flex p-6 gap-6 bg-gray-100">
        <div className="w-12 h-12 rounded-full bg-gray-200 inline-flex items-center justify-center">
          {name.charAt(0)}
        </div>
        <div className="flex-col flex-1">
          <h2 className="text-2xl font-semibold text-gray-700">{name}</h2>
          <p className="text-gray-500">{students.length} students</p>
        </div>
      </div>
      {students.map((student) => (
        <div
          className="flex p-6 gap-6 border-t border-t-gray-200"
          key={student.id}
        >
          <div className="w-12 h-12 rounded-full bg-gray-200 inline-flex items-center justify-center">
            {student.name.charAt(0)}
          </div>
          <div className="flex-col flex-1">
            <h2 className="text-2xl font-semibold text-gray-700">
              {student.name}
            </h2>
            <p className="text-gray-500">
              @{student.githubUsername}{" "}
              <span className="text-gray-400">
                | {student.registrationNumber}
              </span>
            </p>
          </div>
        </div>
      ))}
    </Card>
  );
};

export default StudentGroup;
