import {
  useFieldArray,
  type ArrayPath,
  type Control,
  type FieldValues,
  type Path,
  type UseFormRegister,
} from "react-hook-form";
import TextareaField from "../ui/TextareaField";
import InputField from "../ui/InputField";

interface Props<T extends FieldValues> {
  control: Control<T>;
  index: number;
  register: UseFormRegister<T>;
}

const CriterionLevelsForm = <T extends FieldValues>({
  control,
  index,
  register,
}: Props<T>) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `criteria.${index}.levels` as ArrayPath<T>,
  });

  return (
    <div className="space-y-4">
      {fields.map((levelField, levelIndex) => (
        <div
          key={levelField.id}
          className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start p-4 bg-primary/5 rounded-md border border-primary"
        >
          <InputField
            className="md:col-span-3"
            label="Nome do Nível"
            placeholder="Ex: Lendário"
            type="text"
            id={`criteria.${index}.levels.${levelIndex}.name`}
            {...register(
              `criteria.${index}.levels.${levelIndex}.name` as Path<T>
            )}
          />
          <TextareaField
            className="md:col-span-7"
            label="Descrição"
            placeholder="Descreva as características deste patamar"
            rows={2}
            id={`criteria.${index}.levels.${levelIndex}.description`}
            {...register(
              `criteria.${index}.levels.${levelIndex}.description` as Path<T>
            )}
          />
          <InputField
            className="md:col-span-2"
            label="Peso"
            placeholder="Ex: 1.0"
            type="text"
            id={`criteria.${index}.levels.${levelIndex}.weight`}
            {...register(
              `criteria.${index}.levels.${levelIndex}.weight` as Path<T>,
              {
                valueAsNumber: true,
              }
            )}
          />
          <button
            type="button"
            className="secondary-button"
            onClick={() => remove(levelIndex)}
          >
            <span className="material-symbols-outlined text-sm">delete</span>
          </button>
        </div>
      ))}
      <button
        className="mt-4 secondary-button"
        onClick={() =>
          append({ name: "", description: "", weight: 0.0 } as T[ArrayPath<T>])
        }
      >
        <span className="material-symbols-outlined text-sm">add</span>
        Adicionar Nível
      </button>
    </div>
  );
};

export default CriterionLevelsForm;
