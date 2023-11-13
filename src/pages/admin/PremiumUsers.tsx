import React, { useState } from 'react';
import {
    Box,
    Heading,
    Button,
    Container,
    Flex,
    TableContainer,
    Icon,
    useDisclosure,
    Text,
    ButtonGroup,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Textarea,
    Select,
} from '@chakra-ui/react';
import {
    BiSolidTrash,
    BiSolidEdit,
    BiError
} from 'react-icons/bi'
import { Link } from 'react-router-dom';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const UsersList = () => {
    type users = {
        user_id: number;
        username: string;
        fullname: string;
        role: string;
    };

    const cancelRef = React.useRef<HTMLButtonElement | null>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [users, setUsers] = useState([
        { user_id: 1, username: 'User1', fullname: 'user1', role: "student" },
        { user_id: 5, username: 'User2', fullname: 'Courszxcze5zxczxczxczxczx', role: "student" },
        { user_id: 5, username: 'User12', fullname: 'Courszxcze5zxczxczxczxczx', role: "admin" },
        { user_id: 2, username: 'User4', fullname: 'user2', role: "student" },
        { user_id: 3, username: 'User7', fullname: 'user3', role: "teacher" },
    ]);

    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [editedUsername, setEditedUsername] = useState('');
    const [editedFullname, setEditedFullname] = useState('');
    const [editedRole, setEditedRole] = useState('');
    const openModalEdit = (id: number, username: string, fullname: string, role: string) => {
        setIsModalEditOpen(true);
        setEditedUsername(username);
        setEditedFullname(fullname);
        setEditedRole(role);
    };
    const closeModalEdit = () => {
        setIsModalEditOpen(false);
    };
    const handleEdit = () => {
        // Handle the editing action here, e.g., send an API request to update the data
        // You can use the editedTitle and editedDescription state variables
        // to send the updated data.
        // After editing is complete, close the modal.
        closeModalEdit();
    }

    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [deletedID, setDeletedID] = useState(0);
    const openModalDelete = (id: number) => {
        setIsModalDeleteOpen(true);
        setDeletedID(id);
    };
    const closeModalDelete = () => {
        setIsModalDeleteOpen(false);
    };
    const handleDelete = () => {
        // Handle the Deleteing action here, e.g., send an API request to update the data
        // You can use the DeleteedTitle and DeleteedDescription state variables
        // to send the updated data.
        // After Deleteing is complete, close the modal.
        closeModalDelete();
    };

    return (
        <Container
            overflow="auto"
            maxW={"100vw"}
            maxH={"100vh"}>
            {/* Render the EditUserModal component conditionally */}
            <EditUserModal
                isOpen={isModalEditOpen}
                onClose={closeModalEdit}
                username={editedUsername}
                fullname={editedFullname}
                role={editedRole}
                handleEdit={handleEdit}
            />

            {/* Render the DeleteUserModal component conditionally */}
            <DeleteUserModal
                isOpen={isModalDeleteOpen}
                onClose={closeModalDelete}
                user_id={deletedID}
                handleDelete={handleDelete}
            />
            <Flex alignItems='center' justifyContent='center' mb='20px' mt='50px'>
                <Flex
                    direction='column'
                    background='transparent'
                    borderRadius='15px'
                    p='30px'
                    // mx={{ base: "100px" }}
                    bg={"#f2f2f2"}
                    boxShadow='0 20px 27px 0 rgb(0 0 0 / 15%)'>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mt="-5">
                        <Heading as="h1">
                            Premium Users
                        </Heading>
                        <Box>
                            <Button bg="#9d4bff" textColor="white" _hover={{ bg: "#23004d" }} my="5">
                                <Link to="/admin/register">
                                    Add Users
                                </Link>
                            </Button>
                        </Box>
                    </Box>
                    <TableContainer width="80vw">
                        <DataTable
                            stripedRows
                            value={users}
                            paginator
                            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageInput"
                            rows={5}>
                            <Column field="user_id" header="UserID" headerClassName="custom-header"></Column>
                            <Column field="username" header="Username" headerClassName="custom-header"></Column>
                            <Column field="fullname" header="Full Name" headerClassName="custom-header"></Column>
                            <Column field="role" header="Role" headerClassName="custom-header"></Column>
                            <Column header="Action" headerClassName="custom-header" body={rowData => (
                                <span>
                                    <Icon
                                        as={BiSolidEdit}
                                        fontSize={"24"}
                                        color={"#564c95"}
                                        _hover={{ color: "green" }}
                                        cursor={"pointer"}
                                        onClick={() => openModalEdit(rowData.user_id, rowData.username, rowData.fullname, rowData.role)}>
                                    </Icon>

                                    <Icon
                                        as={BiSolidTrash}
                                        fontSize={"24"}
                                        color={"#564c95"}
                                        _hover={{ color: "red" }}
                                        cursor={"pointer"}
                                        onClick={() => openModalDelete(rowData.user_id)}>
                                    </Icon>
                                </span>
                            )} >
                            </Column>
                        </DataTable>
                    </TableContainer>
                </Flex>
            </Flex >
        </Container >
    );
};

