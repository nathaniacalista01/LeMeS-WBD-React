import React, {useEffect, useState } from "react";
import {
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
  Box,
  useToast,
} from "@chakra-ui/react";
import { BiWinkSmile } from "react-icons/bi";
import axios from "axios";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { BiShow, BiHide } from "react-icons/bi";
import { Fetch } from "../utils/fetch";
import { axiosConfig } from "../utils/axios";
import config from "../config/config";

function Profile() {
  const axiosInstance = axios.create(axiosConfig());
  const toast = useToast();
  const navigate = useNavigate();
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [isAllValid, setIsAllValid] = useState({
    fullname: false,
    username: false,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement | null>(null);

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

  const handleEdit = () => {
    try {
      axiosInstance
        .post(`${config.REST_API_URL}/user`, {
          username: username,
          fullname: fullname,
        })
        .then((res) => {
          console.log(res, res["data"]);
          const { status } = res["data"];
          console.log(status);
          if (status === 200) {
            toast({
              title: "Edit Profile success!",
              description: "Your profile has been updated",
              status: "success",
              duration: 5000,
              isClosable: true,
              position: "top",
            });
            // navigate("/login");
          } else {
            toast({
              title: "Edit Profile failed!",
              description: "Your profile can't be updated",
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
            <Text fontSize="4xl" color="black" fontWeight="bold" mb="8">
              Your Profile
            </Text>
            <FormControl>
              <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                Name
              </FormLabel>
              <Input
                isRequired
                bg="white"
                fontSize="sm"
                ms="4px"
                borderRadius="15px"
                type="text"
                placeholder="user.fullname"
                mb="24px"
                size="lg"
                value={fullname}
                onChange={handleChangeFullname}
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
                fontSize="sm"
                ms="4px"
                borderRadius="15px"
                type="text"
                placeholder="user.username"
                mb="24px"
                size="lg"
                value={username}
                onChange={handleChangeUsername}
              />
              {username && !isAllValid.username && (
                <Text color="red.400" fontSize="xs">
                  {usernameError}
                </Text>
              )}
              {/* <FormLabel ms='4px' fontSize='sm' fontWeight='bold'>
                                Password
                            </FormLabel>
                            <Input
                                fontSize='sm'
                                ms='4px'
                                borderRadius='15px'
                                type='password'
                                placeholder='Optional'
                                mb='24px'
                                size='lg'
                            /> */}
              <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                New Picture
              </FormLabel>
              <Input
                fontSize="sm"
                ms="4px"
                border="none"
                type="file"
                accept="image/*"
                mb="24px"
                size="lg"
              />
              <Button
                type="submit"
                bg="purple.500"
                fontSize="16 px"
                color="white"
                fontWeight="bold"
                w="100%"
                h="45"
                mb="24px"
                _hover={{
                  bg: "purple.200",
                }}
                _active={{
                  bg: "purple.300",
                }}
                // onClick={handleEdit}
                isDisabled={
                  !(
                    isAllValid.fullname &&
                    isAllValid.username
                  )
                }
              >
                Edit Profile
              </Button>
              <AlertDialog
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
              >
                <AlertDialogOverlay />
                <AlertDialogContent>
                  <AlertDialogHeader textAlign={"center"}>
                    Edit Profile
                  </AlertDialogHeader>
                  <AlertDialogCloseButton />
                  <AlertDialogBody textAlign={"center"}>
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Text
                        as={BiWinkSmile}
                        fontSize={"150px"}
                        color="purple"
                      />
                      <Text>Are you sure want to edit profile?</Text>
                    </Box>
                  </AlertDialogBody>
                  <AlertDialogFooter justifyContent={"center"}>
                    <Button
                      colorScheme="gray"
                      ref={cancelRef}
                      onClick={onClose}
                      flex="1"
                    >
                      Cancel
                    </Button>
                    <Button 
                      colorScheme="purple" 
                      ml={3} 
                      flex="1"
                      onClick={handleEdit}
                      isDisabled={
                        !(
                          isAllValid.fullname &&
                          isAllValid.username
                        )}
                        >
                        Edit
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </FormControl>
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
}

export default Profile;
