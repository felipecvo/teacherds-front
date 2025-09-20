import z from "zod";
import Card from "../components/ui/Card";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "../components/ui/ErrorMessage";
import { useAuth } from "../hooks/useAuth";

const schema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

type LoginForm = z.infer<typeof schema>;

const Login = () => {
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<LoginForm> = async ({ email, password }) => {
    await login(email, password);
  };

  return (
    <div className="flex flex-col max-w-md mx-auto justify-center h-screen">
      <Card>
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4 text-foreground">Login</h1>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                E-mail
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-1 px-2"
                {...register("email")}
              />
              <ErrorMessage error={errors.email} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mt-4">
                Password
              </label>
              <input
                type="password"
                className="mt-1 block w-full rounded-md border border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-1 px-2"
                {...register("password")}
              />
              <ErrorMessage error={errors.password} />
            </div>
            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              Sign In
            </button>
          </form>
        </div>
      </Card>
    </div>
  );
};
export default Login;
