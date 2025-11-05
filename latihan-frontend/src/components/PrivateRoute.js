import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  // Mengecek apakah token ada di localStorage
  const token = localStorage.getItem("token");
  // Jika ada token, tampilkan children (Dashboard), jika tidak, arahkan ke /login
  return token ? children : <Navigate to="/login" />;
}

export default PrivateRoute;