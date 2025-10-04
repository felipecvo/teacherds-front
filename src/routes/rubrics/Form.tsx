import z from "zod";
import InputField from "../../components/ui/InputField";
import SectionCard from "../../components/ui/SectionCard";
import TextareaField from "../../components/ui/TextareaField";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CriterionLevelsForm from "../../components/domain/CriterionLevelsForm";
import { useRubrics } from "../../hooks/useRubrics";
import { useNavigate } from "react-router-dom";

interface Props {
  mode: "new" | "edit";
}

const schema = z.object({
  id: z.number().optional(),
  name: z.string().min(1),
  totalPoints: z.number().gt(0).lte(100),
  description: z.string().min(1),
  notes: z.string().min(1),
  criteria: z
    .array(
      z.object({
        id: z.number().optional(),
        name: z.string().min(1),
        description: z.string().min(1),
        points: z.number().gt(0),
        levels: z
          .array(
            z.object({
              id: z.number().optional(),
              name: z.string().min(1),
              description: z.string().min(1),
              weight: z.number().gte(0),
            })
          )
          .min(1),
      })
    )
    .min(1),
  penalties: z.array(
    z.object({
      id: z.number().optional(),
      name: z.string().min(1),
      description: z.string().min(1),
      points: z.number().lt(0),
    })
  ),
});

type FormData = z.infer<typeof schema>;

const RubricForm = ({ mode }: Props) => {
  const navigate = useNavigate();

  const { create, update } = useRubrics({
    onSuccess: () => {
      navigate("/rubrics");
    },
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      criteria: [
        {
          name: "",
          description: "",
          points: 0,
          levels: [{ name: "", description: "", weight: 0.0 }],
        },
      ],
    },
    resolver: zodResolver(schema),
  });
  const {
    fields: criteriaFields,
    append: addCriteria,
    remove: removeCriteria,
  } = useFieldArray({
    control,
    name: "criteria",
  });

  const {
    fields: penaltyFields,
    append: addPenalty,
    remove: removePenalty,
  } = useFieldArray({
    control,
    name: "penalties",
  });

  function onSubmit(data: FormData) {
    console.log(data);

    if (mode === "new") {
      create(data);
    } else {
      update(data);
    }
  }

  return (
    <div className="space-y-16">
      <div className="text-center">
        <h2 className="font-cinzel text-4xl font-bold">Cadastro de Rubrica</h2>
        <p className="mt-4 text-lg text-subtle-dark">
          Forje uma nova rubrica, digna dos escribas de outrora.
        </p>
      </div>

      <SectionCard>
        <h3 className="font-cinzel text-2xl font-semibold font-display mb-6 border-b-2 border-primary pb-4 text-primary tracking-wide">
          Detalhes da Rubrica
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <InputField
            className="md:col-span-2"
            label="Nome da Rubrica"
            id="rubric-name"
            placeholder="Ex: A Saga do Conhecimento"
            type="text"
            {...register("name")}
          />
          <InputField
            label="Pontos Totais"
            id="rubric-points"
            placeholder="Ex: 100"
            type="number"
            error={errors.totalPoints}
            {...register("totalPoints", { valueAsNumber: true })}
          />
          <TextareaField
            className="md:col-span-2"
            label="Descrição"
            id="rubric-description"
            placeholder="Descreva o propósito e os mistérios desta rubrica"
            rows={4}
            {...register("description")}
          />
          <TextareaField
            className="md:col-span-2"
            label="Notas"
            id="rubric-notes"
            placeholder="Segredos e instruções adicionais"
            rows={3}
            {...register("notes")}
          />
        </div>
      </SectionCard>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-cinzel text-2xl font-semibold font-display text-primary tracking-wide">
            Critérios de Avaliação
          </h3>
          <button
            className="secondary-button"
            onClick={() =>
              addCriteria({
                name: "",
                description: "",
                points: 0,
                levels: [{ name: "", description: "", weight: 0.0 }],
              })
            }
          >
            <span className="material-symbols-outlined text-base">add</span>
            Adicionar Critério
          </button>
        </div>
        <div className="space-y-6">
          {criteriaFields.map((field, index) => (
            <SectionCard key={field.id}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <InputField
                  label="Nome do Critério"
                  placeholder="Ex: Profundidade da Análise"
                  type="text"
                  id={`criteria.${index}.name`}
                  {...register(`criteria.${index}.name`)}
                />
                <InputField
                  label="Pontos"
                  placeholder="Ex: 30"
                  type="number"
                  id={`criteria.${index}.points`}
                  {...register(`criteria.${index}.points`, {
                    valueAsNumber: true,
                  })}
                />
                <TextareaField
                  className="md:col-span-2"
                  label="Descrição do Critério"
                  placeholder="Detalhe o que será avaliado neste pilar"
                  rows={2}
                  id={`criteria.${index}.description`}
                  {...register(`criteria.${index}.description`)}
                />
              </div>
              <div className="mt-8">
                <h4 className="text-lg font-semibold font-cinzel mb-4 text-primary tracking-wide">
                  Níveis de Critério
                </h4>
                <CriterionLevelsForm
                  control={control}
                  index={index}
                  register={register}
                />
                <button
                  className="mt-4 secondary-button"
                  onClick={() => removeCriteria(index)}
                >
                  <span className="material-symbols-outlined text-sm">
                    delete
                  </span>
                  Remover criterio
                </button>
              </div>
            </SectionCard>
          ))}
        </div>
      </section>
      <section className="space-y-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-cinzel text-2xl font-semibold font-display text-primary tracking-wide">
            Penalidades
          </h3>
          <button
            className="secondary-button"
            onClick={() =>
              addPenalty({ name: "", description: "", points: -1 })
            }
          >
            <span className="material-symbols-outlined text-base">add</span>
            Adicionar Penalidade
          </button>
        </div>
        {penaltyFields.map((field, index) => (
          <SectionCard key={field.id}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <InputField
                label="Nome da Penalidade"
                placeholder="Ex: Maldição do Atraso"
                type="text"
                id={`penalties.${index}.name`}
                {...register(`penalties.${index}.name`)}
              />
              <InputField
                label="Pontos de Penalidade"
                placeholder="Ex: -10"
                type="number"
                id={`penalties.${index}.points`}
                {...register(`penalties.${index}.points`, {
                  valueAsNumber: true,
                })}
              />
              <TextareaField
                className="md:col-span-2"
                label="Descrição da Penalidade"
                placeholder="Descreva a penalidade e suas sombrias consequências"
                rows={2}
                id={`penalties.${index}.description`}
                {...register(`penalties.${index}.description`)}
              />
            </div>
            <button
              className="mt-4 secondary-button"
              onClick={() => removePenalty(index)}
            >
              <span className="material-symbols-outlined text-sm">delete</span>
            </button>
          </SectionCard>
        ))}
      </section>
      <div className="flex justify-end pt-8 border-t-2 border-primary mt-4">
        <button
          className="primary-button"
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          {mode === "new" ? "Forjar" : "Atualizar"} Rubrica
        </button>
      </div>
    </div>
  );
};
export default RubricForm;
