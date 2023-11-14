// src/components/NotFound.tsx

import { Button, Container, Heading, Link, Text } from "@chakra-ui/react";
import React from "react";

const NotFound: React.FC = () => {
  return (
    <Container
      display={"flex"}
      flexDir={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      height={"100vh"}
      width={"100vw"}
      textAlign={"center"}
    >
      <Heading as="h1" fontSize={"3rem"} marginBottom={"16px"} color={"#333"}>
        404 - Not Found
      </Heading>
      <Container display={"flex"} flexDirection={"column"}>
        <Text fontSize={"1rem"} color={"#666"} marginBottom={"24px"}>
          Are you lost?
        </Text>

        <Button
          paddingX={"10px"}
          paddingY={"20px"}
          fontSize={"1rem"}
          backgroundColor={"#007bff"}
          cursor={"pointer"}
          borderRadius={"4px"}
          color={"#fff"}
          textDecoration={"none"}
          border={"none"}
          outline={"none"}
          transition={"background-color 0.3s"}
        >
          <Link href="/">Back to homepage</Link>
        </Button>
      </Container>
    </Container>
  );
};

export default NotFound;
