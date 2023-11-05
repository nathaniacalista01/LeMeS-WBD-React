import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Container } from "@chakra-ui/react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Courses from "./pages/PremiumCourses";
import Users from "./pages/PremiumUsers";
import Navbar from "./components/Navbar";
function App() {
  return (
    <Container
      maxW={"100vw"}
      maxH={"100vh"}
      display={"flex"}
      flexDirection={"row"}
      className="App"
    >
      <Navbar />
      <Routes>
        {/* Contoh react router */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/premium-courses" element={<Courses />} />
        <Route path="/premium-users" element={<Users />} />
      </Routes>
    </Container>
  );
}

export default App;
