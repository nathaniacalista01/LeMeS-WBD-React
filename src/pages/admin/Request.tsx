import React, { useState } from 'react';
import {
    Box,
    Heading,
    Container,
    Flex,
    TableContainer,
    Icon,
} from '@chakra-ui/react';
import {
    BiSolidTrash,
    BiCheckCircle
} from 'react-icons/bi'
import { Link } from 'react-router-dom';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const Request = () => {
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
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb="5">
                        <Heading as="h1">
                            User Upgrade Request
                        </Heading>
                    </Box>
                    <TableContainer width="80vw">
                        <DataTable
                            stripedRows
                            value={users}
                            paginator
                            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageInput"
                            rows={5}
                            selectionMode="single">
                            <Column field="user_id" header="UserID" headerClassName="custom-header"></Column>
                            <Column field="username" header="Username" headerClassName="custom-header"></Column>
                            <Column field="fullname" header="Full Name" headerClassName="custom-header"></Column>
                            <Column field="role" header="Role" headerClassName="custom-header"></Column>
                            <Column header="Action" headerClassName="custom-header" body={rowData => (
                                <span>
                                    <Icon as={BiCheckCircle} fontSize={"24"} color={"#564c95"} _hover={{ color: "green" }} cursor={"pointer"}></Icon>
                                    <Icon as={BiSolidTrash} fontSize={"24"} color={"#564c95"} _hover={{ color: "red" }} cursor={"pointer"}></Icon>
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

export default Request;