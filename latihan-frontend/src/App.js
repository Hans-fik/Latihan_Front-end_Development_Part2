import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Perbaikan import: Pastikan nama komponen sesuai dengan file yang diimpor
import Login from "./pages/Login"; // Mengimpor komponen Login dari file Login.js
import Register from "./pages/Register"; // Mengimpor komponen Register dari file Register.js
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
    <Navbar />   {/* <- tampil di semua halaman */}
      <Routes>
        {/* Rute publik */}

        {/* Rute Default (/) diarahkan ke Login, karena ini adalah entry point user
            yang paling sering digunakan setelah Register. */}
        <Route path="/" element={<Login />} />

        {/* Rute /login */}
        <Route path="/login" element={<Login />} />

        {/* Rute /register */}
        <Route path="/register" element={<Register />} />

        {/* Rute yang dilindungi */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* Rute 404 */}
        <Route
          path="*"
          element={<h3 className="text-center mt-5">404 Not Found</h3>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;