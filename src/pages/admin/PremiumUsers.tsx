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
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogCloseButton,
    AlertDialogBody,
    AlertDialogFooter,
} from '@chakra-ui/react';
import {
    BiSolidTrash,
    BiSolidEdit
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

    return (
        <Container
            overflow="auto"
            maxW={"100vw"}
            maxH={"100vh"}>
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
                                <Link to="/admin/addUsers">
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
                                        onClick={onOpen}>
                                    </Icon>
                                        <AlertDialog
                                            motionPreset='slideInBottom'
                                            leastDestructiveRef={cancelRef}
                                            onClose={onClose}
                                            isOpen={isOpen}
                                            isCentered
                                            >
                                            <AlertDialogOverlay />
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>Edit User Confirmation</AlertDialogHeader>
                                                        <AlertDialogCloseButton />
                                                            <AlertDialogBody>
                                                                Are you sure want to edit this user?
                                                            </AlertDialogBody>
                                                        <AlertDialogFooter>
                                                    <Button ref={cancelRef} onClick={onClose}>
                                                        No
                                                     </Button>
                                                     <Button colorScheme='blue' ml={3}>
                                                        <Link to="/admin/editusers">
                                                            Yes
                                                        </Link>
                                                    </Button>
                                                        </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                    
                                    <Icon 
                                        as={BiSolidTrash} 
                                        fontSize={"24"} 
                                        color={"#564c95"} 
                                        _hover={{ color: "red" }} 
                                        cursor={"pointer"}
                                        onClick={onOpen}>
                                    </Icon>
                                        <AlertDialog
                                            motionPreset='slideInBottom'
                                            leastDestructiveRef={cancelRef}
                                            onClose={onClose}
                                            isOpen={isOpen}
                                            isCentered
                                            >
                                        <AlertDialogOverlay />
                                            <AlertDialogContent>
                                                <AlertDialogHeader>Delete User Confirmation</AlertDialogHeader>
                                                    <AlertDialogCloseButton />
                                                        <AlertDialogBody>
                                                            Are you sure want to delete this user?
                                                        </AlertDialogBody>
                                                    <AlertDialogFooter>
                                                <Button ref={cancelRef} onClick={onClose}>
                                                    No
                                                </Button>
                                                <Button colorScheme='red' ml={3}>
                                                    <Link to="/admin/deleteusers">
                                                        Yes
                                                    </Link>
                                                </Button>
                                                    </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
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

export default UsersList;