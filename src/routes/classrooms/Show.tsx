import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { getClassroomById } from "../../api/classrooms";

const ShowClassroomPage = () => {
  const { classroomId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["classroom", classroomId],
    queryFn: () => getClassroomById(classroomId!),
  });

  if (isLoading) return <div>Loading...</div>;

  if (!data) return <div>Classroom not found</div>;

  return (
    <>
      <h1 className="font-cinzel text-4xl font-bold">{data.name}</h1>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600">
        <span className="border-r border-primary/30 pr-4">
          Semestre:{" "}
          <span className="font-semibold text-gray-800">{data.semester}</span>
        </span>
        <span className="border-r border-primary/30 pr-4">
          Ano: <span className="font-semibold text-gray-800">{data.year}</span>
        </span>
        <span className="border-r border-primary/30 pr-4">
          Código:{" "}
          <span className="font-semibold text-gray-800">{data.code}</span>
        </span>
        <span>
          Curso:{" "}
          <span className="font-semibold text-gray-800">{data.courseName}</span>
        </span>
      </div>
      <div className="fixed bottom-12 right-16 z-10">
        <div className="flex flex-col items-end gap-4 group">
          <div className="hidden group-hover:flex flex-col items-end gap-3 mb-2 transition-all duration-300 opacity-0 group-hover:opacity-100">
            <button className="bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm border border-primary/30 text-primary font-bold py-2 px-4 rounded-lg flex items-center gap-2 shadow-lg hover:bg-primary/10 dark:hover:bg-primary/20 active:translate-y-px transition-all">
              <svg
                className="bi bi-pencil-square"
                fill="currentColor"
                height="20"
                viewBox="0 0 16 16"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.121l6.813-6.813z"></path>
                <path
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11A1.5 1.5 0 0 0 15 13.5V6h-1v7.5a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5V2.5a.5.5 0 0 1 .5-.5H9v-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                  fill-rule="evenodd"
                ></path>
              </svg>
              <span>Corrigir Avaliação</span>
            </button>
            <button className="bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm border border-primary/30 text-primary font-bold py-2 px-4 rounded-lg flex items-center gap-2 shadow-lg hover:bg-primary/10 dark:hover:bg-primary/20 active:translate-y-px transition-all">
              <svg
                className="bi bi-file-earmark-plus"
                fill="currentColor"
                height="20"
                viewBox="0 0 16 16"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5z"></path>
                <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"></path>
              </svg>
              <span>Nova Atividade</span>
            </button>
            <Link
              to={"/assessments/new?classroomId=" + classroomId}
              className="bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm border border-primary/30 text-primary font-bold py-2 px-4 rounded-lg flex items-center gap-2 shadow-lg hover:bg-primary/10 dark:hover:bg-primary/20 active:translate-y-px transition-all"
            >
              <span className="material-symbols-outlined">assignment_add</span>
              <span>Nova Avaliação</span>
            </Link>
          </div>
          <button className="bg-primary text-background-dark font-bold p-4 rounded-full shadow-lg hover:bg-primary/90 active:translate-y-px transition-all focus:outline-none">
            <svg
              className="bi bi-plus-lg group-hover:rotate-45 transition-transform duration-300"
              fill="currentColor"
              height="24"
              viewBox="0 0 16 16"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                fill-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};
export default ShowClassroomPage;
