import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Container,
  Flex,
  TableContainer,
  Icon,
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  FormLabel,
  FormControl,
  Input,
  Select,
} from "@chakra-ui/react";
import { BiSolidTrash, BiCheckCircle, BiError, BiUpvote, BiChevronLeftCircle, BiChevronRightCircle, BiSolidEdit } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { Users } from "../../types"
import Loading from "../../components/loading/Loading";
import { axiosConfig } from "../../utils/axios";
import config from "../../config/config";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { IconContext } from "react-icons";

const UsersList = () => {
  const initialUsers: Users[] = [];
  const [users, setUsers] = useState(initialUsers);
  const [refresher, setRefresher] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const newAxiosInstance = axios.create(axiosConfig());
  const toast = useToast();
  const navigate = useNavigate();
  const n = 6;

  useEffect(() => {
    const getUsers = async (pageNumber: number) => {
      try {
        setIsLoading(true);
        const res = await newAxiosInstance.get(`${config.REST_API_URL}/user?page=${pageNumber}`);
        const { status } = res["data"];
        // if (status === 401) {
        //     toast({
        //         title: "Unauthorized user",
        //         description: "You have to log in",
        //         status: "error",
        //         duration: 3000,
        //         isClosable: true,
        //         position: "top"
        //     })
        //     navigate("/login");
        // }
        setTotalPages(Math.ceil(res.data.total / n));

        const usersData: Users[] = res.data.data.map((user: any) => {
          return {
            id: user.id,
            username: user.username,
            fullname: user.fullname,
            isAdmin: user.isAdmin,
          };
        });
        setUsers(usersData);
        setIsLoading(false);
      } catch (error) {
        console.error('Axios Error:', error);
        setIsLoading(false);
      }
    }

    getUsers(page);
  }, [page, refresher]);

  // HANDLING EDIT USER
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [editID, setEditID] = useState(0);
  const [editUsername, setEditUsername] = useState("");
  const [editFullname, setEditFullname] = useState("");
  const [editRole, setEditRole] = useState("");
  const openModalEdit = (id: number, username: string, fullname: string, role: string) => {
    setEditID(id);
    setEditUsername(username);
    setEditFullname(fullname);
    setEditRole(role);
    setIsModalEditOpen(true);
  };
  const closeModalEdit = () => {
    setIsModalEditOpen(false);
  };

  const successEdit = () => {
    setRefresher((prevRefresh) => !prevRefresh);
  };

  // HANDLING DELETE USER
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [deleteID, setDeleteID] = useState(0);
  const [deleteUsername, setDeleteUsername] = useState("");
  const openModalDelete = (id: number, username: string) => {
    setDeleteID(id);
    setDeleteUsername(username);
    setIsModalDeleteOpen(true);
  };
  const closeModalDelete = () => {
    setIsModalDeleteOpen(false);
  };
  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const response = await newAxiosInstance.delete(`${config.REST_API_URL}/user/${deleteID}`);

      console.log('User deleted successfully:', response.data.message);

      setIsLoading(false);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
    closeModalDelete();
    setRefresher((prevRefresh) => !prevRefresh) // lgsung request data baru tanpa hrus reload page (harusnya works)
  };

  return (
    <Container overflow="auto" maxW={"100vw"} maxH={"100vh"}>
      {/* Render the EditModal component conditionally */}
      <Loading loading={isLoading} />
      <ModalEdit
        isOpen={isModalEditOpen}
        onClose={closeModalEdit}
        successEdit={successEdit}
        userId={editID}
      />

      {/* Render the DeleteModal component conditionally */}
      <ModalDelete
        isOpen={isModalDeleteOpen}
        onClose={closeModalDelete}
        username={deleteUsername}
        handleDelete={handleDelete}
      />
      <Flex alignItems="center" justifyContent="center" mb="20px" mt="50px">
        <Flex
          direction="column"
          background="transparent"
          borderRadius="15px"
          p="30px"
          // mx={{ base: "100px" }}
          bg={"#f2f2f2"}
          boxShadow="0 20px 27px 0 rgb(0 0 0 / 15%)"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt="-5"
          >
            <Heading as="h1">Premium Users</Heading>
            <Box>
              <Button
                bg="#9d4bff"
                textColor="white"
                _hover={{ bg: "#23004d" }}
                my="5"
              >
                <Link to="/admin/register">Add Users</Link>
              </Button>
            </Box>
          </Box>
          <TableContainer width="80vw" border="1px" borderColor={"#564c95"} borderRadius="10">
            <Table colorScheme='purple' fontSize={"16"}>
              <Thead bg="#564c95" textColor="white" fontWeight={"bold"}>
                <Tr>
                  <Th textAlign={"center"} color="white" w="10%">UserID</Th>
                  <Th textAlign={"center"} color="white" w="25%">Username</Th>
                  <Th textAlign={"center"} color="white" w="35%">Fullname</Th>
                  <Th textAlign={"center"} color="white" w="10%">Role</Th>
                  <Th textAlign={"center"} color="white" w="20%">Action</Th>
                </Tr>
              </Thead>
              {users
                .sort((a, b) => a.id - b.id)
                .map((item, index) => (
                  <Tbody>
                    <Tr key={item.id} bg={index % 2 === 0 ? 'white' : 'gray.100'}>
                      <Td textAlign={"center"}>{item.id}</Td>
                      <Td textAlign={"center"} fontWeight={"bold"}>{item.username}</Td>
                      <Td textAlign={"center"}>{item.fullname}</Td>
                      {item.isAdmin ? (
                        <Td textAlign={"center"}>
                          Admin
                        </Td>
                      ) : (
                        <Td textAlign={"center"}>
                          Teacher
                        </Td>
                      )}
                      <Td textAlign={"center"}>
                        <Icon
                          as={BiSolidEdit}
                          fontSize={"24"}
                          color={"#564c95"}
                          _hover={{ color: "green" }}
                          cursor={"pointer"}
                          onClick={() =>
                            openModalEdit(
                              item.id,
                              item.username,
                              item.fullname,
                              item.isAdmin,
                            )
                          }
                        ></Icon>

                        <Icon
                          as={BiSolidTrash}
                          fontSize={"24"}
                          color={"#564c95"}
                          _hover={{ color: "red" }}
                          cursor={"pointer"}
                          onClick={() => openModalDelete(item.id, item.username)}
                        ></Icon>
                      </Td>
                    </Tr>
                  </Tbody>
                ))}
            </Table>
          </TableContainer>
          <Box mt={10} alignContent="center">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <ReactPaginate
                containerClassName={"pagination"}
                pageClassName={"page-item"}
                activeClassName={"active-page"}
                onPageChange={(selectedItem) => {
                  if ('selected' in selectedItem) {
                    const nextPage = selectedItem.selected + 1;
                    setPage(nextPage);
                  }
                }}
                pageCount={totalPages}
                initialPage={page - 1}
                breakLabel="..."
                previousLabel={
                  <IconContext.Provider value={{ size: "36px" }}>
                    <BiChevronLeftCircle color="gray" />
                  </IconContext.Provider>
                }
                nextLabel={
                  <IconContext.Provider value={{ size: "36px" }}>
                    <BiChevronRightCircle color="gray" />
                  </IconContext.Provider>
                }
              />
            </div>
          </Box>
        </Flex>
      </Flex>
    </Container>
  );
};

