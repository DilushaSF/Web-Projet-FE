import { Suspense, lazy, ComponentType, JSX } from "react";
import { useRoutes, Navigate } from "react-router-dom";
// import { useAuth } from '../contexts/AuthContext';

import RouteWrapper from "../wrappers";
import NotFound from "../NotFound";
// import RouteWrapper from "../pages/wrappers";

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
        {
          path: "register",
          element: <Register />,
        },
        // {
        //   path: 'forgot-password',
        //   element: <ForgotPassword />
        // }
      ],
    },
    {
      path: "dashboard",
      element: (
        <ProtectedRoute>
          <RouteWrapper />
        </ProtectedRoute>
      ),
      children: [
        { element: <Navigate to=" " replace />, index: true },
        { path: "category-selection", element: <HomePage /> },
        { path: "brand-selection", element: <BrandSelection /> },
        { path: "products", element: <Products /> },
        { path: "product/:id", element: <ProductDetail /> },
        { path: "cart", element: <Cart /> },
        { path: "place-order", element: <PlaceOrder /> },
        { path: "my-orders", element: <MyOrders /> },
        { path: "profile", element: <Profile /> },
        { path: "checkout", element: <Checkout /> },

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
const Register = Loadable(
  lazy(() => import("../../pages/auth/register/register"))
);
const HomePage = Loadable(lazy(() => import("../../pages/dashboard/homePage")));
const BrandSelection = Loadable(
  lazy(() => import("../../pages/dashboard/brandSelection"))
);
const Products = Loadable(lazy(() => import("../../pages/product/products")));
const ProductDetail = Loadable(
  lazy(() => import("../../pages/product/productDetail"))
);
const Cart = Loadable(lazy(() => import("../../pages/cart/cart")));
const Profile = Loadable(lazy(() => import("../../pages/profile/profile")));
const Checkout = Loadable(lazy(() => import("../../pages/checkout/checkout")));
const PlaceOrder = Loadable(
  lazy(() => import("../../pages/orders/placeOrders"))
);
const MyOrders = Loadable(lazy(() => import("../../pages/orders/myOrders")));
// Auth route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/auth/login" />;
  }

  return <>{children}</>;
};
