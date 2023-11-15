import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { CoursesList } from "./pages/admin/PremiumCourses";
import Users from "./pages/admin/PremiumUsers";
import Request from "./pages/admin/Request";
import AdminRegister from "./pages/admin/AdminRegister";
import Profile from "./pages/Profile";
import Materials from "./pages/Materials";
import { Layout } from "./components/layout";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/course?page=1" replace />} />
      <Route path="/admin">
      <Route path="register" element={<AdminRegister />} />
        <Route path="courses" element={<Layout children={<CoursesList />} />} />
        <Route path="request" element={<Layout children={<Request />} />} />
        <Route path="users" element={<Layout children={<Users />} />} />
      </Route>
      {/* Contoh react router */}

      <Route path="/course" element={<Layout children={<Home />} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Layout children={<Profile />} />} />
      <Route
        path="/materials/:course_id"
        element={<Layout children={<Materials />} />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
