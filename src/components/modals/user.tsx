import {
  Box,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  ModalFooter,
  ButtonGroup,
  Button,
  Select,
  Container,
  Flex,
  Heading,
  TableContainer,
  Icon,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiError, BiSolidEdit, BiSolidTrash } from "react-icons/bi";
import { axiosConfig } from "../../utils/axios";
import axios from "axios";
import config from "../../config/config";
import Loading from "../loading/Loading";
import { Link } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

{
  /* Modal Add User */
}
interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  successAdd: () => void;
  user_id: number;
}

export function AddUserModal({
  isOpen,
  onClose,
  successAdd,
  user_id,
}: AddUserModalProps) {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const newAxiosInstance = axios.create(axiosConfig());
  const [isAllValid, setIsAllValid] = useState({
    username: false,
    fullname: false,
    role: false,
  });

  const handleAddUser = async () => {
    try {
      setIsLoading(true);
      const response = await newAxiosInstance.post(
        `${config.REST_API_URL}/user`,
        {
          username: username,
          fullname: fullname,
          role: role,
        }
      );

      console.log("User added successfully:", response.data.message);

      // Clear the form after successful submission if needed
      setUsername("");
      setFullname("");
      setRole("");
      setIsLoading(false);
      successAdd(); // Refresh new data without reloading page
      setIsAllValid({ ...isAllValid, username: false });
      setIsAllValid({ ...isAllValid, fullname: false });
      setIsAllValid({ ...isAllValid, role: false });
    } catch (error) {
      console.log("Error adding user:", error);
    }
    // window.location.reload(); // refresh to see new user added (should change to not reloading)
  };

  const handleClose = () => {
    setUsername("");
    setFullname("");
    setRole("");
    setIsAllValid({ ...isAllValid, username: false });
    setIsAllValid({ ...isAllValid, fullname: false });
    setIsAllValid({ ...isAllValid, role: false });
    onClose();
  };

  const checkUsername = () => {
    setUsername((prevUsername) => {
      const isValid = prevUsername.trim().length > 0;
      setIsAllValid((prev) => ({ ...prev, username: isValid }));
      return prevUsername;
    });
  };

  const checkFullname = () => {
    setFullname((prevFullname) => {
      const isValid = prevFullname.trim().length > 0;
      setIsAllValid((prev) => ({ ...prev, fullname: isValid }));
      return prevFullname;
    });
  };

  const checkRole = () => {
    setRole((prevRole) => {
      const isValid = prevRole.trim().length > 0;
      setIsAllValid((prev) => ({ ...prev, role: isValid }));
      return prevRole;
    });
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    checkUsername();
  };

  const handleFullnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullname(e.target.value);
    checkFullname();
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value);
    checkRole();
  };

  return (
    <Container overflow="auto" maxW={"100vw"} maxH={"100vh"}>
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
          <TableContainer width="80vw">
            <DataTable
              stripedRows
              //   value={users}
              paginator
              paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageInput"
              rows={5}
              selectionMode="single"
            >
              <Column
                field="user_id"
                header="UserID"
                headerClassName="custom-header"
              ></Column>
              <Column
                field="username"
                header="Username"
                headerClassName="custom-header"
              ></Column>
              <Column
                field="fullname"
                header="Full Name"
                headerClassName="custom-header"
              ></Column>
              <Column
                field="role"
                header="Role"
                headerClassName="custom-header"
              ></Column>
              <Column
                header="Action"
                headerClassName="custom-header"
                body={(rowData) => (
                  <span>
                    <Icon
                      as={BiSolidEdit}
                      fontSize={"24"}
                      color={"#564c95"}
                      _hover={{ color: "green" }}
                      cursor={"pointer"}
                      //   onClick={() => handleEditUser}
                    ></Icon>

                    <Icon
                      as={BiSolidTrash}
                      fontSize={"24"}
                      color={"#564c95"}
                      _hover={{ color: "red" }}
                      cursor={"pointer"}
                      //   onClick={() => handleDeleteUser}
                    ></Icon>
                  </span>
                )}
              ></Column>
            </DataTable>
          </TableContainer>
        </Flex>
      </Flex>
    </Container>
  );
}

{
  /* Modal Edit User */
}
interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  successEdit: () => void;
  user_id: number;
}

