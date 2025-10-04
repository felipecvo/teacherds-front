import { useLoaderData, useNavigate } from "react-router-dom";
import type { Rubric } from "../../types/rubric";

const RubricsPage = () => {
  const data = useLoaderData<Rubric[]>();
  const navigate = useNavigate();

  return (
    <main className="max-w-7xl mx-auto py-8 space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="font-cinzel text-4xl font-bold tracking-tight">
          Rubricas
        </h2>
        <button className="flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary/90 focus-visible:outline-offset-2 focus-visible:outline-primary">
          <span className="material-symbols-outlined"> add </span>
          <span className="truncate">Adicionar Rubrica</span>
        </button>
      </div>
      RubricsPage: {data ? data.length : 0}
      <table className="min-w-full">
        <thead className="bg-primary/10 font-bold text-stone-700 tracking-wider">
          <tr>
            <th className="py-4">Nome</th>
            <th>Pontos</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-primary/10">
          {data.map((row) => (
            <tr
              key={row.id}
              className="text-base font-medium text-stone-800 hover:cursor-pointer hover:bg-primary/5"
              onClick={() => navigate(`/rubrics/${row.id}`)}
            >
              <td className="whitespace-nowrap  px-6 py-5">{row.name}</td>
              <td className="text-center px-6 py-5">{row.totalPoints}</td>
              <td className="px-6 py-5">{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};
export default RubricsPage;
