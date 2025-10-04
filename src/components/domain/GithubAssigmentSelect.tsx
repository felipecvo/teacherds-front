import { useQuery } from "@tanstack/react-query";
import type { UseFormRegister } from "react-hook-form";
import { getGithubAssignmentsByClassroom } from "../../api/github";

type Props = {
  classroomId: number;
} & ReturnType<UseFormRegister<{ githubClassRoomAssignmentId: string }>>;

const GithubAssignmentSelect = ({
  ref,
  onChange,
  onBlur,
  name,
  classroomId,
}: Props) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["githubAssignments", classroomId],
    queryFn: () => getGithubAssignmentsByClassroom(classroomId),
  });

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Github Classroom Assignment
      </label>
      <select
        ref={ref}
        disabled={!!error || isLoading}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        className="mt-1 h-10 py-2 px-4 block w-full bg- border border-primary/30 rounded-lg shadow-sm focus:ring-primary focus:border-primary text-gray-900 disabled:text-gray-400"
      >
        {isLoading && (
          <option disabled selected>
            Carregando...
          </option>
        )}
        {error && (
          <option disabled selected>
            Erro ao carregar dados
          </option>
        )}
        {data &&
          data.map((assignment) => (
            <option value={assignment.id}>{assignment.title}</option>
          ))}
      </select>
    </div>
  );
};
export default GithubAssignmentSelect;
