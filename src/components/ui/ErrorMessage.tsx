import type { FieldError } from "react-hook-form";

interface Props {
  error: FieldError | undefined;
}

const ErrorMessage = ({ error }: Props) => {
  if (!error) return null;

  return <p className="text-sm text-red-600">{error.message}</p>;
};

export default ErrorMessage;