export function EditUserModal({
  isOpen,
  onClose,
  successEdit,
  user_id,
}: EditUserModalProps) {
  const [editedUsername, setEditedUsername] = useState("");
  const [editedFullname, setEditedFullname] = useState("");
  const [editedRole, setEditedRole] = useState("");
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const newAxiosInstance = axios.create(axiosConfig());
  const [isAllValid, setIsAllValid] = useState({
    username: false,
    fullname: false,
    role: false,
  });

  useEffect(() => {
    // Fetch Data to Get User Detail
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await newAxiosInstance.get(
          `${config.REST_API_URL}/user/${user_id}`
        );
        if (res.data.status === 200) {
          setEditedUsername(res.data.data.username);
          setEditedFullname(res.data.data.fullname);
          setEditedRole(res.data.data.role);
          setUsername(res.data.data.username);
          setFullname(res.data.data.fullname);
          setRole(res.data.data.role);
        } else {
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, [user_id]);

  const handleEditUser = async () => {
    try {
      setIsLoading(true);
      const response = await newAxiosInstance.put(
        `${config.REST_API_URL}/user/${user_id}`,
        {
          username: username,
          fullname: fullname,
          role: role,
        }
      );

      console.log("User edited successfully:", response.data.message);

      setIsLoading(false);
      successEdit(); // Refresh new data without reloading page
      setIsAllValid({ ...isAllValid, username: false });
      setIsAllValid({ ...isAllValid, fullname: false });
      setIsAllValid({ ...isAllValid, role: false });
    } catch (error) {
      console.error("Error editing user:", error);
    }
    // window.location.reload(); // refresh to see new user added (should change to not reloading)
  };

  const handleClose = () => {
    setUsername(editedUsername);
    setFullname(editedFullname);
    setRole(editedRole);
    setIsAllValid({ ...isAllValid, username: false });
    setIsAllValid({ ...isAllValid, fullname: false });
    setIsAllValid({ ...isAllValid, role: false });
    onClose();
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      setUsername(e.target.value);
      setIsAllValid({ ...isAllValid, username: true });
    } else {
      setUsername(editedUsername);
      setIsAllValid({ ...isAllValid, username: false });
    }
  };

  const handleFullnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      setFullname(e.target.value);
      setIsAllValid({ ...isAllValid, fullname: true });
    } else {
      setFullname(editedFullname);
      setIsAllValid({ ...isAllValid, fullname: false });
    }
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value.length > 0) {
      setRole(e.target.value);
      setIsAllValid({ ...isAllValid, role: true });
    } else {
      setRole(editedRole);
      setIsAllValid({ ...isAllValid, role: false });
    }
  };

  return (
    <>
      <Loading loading={isLoading} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bg="#d78dff" textAlign={"center"}>
            Edit Premium User
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                Username
              </FormLabel>
              <Input
                isRequired
                variant="outline"
                bg="white"
                borderRadius="15px"
                mb="5"
                fontSize="sm"
                placeholder={username}
                size="lg"
                //   value={editedUsername}
                onChange={handleUsernameChange}
              />

              <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                Fullname
              </FormLabel>
              <Input
                isRequired
                variant="outline"
                bg="white"
                borderRadius="15px"
                mb="5"
                fontSize="sm"
                placeholder={fullname}
                size="lg"
                //   value={editedFullname}
                onChange={handleFullnameChange}
              />

              <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                Role
              </FormLabel>
              <Select
                placeholder={"Change Role"}
                //   value={editedRole}
                onChange={handleRoleChange}
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
              </Select>
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
                onClick={handleEditUser}
                isDisabled={
                  !(
                    isAllValid.username &&
                    isAllValid.fullname &&
                    isAllValid.role
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
interface DeleteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user_id: number;
  successDelete: () => void;
}

export function DeleteUserModal({
  isOpen,
  onClose,
  user_id,
  successDelete,
}: DeleteUserModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const newAxiosInstance = axios.create(axiosConfig());

  const handleDeleteUser = async () => {
    try {
      setIsLoading(true);
      const response = await newAxiosInstance.delete(
        `${config.REST_API_URL}/user/${user_id}`
      );

      console.log("User Deleted successfully:", response.data.message);

      setIsLoading(false);
      successDelete(); // Refresh new data without reloading page
    } catch (error) {
      console.error("Error deleting user:", error);
    }
    // window.location.reload(); // refresh to see new user added (should change to not reloading)
  };
  return (
    <>
      <Loading loading={isLoading} />
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
              <Text>Are you sure want to delete this User?</Text>
            </Box>
          </ModalBody>

          <ModalFooter justifyContent={"center"}>
            <ButtonGroup>
              <Button colorScheme="gray" flex="1" onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                flex="1"
                ml={3}
                onClick={handleDeleteUser}
              >
                Delete
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
