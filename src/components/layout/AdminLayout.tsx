import { Container } from "@chakra-ui/react";
import Navbar from "../navbar/Navbar";
import React, { useEffect } from "react";
import axios from "axios";
import { axiosConfig } from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import config from "../../config/config";

interface AdminLayoutProps {
  redirect: string;
  children: React.ReactNode;
}

export const AdminLayout = ({ redirect, children }: AdminLayoutProps) => {
  const axiosInstance = axios.create(axiosConfig());
  const navigate = useNavigate();
  const isAdmin = () => {
    axiosInstance
      .get(`${config.REST_API_URL}/user/isAdmin`)
      .then((res) =>{
        const response = res["data"];
        const {status, data} = response;
        if(!data || status !== 200){
          navigate("/not-found")
        }
      });
  };
  useEffect(()=>{
    isAdmin();
  },[])
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
