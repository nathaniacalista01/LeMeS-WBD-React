import { Container } from "@chakra-ui/react";
import Navbar from "../navbar/Navbar";
import React from "react";


interface LayoutProps {
    children: React.ReactNode;
  }

export const Layout = ({children} : LayoutProps) => {
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
