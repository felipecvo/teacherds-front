import { Link, useLoaderData } from "react-router-dom";
import type { Classroom } from "../types/classroom";

const ClassroomsPage = () => {
  const data = useLoaderData<Classroom[]>();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold tracking-tighter text-stone-800 ">
          Turmas
        </h1>
        <Link
          to="/classrooms/new"
          className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 active:scale-95"
        >
          <span className="material-symbols-outlined">add</span>
          Adicionar Nova Turma
        </Link>
      </div>

      <table className="w-full">
        <thead className="bg-primary/10 font-bold text-stone-700 tracking-wider">
          <tr>
            <th className="py-4">Nome da Turma</th>
            <th>Semestre</th>
            <th>Ano</th>
            <th>Código</th>
            <th>Curso</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-primary/10 dark:divide-primary/20">
          {data.map((row) => (
            <tr className="whitespace-nowrap text-base font-medium text-stone-800">
              <td className="px-6 py-5">{row.name}</td>
              <td className="text-center px-6 py-5">{row.semester}</td>
              <td className="text-center px-6 py-5">{row.year}</td>
              <td className="text-center px-6 py-5">{row.code}</td>
              <td className="px-6 py-5">{row.courseName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClassroomsPage;
