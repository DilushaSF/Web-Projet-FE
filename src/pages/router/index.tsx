import { Suspense, lazy, ComponentType, JSX } from "react";
import { useRoutes, Navigate } from "react-router-dom";
// import { useAuth } from '../contexts/AuthContext';

// import RouteWrapper from '../layouts/RouteWrapper';
import NotFound from "../NotFound";
// import RouteWrapper from "../pages/wrappers";

// ----------------------------------------------------------------------

type LoadableProps = Record<string, unknown>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface RouteComponent {
  element: JSX.Element;
  index?: boolean;
  path?: string;
  children?: RouteComponent[];
}

const Loadable =
  (Component: ComponentType<LoadableProps>) => (props: LoadableProps) => {
    return (
      <Suspense>
        <Component {...props} />
      </Suspense>
    );
  };

export default function Router() {
  return useRoutes([
    {
      path: "auth",
      children: [
        { element: <Navigate to="/login" replace />, index: true },
        {
          path: "login",
          element: <Login />,
        },
        // {
        //   path: "sign-up",
        //   element: <Register />,
        // },
        // {
        //   path: 'forgot-password',
        //   element: <ForgotPassword />
        // }
      ],
    },
    {
      path: "dashboard",
      element: (
        // <PrivateWrapper>
        <RouteWrapper />
        // </PrivateWrapper>
      ),
      children: [
        { element: <Navigate to=" " replace />, index: true },
        // { path: "home", element: <Dashboard /> },

        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },

    // {
    //   path: "/404",
    //   element: <NotFound />,
    //   index: true,
    // },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
      // index: true,
      children: [
        { path: "404", element: <NotFound /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
    { path: "/", element: <Navigate to="/auth/login" replace /> },
  ]);
}

// Pages

const Login = Loadable(lazy(() => import("../../pages/auth/login/login")));
