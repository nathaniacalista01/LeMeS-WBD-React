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
    useColorModeValue,
} from '@chakra-ui/react';
import {
    BiSolidTrash,
    BiSolidEdit
} from 'react-icons/bi'
import { Link } from 'react-router-dom';

const CoursesList = () => {
    type courses = {
        course_id: number;
        title: string;
        description: string;
        course_password: number;
        release_date: string;
    };

    const [courses, setCourses] = useState([
        { course_id: 1, title: 'Course 1', description: 'Course1', course_password: 12347, release_date: "1-1-2023" },
        { course_id: 5, title: 'Course 5', description: 'Courszxcze5zxczxczxczxczx', course_password: 12347, release_date: "1-1-2023" },
        { course_id: 2, title: 'Course 2', description: 'Course2', course_password: 12347, release_date: "1-1-2023" },
        { course_id: 3, title: 'Course 3', description: 'Course3', course_password: 12347, release_date: "1-1-2023" },
        { course_id: 5, title: 'Course 5', description: 'Courszxcze5zxczxczxczxczx', course_password: 12347, release_date: "1-1-2023" },
        { course_id: 4, title: 'Course 4', description: 'Course4', course_password: 12347, release_date: "1-1-2023" },
        { course_id: 5, title: 'Course 5', description: 'Course5', course_password: 12347, release_date: "1-1-2023" },
        // { course_id: 5, title: 'Course 5', description: 'xcCourse5', course_password: 12347, release_date: "1-1-2023" },
        // { course_id: 5, title: 'Course 5', description: 'Courszxcze5zxczxczxczxczx', course_password: 12347, release_date: "1-1-2023" },
        // { course_id: 5, title: 'Course 5', description: 'Courszxcze5zxczxczxczxczx', course_password: 12347, release_date: "1-1-2023" },
        // { course_id: 5, title: 'Course 5', description: 'Course5', course_password: 12347, release_date: "1-1-2023" },
        // { course_id: 5, title: 'Course 5', description: 'Czxczxourse5', course_password: 12347, release_date: "1-1-2023" },
        // { course_id: 5, title: 'Course 5', description: 'Course5', course_password: 12347, release_date: "1-1-2023" },
        // { course_id: 5, title: 'Course 5', description: 'Courzxczxce5czxc', course_password: 12347, release_date: "1-1-2023" },
        // { course_id: 5, title: 'Course 5', description: 'Course5', course_password: 12347, release_date: "1-1-2023" },
        // { course_id: 5, title: 'Course 5', description: 'Courzxcse5czxzxczxvzxczxc', course_password: 12347, release_date: "1-1-2023" },
        // { course_id: 5, title: 'Course 5', description: 'Courszxcze5zxczxczxczxczx', course_password: 12347, release_date: "1-1-2023" },
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
                    bg={useColorModeValue("#f2f2f2", "gray.700")}
                    boxShadow='0 20px 27px 0 rgb(0 0 0 / 15%)'>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mt="-5">
                        <Heading as="h1">
                            Premium Courses
                        </Heading>
                        <Box>
                            <Button bg="#9d4bff" textColor="white" _hover={{ bg: "#23004d" }} my="5">
                                <Link to="/admin/addcourse">
                                    Add Course
                                </Link>
                            </Button>
                        </Box>
                    </Box>
                    <TableContainer width="80vw">
                        {/* HEADER TABLE */}
                        <Table variant="striped" colorScheme="purple">
                            <Thead>
                                <Tr bg="#564c95" fontWeight={"bold"}>
                                    <Th color={"white"}>CourseID</Th>
                                    <Th color={"white"}>Title</Th>
                                    <Th color={"white"}>Description</Th>
                                    <Th color={"white"}>Release Date</Th>
                                    <Th color={"white"}>Action</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {/* ITERATE HERE LOOPING DATABASE TO FILL TABLE */}
                                {courses.map((item, index) => (
                                    <Tr
                                        key={index}
                                        _even={{ bg: 'white' }}
                                    >
                                        <Td>{item.course_id}</Td>
                                        <Td>{item.title}</Td>
                                        <Td>{item.description}</Td>
                                        <Td>{item.release_date}</Td>
                                        <Td>
                                            <Link to={`/admin/edit-course/${item.course_id}`} style={{ textDecoration: 'none' }}>
                                                <Icon as={BiSolidEdit} fontSize={"24"} color={"#564c95"} _hover={{ color: "green" }}></Icon>
                                            </Link>
                                            <Link to={`/admin/delete-course/${item.course_id}`} style={{ textDecoration: 'none' }}>
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
                </Flex>
            </Flex>
        </Container >
    );
};

export default CoursesList;