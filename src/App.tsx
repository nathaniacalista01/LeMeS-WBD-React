import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { Container } from "@chakra-ui/react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Courses from "./pages/admin/PremiumCourses";
import Users from "./pages/admin/PremiumUsers";
import Request from "./pages/admin/Request";
import AdminRegister from "./pages/admin/AdminRegister";
import Profile from "./pages/Profile";
import Materials from "./pages/Materials";
import Navbar from "./components/navbar/Navbar";
import { Layout } from "./components/layout";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/course?page=1" replace />}
      />
      {/* Contoh react router */}
      <Route path="/course" element={<Layout children={<Home />} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin/register" element={<AdminRegister />} />
      <Route path="/profile" element={<Layout children={<Profile />} />} />
      <Route path="/request" element={<Layout children={<Request />} />} />
      <Route
        path="/premium-courses"
        element={<Layout children={<Courses />} />}
      />
      <Route path="/premium-users" element={<Layout children={<Users />} />} />
      <Route
        path="/materials/:course_id"
        element={<Layout children={<Materials />} />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
