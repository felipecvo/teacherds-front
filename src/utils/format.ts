export const formatDate = (dataISO: string | undefined) => {
  if (!dataISO) return "";

  const data = new Date(dataISO);
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(data);
};
