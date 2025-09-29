import z from "zod";
import CourseSelect from "../components/domain/CourseSelect";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postClassroom } from "../api/classrooms";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  name: z.string().min(1),
  semester: z.string(),
  year: z.coerce.number().gt(2024),
  code: z.string().min(1),
  courseId: z.coerce.number(),
  githubClassroomId: z.string(),
});

type FormData = z.infer<typeof schema>;

const NewClassroomPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { handleSubmit, register } = useForm({
    resolver: zodResolver(schema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: postClassroom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classroomList"] });
      navigate("/classrooms");
    },
    onError: (error) => {
      alert(error);
    },
  });

  function onSubmit(data: FormData) {
    console.log(data);
    mutate(data);
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Criar Turma</h1>
      <div className="space-y-6 bg-background-light rounded-xl p-8 border border-primary/20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Nome da Turma
            </label>
            <input
              className="mt-1 py-2 px-4 w-full bg-transparent border border-primary/30 rounded-lg shadow-sm focus:ring-primary focus:border-primary text-gray-900 placeholder-gray-400"
              placeholder="Ex: Turma de Matemática Avançada"
              type="text"
              {...register("name")}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Semestre
            </label>
            <select
              className="mt-1 h-10 py-2 px-4 block w-full bg- border border-primary/30 rounded-lg shadow-sm focus:ring-primary focus:border-primary text-gray-900"
              {...register("semester")}
            >
              <option value="1">Fevereiro</option>
              <option value="2">Agosto</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ano
            </label>
            <input
              className="mt-1 py-2 px-4 block w-full bg-transparent border-primary/30 border rounded-lg shadow-sm focus:ring-primary focus:border-primary text-gray-900 placeholder-gray-400"
              placeholder="Ex: 2024"
              type="number"
              min={2025}
              {...register("year")}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Código da Turma
            </label>
            <input
              className="mt-1 py-2 px-4 block w-full bg-transparent border border-primary/30 rounded-lg shadow-sm focus:ring-primary focus:border-primary text-gray-900 placeholder-gray-400"
              placeholder="Ex: 1TDSPK2025"
              type="text"
              {...register("code")}
            />
          </div>
          <CourseSelect {...register("courseId")} />
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              ID do GitHub Classroom
            </label>
            <input
              className="mt-1 py-2 px-4 block w-full bg-transparent border border-primary/30 rounded-lg shadow-sm focus:ring-primary focus:border-primary text-gray-900 placeholder-gray-400"
              placeholder="Ex: 123456"
              type="text"
              {...register("githubClassroomId")}
            />
          </div>
        </div>
        <div className="flex justify-end gap-4 pt-4">
          <button
            disabled={isPending}
            onClick={() => navigate(-1)}
            className="px-6 py-2 rounded-lg text-sm font-semibold text-gray-700 bg-gray-200  hover:bg-gray-300 transition-colors disabled:opacity-40"
          >
            Cancelar
          </button>
          <button
            disabled={true}
            onClick={handleSubmit(onSubmit)}
            className="px-6 py-2 rounded-lg text-sm font-semibold bg-primary text-white hover:opacity-90 transition-colors disabled:opacity-40"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewClassroomPage;
