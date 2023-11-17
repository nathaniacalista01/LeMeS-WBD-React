import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Courses from "./pages/admin/PremiumCourses";
import Users from "./pages/admin/PremiumUsers";
import Request from "./pages/admin/Request";
import AdminRegister from "./pages/admin/AdminRegister";
import Profile from "./pages/Profile";
import Materials from "./pages/Materials";
import NotFound from "./pages/NotFound";
import { AdminLayout } from "./components/layout/AdminLayout";
import { TeacherLayout } from "./components/layout/TeacherLayout";

function App() {
  // const LoggedInRoutes = (children) => {

  // };
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/course?page=1" replace />} />
      <Route path="/admin">
        <Route
          path="register"
          element={
            <AdminLayout redirect="/not-found">
              <AdminRegister />
            </AdminLayout>
          }
        />
        <Route
          path="courses"
          element={
            <AdminLayout redirect="/not-found" children={<Courses />} />
          }
        />
        <Route
          path="request"
          element={<AdminLayout redirect="/not-found" children={<Request />} />}
        />
        <Route
          path="users"
          element={<AdminLayout redirect="/not-found" children={<Users />} />}
        />
      </Route>
      {/* Contoh react router */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/course"
        element={<TeacherLayout redirect="/not-found" children={<Home />} />}
      />
      <Route
        path="/profile"
        element={<TeacherLayout redirect="/not-found" children={<Profile />} />}
      />
      <Route
        path="/materials/:course_id"
        element={<TeacherLayout children={<Materials />} />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
