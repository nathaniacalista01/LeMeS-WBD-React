import React, { useState } from 'react';
import {
    Box,
    Heading,
    Button,
    Container,
    Flex,
    TableContainer,
    Icon,
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
import { useDisclosure } from '@chakra-ui/react';

const CoursesList = () => {
    type courses = {
        course_id: number;
        title: string;
        description: string;
        course_password: number;
        release_date: string;
    };
    const cancelRef = React.useRef<HTMLButtonElement | null>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [courses, setCourses] = useState([
        { course_id: 1, title: 'Course 1', description: 'Course1', course_password: 12347, release_date: "1-1-2023" },
        { course_id: 5, title: 'Course 5', description: 'Courszxcze5zxczxczxczxczx', course_password: 12347, release_date: "1-1-2023" },
        { course_id: 2, title: 'Course 2', description: 'Course2', course_password: 12347, release_date: "1-1-2023" },
        { course_id: 3, title: 'Course 3', description: 'Course3', course_password: 12347, release_date: "1-1-2023" },
        { course_id: 5, title: 'Course 5', description: 'Courszxcze5zxczxczxczxczx', course_password: 12347, release_date: "1-1-2023" },
        { course_id: 4, title: 'Course 4', description: 'Course4', course_password: 12347, release_date: "1-1-2023" },
        { course_id: 5, title: 'Course 5', description: 'Course5', course_password: 12347, release_date: "1-1-2023" },
        { course_id: 5, title: 'Course 5', description: 'xcCourse5', course_password: 12347, release_date: "1-1-2023" },
        { course_id: 5, title: 'Course 5', description: 'Courszxcze5zxczxczxczxczx', course_password: 12347, release_date: "1-1-2023" },
        { course_id: 5, title: 'Course 5', description: 'Courszxcze5zxczxczxczxczx', course_password: 12347, release_date: "1-1-2023" },
        { course_id: 5, title: 'Course 5', description: 'Course5', course_password: 12347, release_date: "1-1-2023" },
        { course_id: 5, title: 'Course 5', description: 'Czxczxourse5', course_password: 12347, release_date: "1-1-2023" },
        { course_id: 5, title: 'Course 5', description: 'Course5', course_password: 12347, release_date: "1-1-2023" },
        { course_id: 5, title: 'Course 5', description: 'Courzxczxce5czxc', course_password: 12347, release_date: "1-1-2023" },
        { course_id: 5, title: 'Course 5', description: 'Course5', course_password: 12347, release_date: "1-1-2023" },
        { course_id: 5, title: 'Course 5', description: 'Courzxcse5czxzxczxvzxczxc', course_password: 12347, release_date: "1-1-2023" },
        { course_id: 5, title: 'Course 5', description: 'Courszxcze5zxczxczxczxczx', course_password: 12347, release_date: "1-1-2023" },
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
                            Premium Courses
                        </Heading>
                        <Box>
                        <Button 
                            bg="#9d4bff"
                            textColor="white"
                            _hover={{ bg: "#23004d "}}
                            my="5"
                            onClick={onOpen}>Add Course</Button>
                        <AlertDialog
                            motionPreset='slideInBottom'
                            leastDestructiveRef={cancelRef}
                            onClose={onClose}
                            isOpen={isOpen}
                            isCentered
                        >
                            <AlertDialogOverlay />
    
                        <AlertDialogContent>
                        <AlertDialogHeader>Add Course Confirmation</AlertDialogHeader>
                        <AlertDialogCloseButton />
                        <AlertDialogBody>
                            Are you sure want to add premium course?
                            </AlertDialogBody>
                        <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            No
                        </Button>
                        <Button colorScheme='blue' ml={3}>
                            <Link to="/admin/addcourse">
                                Yes
                            </Link>
                        </Button>
                        </AlertDialogFooter>
                        </AlertDialogContent>
                        </AlertDialog>
                        </Box>
                    </Box>
                    <TableContainer width="80vw">
                        <DataTable
                            stripedRows
                            value={courses}
                            paginator
                            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageInput"
                            rows={5}>
                            <Column field="course_id" header="CourseID" headerClassName="custom-header"></Column>
                            <Column field="title" header="Title" headerClassName="custom-header"></Column>
                            <Column field="description" header="Description" headerClassName="custom-header"></Column>
                            <Column field="release_date" header="Release Date" headerClassName="custom-header"></Column>
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
                                    <AlertDialogHeader>Edit Course Confirmation</AlertDialogHeader>
                                    <AlertDialogCloseButton />
                                    <AlertDialogBody>
                                        Are you sure want to edit this course?
                                    </AlertDialogBody>
                                    <AlertDialogFooter>
                                    <Button ref={cancelRef} onClick={onClose}>
                                        No
                                    </Button>
                                    <Button colorScheme='blue' ml={3}>
                                    <Link to="/admin/editcourse">
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
                                    <AlertDialogHeader>Delete Course Confirmation</AlertDialogHeader>
                                    <AlertDialogCloseButton />
                                    <AlertDialogBody>
                                        Are you sure want to delete this course?
                                    </AlertDialogBody>
                                    <AlertDialogFooter>
                                    <Button ref={cancelRef} onClick={onClose}>
                                        No
                                    </Button>
                                    <Button colorScheme='red' ml={3}>
                                    <Link to="/admin/deletecourse">
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

export default CoursesList;
