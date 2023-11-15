import React, { useState } from "react";
import {
  Flex,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  Container,
  Select,
  useToast,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import { axiosInstance } from "../../utils/axios";
import config from "../../config/config";
import { useNavigate } from "react-router-dom";
import { BiHide, BiShow } from "react-icons/bi";

function AdminRegister() {
  const titleColor = "purple.500";
  const textColor = "black";
  const toast = useToast();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [isAllValid, setIsAllValid] = useState({
    username: false,
    fullname: false,
    password: false,
  });
  const handleChangeFullname: React.ChangeEventHandler<HTMLInputElement> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFullname(e.target.value);
    checkFullname();
  };

  const handleChangeUsername: React.ChangeEventHandler<HTMLInputElement> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUsername(e.target.value);
    checkUsername(e.target.value);
  };

  const handleChangePassword: React.ChangeEventHandler<HTMLInputElement> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword(e.target.value);
    checkPassword();
  };

  const checkFullname = () => {
    if (fullname.length >= 5) {
      setIsAllValid({ ...isAllValid, fullname: true });
    } else {
      setIsAllValid({ ...isAllValid, fullname: false });
    }
  };
  const checkUsername = (current_username: string) => {
    if (current_username.length < 5) {
      setUsernameError("Username minimum length is 5");
      setIsAllValid({ ...isAllValid, username: false });
    } else if (current_username.includes(" ")) {
      setUsernameError("Username should not have a whitespace");
      setIsAllValid({ ...isAllValid, username: false });
    } else {
      try {
        axiosInstance
          .post(`${config.REST_API_URL}/user/username`, {
            username: current_username,
          })
          .then((res) => {
            const { result } = res["data"];
            if (!result) {
              setIsAllValid({ ...isAllValid, username: true });
            } else {
              setUsernameError("Username must be unique ");
              setIsAllValid({ ...isAllValid, username: false });
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const checkPassword = () => {
    const regex = /^(?=.*\d)(?=.*[A-Z]).{8,}$/;
    if (password.length > 8 && regex.test(password)) {
      setIsAllValid({ ...isAllValid, password: true });
    } else {
      setIsAllValid({ ...isAllValid, password: false });
    }
  };
  const handleSubmit = () => {
    try {
      axiosInstance
        .post(`${config.REST_API_URL}/user`, {
          username: username,
          fullname: fullname,
          password: password,
        })
        .then((res) => {
          const { status } = res["data"];
          console.log(res);
          if (status === 200) {
            toast({
              title: "Register success!",
              description: "Your account has been registered",
              status: "success",
              duration: 3000,
              isClosable: true,
              position: "top",
            });
            navigate("/admin/user");
          } else {
            toast({
              title: "Register failed!",
              description: "Your account can't be registered",
              status: "error",
              duration: 3000,
              isClosable: true,
              position: "top",
            });
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container display={"flex"} flexDir={"column"}>
      <Flex
        direction="column"
        alignSelf="center"
        justifySelf="center"
        mt="1.5rem"
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
            <Heading color={titleColor} fontSize="32px" mb="10px">
              Adding New User
            </Heading>
            <Text
              mb="36px"
              ms="4px"
              color={"gray.600"}
              fontWeight="bold"
              fontSize="14px"
            >
              Register a New User with Selected Role
            </Text>
            <FormControl>
              <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                Full Name
              </FormLabel>
              <Input
                isRequired
                bg="white"
                borderRadius="15px"
                mb="24px"
                fontSize="sm"
                type="text"
                placeholder="Input User Fullname"
                size="lg"
                value={fullname}
                onChange={(e) => handleChangeFullname(e)}
              />
              {fullname && !isAllValid.fullname && (
                <Text color={"red.500"} mb="8px" fontSize={"12px"} ml={"2px"}>
                  Fullname minimum length is 5
                </Text>
              )}
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
                placeholder="Input Username"
                size="lg"
                value={username}
                onChange={(e) => handleChangeUsername(e)}
              />
              {username && !isAllValid.username && (
                <Text color="red.400" fontSize="xs">
                  {usernameError}
                </Text>
              )}
              <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                Password
              </FormLabel>
              <InputGroup>
                <Input
                  isRequired
                  bg="white"
                  borderRadius="15px"
                  mb="12px"
                  fontSize="sm"
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Enter your password"
                  size="lg"
                  value={password}
                  onChange={handleChangePassword}
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
              {password && !isAllValid.password && (
                <Text color="red.400" fontSize="xs" marginBottom={"12px"}>
                  Password minimum length is 8 and must contain a Capital letter
                  and 1 number
                </Text>
              )}
              <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                Role
              </FormLabel>
              <Select placeholder={"Select Role"}>
                <option value="teacher" onClick={() => setIsAdmin(false)}>
                  Teacher
                </option>
                <option value="admin" onClick={() => setIsAdmin(true)}>
                  Admin
                </option>
              </Select>

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
                onClick={handleSubmit}
              >
                Register
              </Button>
            </FormControl>
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
}
export default AdminRegister;
