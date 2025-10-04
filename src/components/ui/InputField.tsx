type Props = {
  label: string;
  id: string;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const InputField = ({ id, label, className, ...props }: Props) => {
  return (
    <div className={className}>
      <label
        className="block text-sm font-bold text-slate-600 mb-2"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        id={id}
        className="w-full px-4 py-2 rounded-lg border-slate-200 bg-gray-200 focus:ring-2 focus:ring-primary focus:border-primary placeholder-slate-400 text-slate-600 transition duration-300 shadow-inner focus:shadow-gold-glow"
        {...props}
      />
    </div>
  );
};

export default InputField;