{
  /* Modal Edit */
}
interface ModalEditProps {
  isOpen: boolean;
  onClose: () => void;
  successEdit: () => void;
  userId: number;
}

function ModalEdit({
  isOpen,
  onClose,
  successEdit,
  userId,
}: ModalEditProps) {
  const axiosInstance = axios.create(axiosConfig());
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [newUsername, setNewUsername] = useState<string>('');
  const [usernameError, setUsernameError] = useState("");
  const [newFullname, setNewFullname] = useState<string>('');
  const [fullnameError, setFullnameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [oldUsername, setOldUsername] = useState("");
  const [oldFullname, setOldFullname] = useState("");
  const [newPassword, setNewPassword] = useState<string>('');
  const [isAllValid, setIsAllValid] = useState({
    fullname: false,
    username: false,
    password: false,
  });

  const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.includes(" ")) {
      setUsernameError("Username should not have a whitespace");
      setIsAllValid({ ...isAllValid, username: false });
      setNewUsername(oldUsername);
    } else if (e.target.value.length < 5) {
      setUsernameError("Username minimum length is 5");
      setIsAllValid({ ...isAllValid, username: false });
      setNewUsername(oldUsername);
    } else {
      try {
        axiosInstance
          .post(`${config.REST_API_URL}/user/username`, {
            username: e.target.value,
          })
          .then((res) => {
            const { result } = res["data"];
            if (!result) {
              setUsernameError("");
              setNewUsername(e.target.value);
              setIsAllValid({ ...isAllValid, username: true });
            } else {
              setNewUsername(oldUsername);
              setUsernameError("Username is already taken!");
              setIsAllValid({ ...isAllValid, username: false });
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleChangeFullname = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length >= 5) {
      setFullnameError("");
      setNewFullname(e.target.value);
      setIsAllValid((prevState) => ({
        ...prevState,
        fullname: true,
      }));
    } else {
      setFullnameError("Fullname minimum length is 5");
      setNewFullname(oldFullname);
      setIsAllValid((prevState) => ({
        ...prevState,
        fullname: false,
      }));
    }
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  }

  useEffect(() => {
    const checkPassword = () => {
      const regex = /^(?=.*\d)(?=.*[A-Z]).{8,}$/;
      if (newPassword.length > 8 && regex.test(newPassword)) {
        setIsAllValid({ ...isAllValid, password: true });
      } else {
        setIsAllValid({ ...isAllValid, password: false });
        setPasswordError("Password minimum length is 8 and must contain a Capital letter and 1 number");
      }
    };
    checkPassword();
  }, [newPassword])

  const handleClose = () => {
    onClose();
    setUsernameError("");
    setFullnameError("");
    setPasswordError("");
    setIsAllValid({ ...isAllValid, username: false, fullname: false, password: false })
  }

  useEffect(() => {
    // Fetch Data to Get User Detail
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await axiosInstance.get(
          `${config.REST_API_URL}/user/${userId}`
        );
        if (res.data.status === 200) {
          setNewUsername(res.data.data.username);
          setNewFullname(res.data.data.fullname);

          setOldUsername(res.data.data.username);
          setOldFullname(res.data.data.fullname);
        } else {
          console.log("No response data");
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching material data:", error);
      }
    };
    fetchData();
  }, [userId]);

  const handleEdit = async () => {
    try {
      setIsLoading(true);
      if (newPassword.length > 0 && isAllValid.password) { // Passwordnya dibuah pake api yg bisa ganti password
        const response = await axiosInstance.put(`${config.REST_API_URL}/user/admin/${userId}`, {
          username: newUsername,
          fullname: newFullname,
          password: newPassword,
        });
        console.log('User edited successfully');
        setIsLoading(false);
        successEdit();
        handleClose();
      } else { // ga ganti password
        const response = await axiosInstance.put(`${config.REST_API_URL}/user/${userId}`, {
          username: newUsername,
          fullname: newFullname,
        });
        console.log('User edited successfully');
        setIsLoading(false);
        successEdit();
        handleClose();
      }
    } catch (error) {
      console.error('Error editing user:', error);
    }
  };

  return (
    <>
      <Loading loading={isLoading} />
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bg="#d78dff" textAlign={"center"}>
            Edit Premium User
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                New Username
              </FormLabel>
              <Input
                isRequired
                variant="outline"
                bg="white"
                borderRadius="15px"
                mb="5"
                fontSize="sm"
                placeholder={oldUsername}
                size="lg"
                onChange={handleChangeUsername}
              />
              {newUsername && !isAllValid.username && (
                <Text color="red.400" fontSize="12px" mt="-5" mb="2">
                  {usernameError}
                </Text>
              )}


              <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                New Fullname
              </FormLabel>
              <Input
                isRequired
                variant="outline"
                bg="white"
                borderRadius="15px"
                mb="5"
                fontSize="sm"
                placeholder={oldFullname}
                size="lg"
                onChange={handleChangeFullname}
              />
              {newFullname && !isAllValid.fullname && (
                <Text color={"red.500"} fontSize={"12px"} mt="-5" mb="2">
                  {fullnameError}
                </Text>
              )}


              <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                Password
              </FormLabel>
              <Input
                isRequired
                bg="white"
                borderRadius="15px"
                mb="12px"
                fontSize="sm"
                type="password"
                placeholder="Enter new password"
                size="lg"
                onChange={handleChangePassword}
              />
              {newPassword && !isAllValid.password && (
                <Text color="red.400" fontSize="12px" mt="-2" mb="2">
                  {passwordError}
                </Text>
              )}

            </FormControl>
          </ModalBody>

          <ModalFooter justifyContent={"center"}>
            <ButtonGroup>
              <Button colorScheme="gray" flex="1" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                colorScheme="purple"
                flex="1"
                ml={3}
                onClick={handleEdit}
                isDisabled={
                  !(
                    isAllValid.fullname ||
                    isAllValid.username ||
                    isAllValid.password
                  )
                }
              >
                Edit
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

{
  /* Modal Delete */
}
interface ModalDeleteProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
  handleDelete: () => void;
}

function ModalDelete({
  isOpen,
  onClose,
  username,
  handleDelete,
}: ModalDeleteProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign={"center"}>Delete User</ModalHeader>
        <ModalCloseButton />
        <ModalBody textAlign={"center"}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Text as={BiError} fontSize={"150px"} color="red" />
            <Text>Are you sure want to delete {username} ?</Text>
          </Box>
        </ModalBody>

        <ModalFooter justifyContent={"center"}>
          <ButtonGroup>
            <Button colorScheme="gray" flex="1" onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" flex="1" ml={3} onClick={handleDelete}>
              Delete
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default UsersList;
