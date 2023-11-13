import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
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
function App() {
  return (
    <Container
      maxW={"100vw"}
      maxH={"100vh"}
      display={"flex"}
      flexDirection={"row"}
      className="App"
      bg={"#ffeaff"}
    >
      <Navbar />
      <Routes>
        {/* Contoh react router */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/request" element={<Request />} />
        <Route path="/premium-courses" element={<Courses />} />
        <Route path="/premium-users" element={<Users />} />
        <Route path="/materials/:course_id" element={<Materials />} />
      </Routes>
    </Container>
  );
}

export default App;
