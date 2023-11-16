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
    InputGroup,
    InputRightElement,
    Checkbox,
} from "@chakra-ui/react";
import { BiWinkSmile } from "react-icons/bi";
import axios from "axios";
import { BiShow, BiHide } from "react-icons/bi";
import { axiosConfig } from "../utils/axios";
import config from "../config/config";

function Profile() {
    const axiosInstance = axios.create(axiosConfig());
    const toast = useToast();
    const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState("");
    const [isDeletePict, setIsDeletePict] = useState(false);
    const [usernameError, setUsernameError] = useState("");
    const [isAllValid, setIsAllValid] = useState({
        fullname: false,
        username: false,
        password: false,
        file: false,
        reset: false,
    });
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef<HTMLButtonElement | null>(null);

    const handleChangeFullname = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFullname(e.target.value);
    };
    useEffect(() => {
        const checkFullname = () => {
            if (fullname.trim().length >= 5) {
                setIsAllValid({ ...isAllValid, fullname: true });
            } else {
                setIsAllValid({ ...isAllValid, fullname: false });
            }
        };
        checkFullname();
    }, [fullname]);

    const handleChangeUsername: React.ChangeEventHandler<HTMLInputElement> = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setUsername(e.target.value);
    };
    useEffect(() => {
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
                                setUsernameError("Username had already taken!");
                                setIsAllValid({ ...isAllValid, username: false });
                            }
                        });
                } catch (error) {
                    console.log(error);
                }
            }
        };
        checkUsername(username);
    }, [username]);

    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };
    useEffect(() => {
        const checkPassword = () => {
            const regex = /^(?=.*\d)(?=.*[A-Z]).{8,}$/;
            if (password.length > 8 && regex.test(password)) {
                setIsAllValid({ ...isAllValid, password: true });
            } else {
                setIsAllValid({ ...isAllValid, password: false });
            }
        };
        checkPassword();
    }, [password]);

    const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files?.[0];

            if (file) {
                setSelectedFile(file);
                setFileName(file.name.replace(/\s/g, ''));

                setIsAllValid({ ...isAllValid, file: true });
            } else {
                setIsAllValid({ ...isAllValid, file: false });
            }
        } else {
            setSelectedFile(null);
            setIsAllValid({ ...isAllValid, file: false });
        }
    };

    const handleCheckboxChange = () => {
        setIsDeletePict(!isDeletePict);
        setIsAllValid({ ...isAllValid, reset: !isDeletePict});
        console.log(isDeletePict);
    };

    const handleEdit = () => {
    //     // if isValidAll.reset => image_path = defaultprofile.jpg
    //     // nanti semua avatarnya jdi fetch dri be juga-> http://localhost:8000/profpic/image_path
    //     try {
    //         try {
    //             if (isAllValid.file) {
    //                 upload();
    //                 delete(oldfile);
    //             } else if (isAllValid.reset) {
    //                 setFileName(defaultprofile.jpg);
    //             } 
    //             else {
    //                 setFileName(oldFile);
    //             }
    //         } catch (error) {
    //             console.error('Error uploading:', error);
    //         } finally {
    //             const response = await newAxiosInstance.put(`${config.REST_API_URL}/user/${userId}`, {
    //                 username: ,
    //                 fullname: ,
    //                 password: ,
    //                 image_path: ,
    //             });

    //             console.log('Profile edited successfully:', response.data.message);
    //         }
    //     } catch (error) {
    //         console.error('Error editing profile:', error);
    //     } finally {
    //         // window.location.reload(); // refresh to see new new profile
    //         setIsAllValid(prevState => ({
    //             ...prevState,
    //             username: false,
    //             fullname: false,
    //             file: false,
    //             reset: false,
    //         }));
    //     }
    };

    // UPLOAD IMAGE TO SERVER
    // const upload = () => {
    //     const formData = new FormData()
    //     if (selectedFile) { // Intinya ngecek kalo udh ada foto yg diselect dan reset profpic nya unchecked, berarti upload gambar ke server 
    //         formData.append('picture', selectedFile)
    //         newAxiosInstance.post(`${config.REST_API_URL}/user/upload`, formData)
    //             .then(res => { })
    //             .catch(er => console.log(er))
    //     }
    // }

    // const delete = (oldfile) => {
    //     // Make a delete request to remove the old file
    //     newAxiosInstance.delete(`${config.REST_API_URL}/user/deleteProfpic/${oldFile}`)
    //     .then(() => {
    //         console.log('Old file deleted successfully');
    //     })
    //     .catch((error) => {
    //         console.error('Error deleting old file:', error);
    //     });
    // }

    return (
        <Container display={"flex"} flexDir={"column"}>
            <Flex
                direction="column"
                alignSelf="center"
                justifySelf="center"
                mt="1rem"
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
                                Full Name
                            </FormLabel>
                            <Input
                                isRequired
                                bg="white"
                                fontSize="sm"
                                ms="4px"
                                borderRadius="15px"
                                type="text"
                                placeholder="current user.fullname (retrieved from id user)"
                                mb="24px"
                                size="lg"
                                // value="user.fullname"
                                onChange={handleChangeFullname}
                            />
                            {fullname && !isAllValid.fullname && (
                                <Text color={"red.500"} fontSize={"12px"} mt="-5" mb="2">
                                    Fullname minimum length is 5 excluding whitespace
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
                                placeholder="current user.username (retrieved from id user)"
                                mb="24px"
                                size="lg"
                                value={username}
                                onChange={(e) => handleChangeUsername(e)}
                            />
                            {username && !isAllValid.username && (
                                <Text color="red.400" fontSize="12px" mt="-5" mb="2">
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
                                    type="password"
                                    placeholder="Enter your new password"
                                    size="lg"
                                    value={password}
                                    onChange={handleChangePassword}
                                />
                            </InputGroup>
                            {password && !isAllValid.password && (
                                <Text color="red.400" fontSize="12px" mt="-2" mb="2">
                                    Password minimum length is 8 and must contain a Capital letter
                                    and 1 number
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
                                onChange={handleChangeFile}
                                isDisabled={isDeletePict}
                            />
                            <Box mt="-10" mb="3" display="flex" alignItems="left" pl="5">
                                <Checkbox
                                    onChange={handleCheckboxChange}
                                    isChecked={isDeletePict}
                                    size="md"
                                    colorScheme="purple"
                                    variant="outline"
                                    borderColor="black"
                                >
                                    <Text color="black" fontSize="14px">
                                        Set to Default Picture
                                    </Text>
                                </Checkbox>
                            </Box>

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
                                isDisabled={
                                    !(
                                        isAllValid.fullname ||
                                        isAllValid.username ||
                                        isAllValid.password ||
                                        isAllValid.file ||
                                        isAllValid.reset
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
