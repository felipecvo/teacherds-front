import z from "zod";
import ClassroomSelect from "../../components/domain/ClassroomSelect";
import InputField from "../../components/ui/InputField";
import SectionCard from "../../components/ui/SectionCard";
import TextareaField from "../../components/ui/TextareaField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import RubricSelect from "../../components/domain/RubricSelect";
import GithubAssignmentSelect from "../../components/domain/GithubAssigmentSelect";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { postAssessment } from "../../api/assessments";

const schema = z.object({
  classroomId: z.number().gt(0),
  title: z.string().min(3),
  description: z.string().min(10),
  type: z.enum(["individual", "group"]),
  githubClassRoomAssignmentId: z.string().min(1),
  rubricId: z.number().gt(0),
  code: z.string().min(3),
});

type FormData = z.infer<typeof schema>;

const AssessmentFormPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const qeu = searchParams.get("classroomId")
    ? Number(searchParams.get("classroomId"))
    : undefined;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: "individual",
      classroomId: qeu,
    },
  });
  const classroomId = watch("classroomId");

  const { mutate } = useMutation({
    mutationFn: postAssessment,
    onSuccess: () => {
      // toast.success("Avaliação criada com sucesso!");
      navigate(-1);
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    mutate(data);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="font-cinzel text-3xl font-bold">Criar Avaliação</h1>
      <SectionCard>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ClassroomSelect
            {...register("classroomId", { valueAsNumber: true })}
          />

          <InputField
            label="Título da Avaliação"
            id="titulo-avaliacao"
            placeholder="Ex: Prova Final"
            type="text"
            {...register("title")}
          />
          <TextareaField
            className="md:col-span-2"
            label="Descrição"
            id="descricao"
            placeholder="Descreva os detalhes da avaliação"
            rows={4}
            {...register("description")}
          />
          <div className="md:col-span-2">
            <span className="block text-sm font-medium text-slate-600 mb-2">
              Tipo
            </span>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer p-4 border border-white/20 rounded-lg has-[:checked]:border-primary has-[:checked]:bg-primary/20 flex-1 justify-center transition-all">
                <input
                  className=" text-primary focus:ring-primary"
                  type="radio"
                  value="individual"
                  {...register("type")}
                />
                <span className="text-slate-600">Individual</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer p-4 border border-white/20 rounded-lg has-[:checked]:border-primary has-[:checked]:bg-primary/20 flex-1 justify-center transition-all">
                <input
                  className="form-radio text-primary focus:ring-primary"
                  type="radio"
                  value="group"
                  {...register("type")}
                />
                <span className="text-slate-600">Em Grupo</span>
              </label>
            </div>
          </div>
          <GithubAssignmentSelect
            classroomId={classroomId}
            {...register("githubClassRoomAssignmentId")}
          />
          <RubricSelect {...register("rubricId", { valueAsNumber: true })} />
          <InputField
            label="Código da Avaliação"
            id="codigo-avaliacao"
            placeholder="Gere ou insira um código"
            type="text"
            {...register("code")}
          />
        </div>
      </SectionCard>

      {errors && (
        <div className="mt-4">
          {Object.values(errors).map((error) => (
            <p key={error.message} className="text-red-500">
              {error.message}
            </p>
          ))}
        </div>
      )}
      <div className="flex justify-end gap-4 pt-6">
        <button
          className="px-6 py-3 rounded-lg bg-white/10 dark:bg-white/10 hover:bg-white/20 dark:hover:bg-white/20 text-slate-600 font-bold transition-colors"
          type="button"
        >
          Cancelar
        </button>
        <button
          className="px-6 py-3 rounded-lg bg-primary hover:bg-primary/90 text-slate-900 font-bold transition-colors"
          type="submit"
        >
          Salvar Avaliação
        </button>
      </div>
    </form>
  );
};
export default AssessmentFormPage;
