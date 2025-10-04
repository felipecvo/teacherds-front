import { useQuery } from "@tanstack/react-query";
import type { UseFormRegister } from "react-hook-form";
import { getRubrics } from "../../api/rubrics";

type Props = ReturnType<UseFormRegister<{ rubricId: number }>>;

const RubricSelect = ({ ref, onChange, onBlur, name }: Props) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["rubrics"],
    queryFn: getRubrics,
  });

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Rubrica</label>
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
          data.map((rubric) => (
            <option value={rubric.id}>{rubric.name}</option>
          ))}
      </select>
    </div>
  );
};
export default RubricSelect;
