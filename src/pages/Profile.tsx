import React, { useEffect, useState } from "react";
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
  Image,
} from "@chakra-ui/react";
import { BiWinkSmile } from "react-icons/bi";
import axios from "axios";
import { axiosConfig } from "../utils/axios";
import config from "../config/config";
import { useNavigate } from "react-router-dom";
import Loading from "../components/loading/Loading";

function Profile() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const axiosInstance = axios.create(axiosConfig());
  const navigate = useNavigate();
  const toast = useToast();
  const [id, setId] = useState();
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [oldImagePath, setOldImagePath] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filepath, setFilePath] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [isAllValid, setIsAllValid] = useState({
    username: true,
    fullname: true,
  });
  const image_provider = "http://localhost:8000/profile-image";
  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePath(reader.result as string);
      };
      setFilePath(file.name.replace(/\s/g, ""));
      reader.readAsDataURL(file);
    } else {
      setFilePath("");
      setImagePath("");
    }
  };
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
  const cancelRef = React.useRef<HTMLButtonElement | null>(null);
  const getProfile = () => {
    setIsLoading(true);
    axiosInstance.get(`${config.REST_API_URL}/user/profile`).then((res) => {
      const { status, data } = res["data"];
      if (status !== 200) {
        toast({
          title: "Error",
          description: "Something went wrong",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        setIsLoading(false);
        navigate("/");
      } else {
        setId(data.id);
        setUsername(data.username);
        setFullname(data.fullname);
        setImagePath(data.image_path);
        setOldImagePath(data.image_path);
        setIsLoading(false);
      }
    });
  };
  const upload = () => {
    const formData = new FormData();
    // Dihapus cuma kalau adaa file pengganti dia
    if (oldImagePath && filepath) {
      // Kalau ada gambar lama, minta hapus
      axiosInstance
        .delete(`${config.REST_API_URL}/user/image/${oldImagePath}`)
        .then((res) => console.log(res))
        .catch((error) => {
          console.log(error);
        });
    }
    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    axiosInstance
      .post(`${config.REST_API_URL}/user/image`, formData)
      .then((res) => {})
      .catch((err) => console.log(err));
  };
  const handleEdit = async () => {
    try {
      setIsLoading(true);
      try {
        // Kalau misalnya ada file yang diselect, upload dia ke db
        if (selectedFile) {
          upload();
        } else {
          setFilePath(oldImagePath);
        }
      } catch (error) {
        console.log("Error during uploading..", error);
      } finally {
        const response = await axiosInstance.put(
          `${config.REST_API_URL}/user/${id}`,
          {
            username: username,
            fullname: fullname,
            image_path: filepath,
          }
        );
        const { status, data } = response["data"];
        if (status === 200) {
          toast({
            title: "Edit success!",
            description: "Your profile has been successfully edited",
            status: "success",
            isClosable: true,
            duration: 3000,
            position: "top",
          });
          navigate("/");
        } else {
          toast({
            title: "Edit failed!",
            description: "Your profile hasn't been edited",
            status: "error",
            isClosable: true,
            duration: 3000,
            position: "top",
          });
          onClose();
        }
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Error editing profile : ", error);
    }
  };
  useEffect(() => {
    getProfile();
  }, []);
  if (isLoading) {
    return <Loading loading={isLoading} />;
  }
  console.log("Ini old image path : ", oldImagePath);
  return (
    <>
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
              <Text fontSize="2xl" color="black" fontWeight="bold" mb="4">
                Your Profile
              </Text>
              <Image
                maxW={"80px"}
                maxH={"80px"}
                borderRadius={50}
                src={
                  selectedFile
                    ? imagePath
                    : oldImagePath
                    ? `${image_provider}/${oldImagePath}`
                    : "defaultprofile.jpg"
                }
                alignSelf={"center"}
              />
              <FormControl mt={4}>
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
                  mb="12px"
                  size="lg"
                  value={fullname}
                  onChange={(e) => handleChangeFullname(e)}
                />
                {fullname && !isAllValid.fullname && (
                  <Text
                    textAlign={"left"}
                    color={"red.500"}
                    mb="8px"
                    fontSize={"12px"}
                    ml={"2px"}
                  >
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
                  mb="12px"
                  size="lg"
                  value={username}
                  onChange={(e) => handleChangeUsername(e)}
                />
                {username && !isAllValid.username && (
                  <Text
                    textAlign={"left"}
                    color="red.400"
                    fontSize="xs"
                    mb={"12px"}
                  >
                    {usernameError}
                  </Text>
                )}
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
                  onChange={(e) => handleFileChange(e)}
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
                  onClick={onOpen}
                  isDisabled={!(isAllValid.username && isAllValid.fullname)}
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
    </>
  );
}

export default Profile;
