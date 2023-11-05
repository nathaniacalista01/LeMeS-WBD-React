import React, { useState } from 'react';
import {
    Box,
    Heading,
    Button,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Container,
    Flex,
    TableContainer,
    Icon,
} from '@chakra-ui/react';
import {
    BiSolidTrash,
    BiSolidEdit
} from 'react-icons/bi'
import { Link } from 'react-router-dom';

const UsersList = () => {
    type users = {
        user_id: number;
        username: string;
        fullname: string;
        role: string;
    };

    const [users, setUsers] = useState([
        { user_id: 1, username: 'User1', fullname: 'user1', role: "student" },
        { user_id: 5, username: 'User2', fullname: 'Courszxcze5zxczxczxczxczx', role: "student" },
        { user_id: 5, username: 'User12', fullname: 'Courszxcze5zxczxczxczxczx', role: "admin" },
        { user_id: 2, username: 'User4', fullname: 'user2', role: "student" },
        { user_id: 3, username: 'User7', fullname: 'user3', role: "teacher" },
        { user_id: 4, username: 'user 4', fullname: 'user4', role: "admin" },
        { user_id: 5, username: 'user 5', fullname: 'user5', role: "teacher" },
        { user_id: 5, username: 'user 5', fullname: 'xcuser5', role: "student" },
        { user_id: 5, username: 'user 5', fullname: 'Courszxcze5zxczxczxczxczx', role: "student" }
    ]);

    return (
        <Container
            minW={"70vw"}
            minH={"100vh"}
        >
            <Flex
                minH={"100vh"}
                align={"center"}
                justify={"center"}
                textColor={"black"}
                width={"auto"}
                py="6"
                ml="250"
            >
                <Box>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Heading as="h1">
                            Premium Users
                        </Heading>
                        <Box>
                            <Button bg="#9d4bff" textColor="white" _hover={{ bg: "#23004d" }} my="5">
                                <Link to="/admin/adduser">
                                    Add User
                                </Link>
                            </Button>
                        </Box>
                    </Box>

                    <Box>
                        <TableContainer width="65vw">
                            {/* HEADER TABLE */}
                            <Table variant="striped" colorScheme="purple">
                                <Thead>
                                    <Tr bg="#564c95" fontWeight={"bold"}>
                                        <Th color={"white"}>UserID</Th>
                                        <Th color={"white"}>Username</Th>
                                        <Th color={"white"}>Fullname</Th>
                                        <Th color={"white"}>Role</Th>
                                        <Th color={"white"}>Action</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {/* ITERATE HERE LOOPING DATABASE TO FILL TABLE */}
                                    {users.map((item) => (
                                        <Tr key={item.user_id}>
                                            <Td>{item.user_id}</Td>
                                            <Td>{item.username}</Td>
                                            <Td>{item.fullname}</Td>
                                            <Td>{item.role}</Td>
                                            <Td>
                                                <Link to={`/admin/edituser/${item.user_id}`} style={{ textDecoration: 'none' }}>
                                                    <Icon as={BiSolidEdit} fontSize={"24"} color={"#564c95"} _hover={{ color: "green" }}></Icon>
                                                </Link>
                                                <Link to={`/admin/deleteuser/${item.user_id}`} style={{ textDecoration: 'none' }}>
                                                    <Icon as={BiSolidTrash} fontSize={"24"} color={"#564c95"} _hover={{ color: "red" }}></Icon>
                                                </Link>
                                            </Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                            {/* Pagination component */}
                            {/* Replace with your pagination component */}
                        </TableContainer>
                    </Box>
                </Box>
            </Flex>
        </Container>
    );
};

export default UsersList;