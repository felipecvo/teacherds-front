import { useQuery } from "@tanstack/react-query";
import { getCourses } from "../../api/course";
import type { UseFormRegister } from "react-hook-form";

type Props = ReturnType<UseFormRegister<{ courseId: number }>>;

const CourseSelect = ({ ref, onChange, onBlur, name }: Props) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["courses"],
    queryFn: getCourses,
  });

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Curso</label>
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
          data.map((course) => (
            <option value={course.id}>{course.name}</option>
          ))}
      </select>
    </div>
  );
};
export default CourseSelect;
