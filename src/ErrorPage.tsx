import { Link, useNavigate, useRouteError } from "react-router-dom";

type RouteError = {
  error: { status?: number; message?: string };
};

const ErrorPage = () => {
  const { error } = useRouteError() as RouteError;
  const navigate = useNavigate();

  if (error && error.status === 401) {
    navigate("/login");
  }

  console.error("ERROR PAGE", error);

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-slate-800 p-4">
      <div className="absolute inset-0 z-0">
        <img
          alt="Númenórean ruins"
          className="h-full w-full object-cover opacity-20"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyPs89DItkvbfYo5Qh9ZFnlevxi4bzxiRdVP5YId5EKmYjD7XLVpUC22uSAwPcMGhKKqWjkFm5oA1SJ3NY1MSLIyuYG5CeDPR2jxphimgI9O2Op8LWcSEhKa28_ide7fGguPxsW0gL25v3o9NL66dQYqz3JGXKJAzFqQ2aIp1NkRtE-HslPyJCbT0kUl97glC2vrwCixKbXKpXwkO12wmCKYsWOSXEAXc8IqwMGIv5ULcYRuc1_WfkSbraZICiamm0ZDqeL-O7W14"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-800 via-slate-800/20 to-transparent"></div>
      </div>
      <div className="relative z-10 flex w-full max-w-lg flex-col items-center rounded-lg bg-slate-800/50 p-8 text-center backdrop-blur-sm">
        <svg
          className="h-16 w-16 text-red-400"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
        <h1 className="font-cinzel mt-6 text-4xl font-bold text-slate-300">
          Um Erro Ocorreu
        </h1>
        <p className="mt-4 text-lg text-slate-400">
          Algo inesperado aconteceu. Por favor, tente novamente ou volte para a
          página inicial.
        </p>
        <div className="mt-8 flex w-full flex-col gap-4 sm:flex-row sm:justify-center">
          <button className="flex h-12 flex-1 items-center justify-center rounded-lg bg-red-400 px-6 text-base font-bold text-white shadow-lg transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-light">
            <span>Tentar Novamente</span>
          </button>
          <Link
            to={"/"}
            className="flex h-12 flex-1 items-center justify-center rounded-lg bg-red-400/60 px-6 text-base font-bold text-slate-300 transition-all hover:bg-primary/30 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-light"
          >
            <span>Página Inicial</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default ErrorPage;
