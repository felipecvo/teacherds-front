import type { PropsWithChildren } from "react";

const SectionCard = ({ children }: PropsWithChildren) => {
  return (
    <section className="bg-zinc-100 p-6 lg:p-8 rounded-lg border border-slate-200 shadow-xl">
      {children}
    </section>
  );
};
export default SectionCard;
