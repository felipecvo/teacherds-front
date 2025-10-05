import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./ErrorPage";
import Index from "./routes";
import Login from "./routes/login";
import { AuthProvider } from "./providers/AuthProvider";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import EvaluationPage from "./routes/evaluation";
import { queryClient } from "./utils/queryClient";
import { evaluationLoader } from "./routes/evaluation.loader";
import ClassroomsPage from "./routes/classrooms";
import { classroomsLoader } from "./routes/classrooms.loader";
import NewClassroomPage from "./routes/new-classroom";
import RubricsPage from "./routes/rubrics";
import { rubricsLoader } from "./routes/rubrics/loader";
import RubricForm from "./routes/rubrics/Form";
import ShowClassroomPage from "./routes/classrooms/Show";
import AssessmentFormPage from "./routes/assessments/Form";
import ShowAssessmentPage from "./routes/assessments/Show";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "assessments/:assessmentId/evaluation",
        element: <EvaluationPage />,
        loader: evaluationLoader,
      },
      {
        path: "assessments/:assessmentId",
        element: <ShowAssessmentPage />,
      },
      {
        path: "classrooms",
        children: [
          {
            index: true,
            element: <ClassroomsPage />,
            loader: classroomsLoader,
          },
          {
            path: "new",
            element: <NewClassroomPage />,
          },
          {
            path: ":classroomId/*",
            element: <ShowClassroomPage />,
          },
        ],
      },
      {
        path: "rubrics",
        children: [
          {
            index: true,
            element: <RubricsPage />,
            loader: rubricsLoader,
          },
          {
            path: "new",
            element: <RubricForm mode="new" />,
          },
        ],
      },
      {
        path: "assessments/new",
        element: <AssessmentFormPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
