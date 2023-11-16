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
} from "@chakra-ui/react";
import {
  BiSolidTrash,
  BiCheckCircle,
  BiError,
  BiUpvote,
  BiChevronLeftCircle,
  BiChevronRightCircle,
} from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { RequestType, Users } from "../../types";
import Loading from "../../components/loading/Loading";
import { axiosConfig } from "../../utils/axios";
import config from "../../config/config";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { IconContext } from "react-icons";

const Request = () => {
  const initialUsers: Users[] = [];
  const [requests, setRequests] = useState<RequestType[]>([]);
  const [refresher, setRefresher] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const newAxiosInstance = axios.create(axiosConfig());
  const toast = useToast();
  const navigate = useNavigate();
  const axiosInstance = axios.create(axiosConfig());
  const n = 6;

  // FETCHING THE USER DATA (INI MSIH MAKE DATA LIST SEMUA USER, TINGGAL GANTI KE USER YG LGI REQUEST)
  useEffect(() => {
    const getTotalPage = async () => {
      const res = await newAxiosInstance.get(
        `${config.REST_API_URL}/premium/total`
      );
      const { status } = res;
      if (status === 200) {
        const result = res["data"];
        const { status, data } = result;
        if (status === 200) {
          return data;
        }
      }
      return 0;
    };
    const getCourses = async (pageNumber: number) => {
      const totalRows = await getTotalPage();
      try {
        setIsLoading(true);
        const res = await newAxiosInstance.get(
          `${config.REST_API_URL}/premium?page=${pageNumber}`
        );
        setTotalPages(Math.ceil(totalRows / n));
        setRequests(res.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Axios Error:", error);
        setIsLoading(false);
      }
    };
    getCourses(page);
  }, [page, refresher]);

  // HANDLING REJECT REQUEST
  const [isModalRejectingOpen, setIsModalRejectingOpen] = useState(false);
  const [rejectingID, setRejectingID] = useState(0);
  const openModalRejecting = (id: number, user_id: number) => {
    setIsModalRejectingOpen(true);
    setRejectingID(id);
  };
  const closeModalRejecting = () => {
    setIsModalRejectingOpen(false);
  };
  const handleRejecting = () => {
    // Handle the Rejecting action here, e.g., send an API request to update the data
    // After Rejecting is complete, close the modal.
    closeModalRejecting();
    setRefresher((prevRefresh) => !prevRefresh); // lgsung request data baru tanpa hrus reload page (harusnya works)
  };

  // HANDLING ACC REQUEST
  const [isModalAcceptingOpen, setIsModalAcceptingOpen] = useState(false);
  const [acceptingID, setAcceptingID] = useState(0);
  const openModalAccepting = (user_id: number) => {
    setIsModalAcceptingOpen(true);
    setAcceptingID(user_id);
  };
  const closeModalAccepting = () => {
    setIsModalAcceptingOpen(false);
  };
  const handleAccepting = () => { 
    try {
      axiosInstance
        .put(`${config.REST_API_URL}/premium/${acceptingID}`, {
          newStatus: "ACCEPTED",
        })
        .then((res) => {
          const response = res["data"];
          const {status, data} = response;
          if(status === 200){
            toast({
              title : "Successfully upgrade user!",
              description : "User has been upgraded to premium!",
              status : "success",
              isClosable : true,
              duration : 3000,
              position : "top"
            })
          }else{
            toast({
              title : "Upgrade failed!",
              description : "User has not been upgraded to premium",
              status : "error",
              isClosable : true,
              duration : 3000,
              position : "top"
            })
          }
        });
    } catch (error) {
      console.log(error);
    }
    // After Accepting is complete, close the modal.
    closeModalAccepting();
    setRefresher((prevRefresh) => !prevRefresh); // lgsung request data baru tanpa hrus reload page (harusnya works)
  };

  return (
    <Container overflow="auto" maxW={"100vw"} maxH={"100vh"}>
      {/* Render the RejectingModal component conditionally */}
      <Loading loading={isLoading} />
      <RejectingModal
        isOpen={isModalRejectingOpen}
        onClose={closeModalRejecting}
        user_id={rejectingID}
        handleRejecting={handleRejecting}
      />

      {/* Render the AcceptingModal component conditionally */}
      <AcceptingModal
        isOpen={isModalAcceptingOpen}
        onClose={closeModalAccepting}
        user_id={acceptingID}
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
          <TableContainer
            width="80vw"
            border="1px"
            borderColor={"#564c95"}
            borderRadius="10"
          >
            <Table colorScheme="purple" fontSize={"16"}>
              <Thead bg="#564c95" textColor="white" fontWeight={"bold"}>
                <Tr>
                  <Th textAlign={"center"} color="white" w="25%">
                    User ID
                  </Th>
                  <Th textAlign={"center"} color="white" w="35%">
                    Status
                  </Th>

                  <Th textAlign={"center"} color="white" w="20%">
                    Action
                  </Th>
                </Tr>
              </Thead>
              {requests &&
                requests
                  .sort((a, b) => a.id - b.id)
                  .map((item, index) => (
                    <Tbody>
                      <Tr
                        key={item.id}
                        bg={index % 2 === 0 ? "white" : "gray.100"}
                      >
                        <Td textAlign={"center"}>{item.user_id}</Td>
                        <Td textAlign={"center"}>{item.status}</Td>
                        <Td textAlign={"center"}>
                          <Icon
                            mr="1"
                            as={BiCheckCircle}
                            fontSize={"24"}
                            color={"#564c95"}
                            _hover={{ color: "green" }}
                            cursor={"pointer"}
                            onClick={() => openModalAccepting(item.user_id)}
                          ></Icon>

                          <Icon
                            ml="1"
                            as={BiSolidTrash}
                            fontSize={"24"}
                            color={"#564c95"}
                            _hover={{ color: "red" }}
                            cursor={"pointer"}
                            onClick={() =>
                              openModalRejecting(item.id, item.user_id)
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
                  if ("selected" in selectedItem) {
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
  handleRejecting: () => void;
}

function RejectingModal({
  isOpen,
  onClose,
  user_id,
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
            <Text>Decline request from {user_id}?</Text>
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
  handleAccepting: () => void;
}

function AcceptingModal({
  isOpen,
  onClose,
  user_id,
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
            <Text>Upgrade {user_id} to be user premium?</Text>
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
