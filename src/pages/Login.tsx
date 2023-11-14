import React, { useState } from "react";
import axios from "axios";
import {
  Flex,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  Container,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { BiHide, BiShow } from "react-icons/bi";
import { axiosConfig } from "../utils/axios";
import config from "../config/config";

function Login() {
  const axiosInstance = axios.create(axiosConfig());
  const toast = useToast();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const handleLogin = () => {
    try {
      axiosInstance
        .post(`${config.REST_API_URL}/auth/login`, {
          username: username,
          password: password,
        })
        .then((res) => {
          const { status } = res["data"];
          if (status === 200) {
            toast({
              title: "Login success!",
              description: "You have successfully log in!",
              status: "success",
              duration: 3000,
              isClosable: true,
              position: "top",
            });
            navigate("/");
          } else {
            toast({
              title: "Login failed!",
              description: "Username/password is invalid",
              status: "error",
              duration: 3000,
              isClosable: true,
              position: "top",
            });
          }
        });
    } catch (error) {}
  };
  return (
    <Container display={"flex"} flexDir={"column"}>
      <Flex
        direction="column"
        alignSelf="center"
        justifySelf="center"
        mt="3rem"
        overflow="hidden"
      >
        <Flex alignItems="center" justifyContent="center" mb="60px">
          <Flex
            direction="column"
            w="445px"
            background="transparent"
            borderRadius="15px"
            p="40px"
            mx={{ base: "100px" }}
            bg={"#f2f2f2"}
            boxShadow="0 20px 27px 0 rgb(0 0 0 / 15%)"
          >
            <Heading color="purple.500" fontSize="32px" mb="10px">
              SIGN IN
            </Heading>
            <Text
              mb="36px"
              ms="4px"
              color={"gray.600"}
              fontWeight="bold"
              fontSize="14px"
            >
              Welcome to LeMeS Premium!
            </Text>
            <FormControl>
              <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                Username
              </FormLabel>
              <Input
                isRequired
                bg="white"
                borderRadius="15px"
                mb="24px"
                fontSize="sm"
                type="text"
                placeholder="Your username"
                size="lg"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                Password
              </FormLabel>
              <InputGroup>
                <Input
                  isRequired
                  bg="white"
                  borderRadius="15px"
                  mb="36px"
                  fontSize="sm"
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Your password"
                  size="lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  {!passwordVisible ? (
                    <BiHide
                      cursor={"pointer"}
                      size="24px"
                      onClick={() => setPasswordVisible(true)}
                    />
                  ) : (
                    <BiShow
                      cursor={"pointer"}
                      size={"24px"}
                      onClick={() => setPasswordVisible(false)}
                    />
                  )}
                </InputRightElement>
              </InputGroup>
              <Button
                fontSize="16px"
                type="submit"
                bg="purple.500"
                w="100%"
                h="45"
                mb="20px"
                color="white"
                mt="20px"
                _hover={{
                  bg: "purple.200",
                }}
                _active={{
                  bg: "purple.400",
                }}
                onClick={handleLogin}
              >
                Login
              </Button>
            </FormControl>
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              maxW="100%"
              mt="0px"
            >
              <Text color="black" fontWeight="medium">
                Don't have an account?
                <RouterLink
                  to="/register"
                  style={{
                    color: "#564c95",
                    marginLeft: "5px",
                    fontWeight: "bold",
                  }}
                >
                  Sign Up
                </RouterLink>
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
}

export default Login;