{/* Modal Edit */ }
interface EditUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    username: string;
    fullname: string;
    role: string;
    handleEdit: () => void;
}

function EditUserModal({
    isOpen,
    onClose,
    username,
    fullname,
    role,
    handleEdit,
}: EditUserModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader bg="#d78dff" textAlign={"center"}>Edit Premium User</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel ms='4px' fontSize='sm' fontWeight='bold'>
                            Username
                        </FormLabel>
                        <Input
                            isRequired
                            variant='outline'
                            bg="white"
                            borderRadius='15px'
                            mb="5"
                            fontSize='sm'
                            placeholder={username}
                            size='lg'
                        />

                        <FormLabel ms='4px' fontSize='sm' fontWeight='bold'>
                            Fullname
                        </FormLabel>
                        <Input
                            isRequired
                            variant='outline'
                            bg="white"
                            borderRadius='15px'
                            mb="5"
                            fontSize='sm'
                            placeholder={fullname}
                            size='lg'
                        />

                        <FormLabel ms='4px' fontSize='sm' fontWeight='bold'>
                            Role
                        </FormLabel>
                        <Select placeholder={'Change Role'}>
                            <option value='student'>Student</option>
                            <option value='teacher'>Teacher</option>
                            <option value='admin'>Admin</option>
                        </Select>
                    </FormControl>
                </ModalBody>

                <ModalFooter justifyContent={"center"}>
                    <ButtonGroup>
                        <Button colorScheme='gray' flex="1" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme='purple' flex="1" ml={3} onClick={handleEdit}>
                            Edit
                        </Button>
                    </ButtonGroup>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

{/* Modal Delete */ }
interface DeleteUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    user_id: number;
    handleDelete: () => void;
}

function DeleteUserModal({
    isOpen,
    onClose,
    user_id,
    handleDelete,
}: DeleteUserModalProps) {
    return (
        < Modal isOpen={isOpen} onClose={onClose} >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader textAlign={"center"}>Delete User</ModalHeader>
                <ModalCloseButton />
                <ModalBody textAlign={"center"}>
                    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                        <Text as={BiError} fontSize={"150px"} color="red" />
                        <Text>
                            Are you sure want to delete this User?
                        </Text>
                    </Box>
                </ModalBody>

                <ModalFooter justifyContent={"center"}>
                    <ButtonGroup>
                        <Button colorScheme='gray' flex="1" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme='red' flex="1" ml={3} onClick={handleDelete}>
                            Delete
                        </Button>
                    </ButtonGroup>
                </ModalFooter>
            </ModalContent>
        </Modal >
    );
};

export default UsersList;