import React from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

const userRole = "user";

const AdminGuard = ({ element }) => {
  if (userRole !== "admin") {
    return <Navigate to="/unauthorized" />;
  }

  return element;
};

const UserGuard = ({ element }) => {
  if (userRole !== "user") {
    return <Navigate to="/unauthorized" />;
  }

  return element;
};

const SuperAdminGuard = ({ element }) => {
  if (userRole !== "superadmin") {
    return <Navigate to="/unauthorized" />;
  }

  return element;
};

const AuthGuard = ({ element }) => {
  if (!userRole) {
    return <Navigate to="/login" />;
  }

  return element;
};

const RedirectIfAuthenticated = ({ element }) => {
  if (userRole) {
    return <Navigate to={`/${userRole}`} />;
  }

  return element;
};

const RoleBaseRoute = () => {
  return (
    <Routes>
      <Route
        index
        element={<RedirectIfAuthenticated element={<h1>Login</h1>} />}
      />
      <Route
        path="/register"
        element={<RedirectIfAuthenticated element={<h1>Register</h1>} />}
      />
      <Route element={<AuthGuard element={<Layout />} />}>
        <Route path="user" element={<UserGuard element={<Layout />} />}>
          <Route index element={<h1>user Dashboard</h1>} />
          <Route path="profile" element={<h1>user Profile</h1>} />
        </Route>

        <Route path="admin" element={<AdminGuard element={<Layout />} />}>
          <Route index element={<h1>dashboard</h1>} />
          <Route path="product" element={<h1>product page</h1>} />
        </Route>

        <Route
          path="superadmin"
          element={<SuperAdminGuard element={<Layout />} />}
        >
          <Route index element={<h1>Dashbard page</h1>} />
          <Route path="payment" element={<h1>Payment page</h1>} />
        </Route>
      </Route>
      <Route path="unauthorized" element={<h1>unauthorized</h1>} />
      <Route path="*" element={<h1>404 Error</h1>} />
    </Routes>
  );
};

export default RoleBaseRoute;
