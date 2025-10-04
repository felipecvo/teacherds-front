const PrimaryButton = () => {
  return (
    <button className="flex items-center gap-2 rounded-md bg-primary/20 hover:bg-primary/30 text-primary px-4 py-2 text-sm font-bold transition duration-300 border border-primary/50 hover:border-primary shadow-md hover:shadow-gold-glow">
      <span className="material-symbols-outlined text-base">add</span>
      Adicionar Critério
    </button>
  );
};
export default PrimaryButton;
