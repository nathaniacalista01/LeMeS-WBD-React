import React, { useEffect } from "react";
import { axiosConfig } from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../config/config";
import { Container } from "@chakra-ui/react";
import Navbar from "../navbar/Navbar";
interface TeacherLayoutProps {
  redirect?: string;
  children: React.ReactNode;
}
export const TeacherLayout = ({ redirect, children }: TeacherLayoutProps) => {
  const axiosInstance = axios.create(axiosConfig());
  const navigate = useNavigate();
  const isTeacher = () => {
    axiosInstance.get(`${config.REST_API_URL}/user/isAdmin`).then((res) => {
      const response = res["data"];
      const { status, data } = response;
      if (status === 401) {
        navigate("/login");
      }
      if (data) {
        navigate("/admin/users");
      }
    });
  };
  useEffect(() => {
    isTeacher();
  }, []);
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
      {children}
    </Container>
  );
};
