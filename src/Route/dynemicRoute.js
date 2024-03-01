import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

export default function DynemicRoute() {
  const [accessiblePaths, setAccessiblePaths] = useState([
    "/login",
    "/ragistor",
  ]);
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();

  //   useEffect(() => {
  //     setUserRole("User");
  //     const path = ["/product", "/profile"];
  //     setAccessiblePaths(path);
  //   }, []);

  useEffect(() => {
    if (accessiblePaths.length > 0) {
      if (window.location.pathname === "/") {
        navigate(accessiblePaths[0]);
      } else {
        if (!accessiblePaths.includes(window.location.pathname)) {
          navigate("/unauthorized");
        }
      }
    }
  }, [accessiblePaths, userRole, window.location.pathname]);

  return (
    <Routes>
      <Route index element={<h1>home</h1>} />
      <Route
        path="product"
        element={
          <>
            <h1>Product</h1>
            <button
              onClick={() => {
                setUserRole("");
                const path = ["/login", "/ragistor"];
                setAccessiblePaths(path);
              }}
            >
              Logout
            </button>
          </>
        }
      />
      <Route path="profile" element={<h1>Profile</h1>} />
      <Route path="dashboard" element={<h1>dashboard</h1>} />
      <Route path="unauthorized" element={<h1>unauthorized</h1>} />
      <Route
        path="login"
        element={
          <>
            <button
              onClick={() => {
                navigate("/ragistor");
              }}
            >
              Ragistor
            </button>
            <button
              onClick={() => {
                setUserRole("User");
                const path = ["/product", "/profile"];
                setAccessiblePaths(path);
              }}
            >
              Login
            </button>
          </>
        }
      />
      <Route
        path="ragistor"
        element={
          <button
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </button>
        }
      />
    </Routes>
  );
}
