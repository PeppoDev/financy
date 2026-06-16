import { Navigate, Route, Routes } from "react-router-dom";
import { isAuthenticated } from "@/lib/auth";
import { Dashboard } from "./pages/dashboard/dashboard";
import { Signin } from "./pages/signin/signin";
import { Signup } from "./pages/signup/signup";
import { Transactions } from "./pages/transactions/transactions";
import { Categories } from "./pages/categories/categories";

function RootRoute() {
  return isAuthenticated() ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/signin" replace />
  );
}

type GuardedRouteProps = {
  children: React.ReactNode;
};

function ProtectedRoute({ children }: GuardedRouteProps) {
  return isAuthenticated() ? children : <Navigate to="/signin" replace />;
}

function GuestRoute({ children }: GuardedRouteProps) {
  return isAuthenticated() ? <Navigate to="/dashboard" replace /> : children;
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RootRoute />} />
      <Route
        path="/signin"
        element={
          <GuestRoute>
            <Signin />
          </GuestRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <GuestRoute>
            <Signup />
          </GuestRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/transacoes"
        element={
          <ProtectedRoute>
            <Transactions />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/categorias"
        element={
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
