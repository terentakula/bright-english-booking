import { Navigate, Route, Routes } from "react-router-dom";
import { ROUTES } from "./app/router/routes";
import { HomePage } from "./pages/HomePage";
import { ServicesPage } from "./pages/ServicesPage";
import { BookingPage } from "./pages/BookingPage";
import { LoginPage } from "./pages/LoginPage";
import { ClientDashboardPage } from "./pages/ClientDashboardPage";
import { AdminDashboardPage } from "./pages/AdminDashboardPage";
import { MainLayout } from "./shared/ui/MainLayout";
import { NotFoundPage } from "./pages/NotFoundPage";
import type { ReactNode } from "react";
import { useAuthStore, type UserRole } from "./features/auth/auth.store";

type ProtectedRouteProps = {
  allowedRoles: UserRole[];
  children: ReactNode;
};

function ProtectedRoute({ allowedRoles, children }: ProtectedRouteProps) {
  const role = useAuthStore((state) => state.role);

  if (!allowedRoles.includes(role)) {
    return <Navigate to={ROUTES.login} replace />;
  }
  return children;
}

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={ROUTES.home} element={<HomePage />} />
        <Route path={ROUTES.services} element={<ServicesPage />} />
        <Route path={ROUTES.booking} element={<BookingPage />} />
        <Route
          path={ROUTES.clientDashboard}
          element={
            <ProtectedRoute allowedRoles={["client"]}>
              <ClientDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.adminDashboard}
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path={ROUTES.login} element={<LoginPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
