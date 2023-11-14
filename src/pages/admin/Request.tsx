import React, { useState } from "react";
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
} from "@chakra-ui/react";
import { BiSolidTrash, BiCheckCircle, BiError, BiUpvote } from "react-icons/bi";
import { Link } from "react-router-dom";
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
    { user_id: 1, username: "User1", fullname: "user1", role: "student" },
    {
      user_id: 5,
      username: "User2",
      fullname: "Courszxcze5zxczxczxczxczx",
      role: "student",
    },
    {
      user_id: 5,
      username: "User12",
      fullname: "Courszxcze5zxczxczxczxczx",
      role: "admin",
    },
    { user_id: 2, username: "User4", fullname: "user2", role: "student" },
    { user_id: 3, username: "User7", fullname: "user3", role: "teacher" },
  ]);

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

  return (
    <Container overflow="auto" maxW={"100vw"} maxH={"100vh"}>
      {/* Render the RejectingModal component conditionally */}
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
          <TableContainer width="80vw">
            <DataTable
              stripedRows
              value={users}
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
                      as={BiCheckCircle}
                      fontSize={"24"}
                      color={"#564c95"}
                      _hover={{ color: "green" }}
                      cursor={"pointer"}
                      onClick={() =>
                        openModalAccepting(rowData.user_id, rowData.username)
                      }
                    ></Icon>

                    <Icon
                      as={BiSolidTrash}
                      fontSize={"24"}
                      color={"#564c95"}
                      _hover={{ color: "red" }}
                      cursor={"pointer"}
                      onClick={() =>
                        openModalRejecting(rowData.user_id, rowData.username)
                      }
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
