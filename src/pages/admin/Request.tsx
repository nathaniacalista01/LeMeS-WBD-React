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
    Tfoot,
    Tr,
    Th,
    Td,
} from "@chakra-ui/react";
import { BiSolidTrash, BiCheckCircle, BiError, BiUpvote, BiChevronLeftCircle, BiChevronRightCircle } from "react-icons/bi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { Users } from "../../types"
import Loading from "../../components/loading/Loading";
import { axiosConfig } from "../../utils/axios";
import config from "../../config/config";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { IconContext } from "react-icons";

const Request = () => {
    const initialUsers: Users[] = [];
    const [users, setUsers] = useState(initialUsers);
    const [refresher, setRefresher] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);
    const newAxiosInstance = axios.create(axiosConfig());
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const toast = useToast();
    const navigate = useNavigate();
    const n = 6;


    // FETCHING THE USER DATA (INI MSIH MAKE DATA LIST SEMUA USER, TINGGAL GANTI KE USER YG LGI REQUEST)
    useEffect(() => {
        const getCourses = async (pageNumber: number) => {
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

        getCourses(page);
    }, [page, refresher]);

    // HANDLING REJECT REQUEST
    const [isModalRejectingOpen, setIsModalRejectingOpen] = useState(false);
    const [rejectingID, setRejectingID] = useState(0);
    const [rejectingUsername, setRejectingUsername] = useState("");
    const openModalRejecting = (id: number, username: string) => {
        setIsModalRejectingOpen(true);
        setRejectingID(id);
        setRejectingUsername(username);
    };
    const closeModalRejecting = () => {
        setIsModalRejectingOpen(false);
    };
    const handleRejecting = () => {
        // Handle the Rejecting action here, e.g., send an API request to update the data
        // After Rejecting is complete, close the modal.
        closeModalRejecting();
    };

    // HANDLING ACC REQUEST
    const [isModalAcceptingOpen, setIsModalAcceptingOpen] = useState(false);
    const [acceptingID, setAcceptingID] = useState(0);
    const [acceptingUsername, setAcceptingUsername] = useState("");
    const openModalAccepting = (id: number, username: string) => {
        setIsModalAcceptingOpen(true);
        setAcceptingID(id);
        setAcceptingUsername(username);
    };
    const closeModalAccepting = () => {
        setIsModalAcceptingOpen(false);
    };
    const handleAccepting = () => {
        // Handle the Accepting action here, e.g., send an API request to update the data
        // After Accepting is complete, close the modal.
        closeModalAccepting();
    };

    const handlePageChange = (event: { first: number }) => {
        const newPage = Math.floor(event.first / n) + 1;
        setPage(newPage);
    }

    return (
        <Container overflow="auto" maxW={"100vw"} maxH={"100vh"}>
            {/* Render the RejectingModal component conditionally */}
            <Loading loading={isLoading} />
            <RejectingModal
                isOpen={isModalRejectingOpen}
                onClose={closeModalRejecting}
                user_id={rejectingID}
                username={rejectingUsername}
                handleRejecting={handleRejecting}
            />

            {/* Render the AcceptingModal component conditionally */}
            <AcceptingModal
                isOpen={isModalAcceptingOpen}
                onClose={closeModalAccepting}
                user_id={acceptingID}
                username={acceptingUsername}
                handleAccepting={handleAccepting}
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
                        mb="5"
                    >
                        <Heading as="h1">User Upgrade Request</Heading>
                    </Box>
                    <TableContainer width="80vw" border="1px" borderColor={"#564c95"} borderRadius="10">
                        <Table colorScheme='purple' fontSize={"16"}>
                            <Thead bg="#564c95" textColor="white" fontWeight={"bold"}>
                                <Tr>
                                    <Th textAlign={"center"} color="white" w="10%">UserID</Th>
                                    <Th textAlign={"center"} color="white" w="25%">Username</Th>
                                    <Th textAlign={"center"} color="white" w="35%">Fullname</Th>
                                    <Th textAlign={"center"} color="white" w="10%">isAdmin</Th>
                                    <Th textAlign={"center"} color="white" w="20%">Action</Th>
                                </Tr>
                            </Thead>
                            {users
                                .sort((a, b) => a.id - b.id)
                                .map((item, index) => (
                                    <Tbody>
                                        <Tr key={item.id} bg={index % 2 === 0 ? 'white' : 'gray.100'}>
                                            <Td textAlign={"center"}>{item.id}</Td>
                                            <Td textAlign={"center"}>{item.username}</Td>
                                            <Td textAlign={"center"}>{item.fullname}</Td>
                                            {item.isAdmin ? (
                                                <Td textAlign={"center"} fontWeight={"bold"}>
                                                    Yes
                                                </Td>
                                            ) : (
                                                <Td textAlign={"center"} fontWeight={"bold"}>
                                                    No
                                                </Td>
                                            )}
                                            <Td textAlign={"center"}>
                                                <Icon
                                                    mr="1"
                                                    as={BiCheckCircle}
                                                    fontSize={"24"}
                                                    color={"#564c95"}
                                                    _hover={{ color: "green" }}
                                                    cursor={"pointer"}
                                                    onClick={() =>
                                                        openModalAccepting(item.id, item.username)
                                                    }
                                                ></Icon>

                                                <Icon
                                                    ml="1"
                                                    as={BiSolidTrash}
                                                    fontSize={"24"}
                                                    color={"#564c95"}
                                                    _hover={{ color: "red" }}
                                                    cursor={"pointer"}
                                                    onClick={() =>
                                                        openModalRejecting(item.id, item.username)
                                                    }
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
    /* Modal Rejecting */
}
interface RejectingModalProps {
    isOpen: boolean;
    onClose: () => void;
    user_id: number;
    username: string;
    handleRejecting: () => void;
}

function RejectingModal({
    isOpen,
    onClose,
    user_id,
    username,
    handleRejecting,
}: RejectingModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader textAlign={"center"}>Reject Request</ModalHeader>
                <ModalCloseButton />
                <ModalBody textAlign={"center"}>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Text as={BiError} fontSize={"150px"} color="red" />
                        <Text>Decline request from {username}?</Text>
                    </Box>
                </ModalBody>

                <ModalFooter justifyContent={"center"}>
                    <ButtonGroup>
                        <Button colorScheme="gray" flex="1" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme="red" flex="1" ml={3} onClick={handleRejecting}>
                            Decline
                        </Button>
                    </ButtonGroup>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

{
    /* Modal Accepting */
}
interface AcceptingModalProps {
    isOpen: boolean;
    onClose: () => void;
    user_id: number;
    username: string;
    handleAccepting: () => void;
}

function AcceptingModal({
    isOpen,
    onClose,
    user_id,
    username,
    handleAccepting,
}: AcceptingModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader textAlign={"center"}>Accept Request</ModalHeader>
                <ModalCloseButton />
                <ModalBody textAlign={"center"}>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Text as={BiUpvote} fontSize={"150px"} color="green" />
                        <Text>Upgrade {username} to be user premium?</Text>
                    </Box>
                </ModalBody>

                <ModalFooter justifyContent={"center"}>
                    <ButtonGroup>
                        <Button colorScheme="gray" flex="1" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            colorScheme="purple"
                            flex="1"
                            ml={3}
                            onClick={handleAccepting}
                        >
                            Accept
                        </Button>
                    </ButtonGroup>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default Request;
