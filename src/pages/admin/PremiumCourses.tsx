import React, { useState } from "react";
import {
  Box,
  Heading,
  Button,
  ButtonGroup,
  Container,
  Flex,
  TableContainer,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Textarea,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { BiSolidTrash, BiSolidEdit, BiError } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useDisclosure } from "@chakra-ui/react";

const CoursesList = () => {
  type courses = {
    course_id: number;
    title: string;
    description: string;
    course_password: number;
    release_date: string;
  };

  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const openModalEdit = (id: number, title: string, description: string) => {
    setIsModalEditOpen(true);
    setEditedTitle(title);
    setEditedDescription(description);
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
  };

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

  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const openModalAdd = () => {
    setIsModalAddOpen(true);
  };
  const closeModalAdd = () => {
    setIsModalAddOpen(false);
  };
  const handleAdd = () => {
    // Handle the Adding action here, e.g., send an API request to update the data
    // You can use the AddedTitle and AddedDescription state variables
    // to send the updated data.
    // After Adding is complete, close the modal.
    closeModalAdd();
  };

  const [courses, setCourses] = useState([
    {
      course_id: 1,
      title: "Course 1",
      description: "Course1",
      course_password: 12347,
      release_date: "1-1-2023",
    },
    {
      course_id: 5,
      title: "Course 5",
      description: "Courszxcze5zxczxczxczxczx",
      course_password: 12347,
      release_date: "1-1-2023",
    },
    {
      course_id: 2,
      title: "Course 2",
      description: "Course2",
      course_password: 12347,
      release_date: "1-1-2023",
    },
    {
      course_id: 3,
      title: "Course 3",
      description: "Course3",
      course_password: 12347,
      release_date: "1-1-2023",
    },
    {
      course_id: 5,
      title: "Course 5",
      description: "Courszxcze5zxczxczxczxczx",
      course_password: 12347,
      release_date: "1-1-2023",
    },
    {
      course_id: 4,
      title: "Course 4",
      description: "Course4",
      course_password: 12347,
      release_date: "1-1-2023",
    },
    {
      course_id: 5,
      title: "Course 5",
      description: "Course5",
      course_password: 12347,
      release_date: "1-1-2023",
    },
    {
      course_id: 5,
      title: "Course 5",
      description: "xcCourse5",
      course_password: 12347,
      release_date: "1-1-2023",
    },
    {
      course_id: 5,
      title: "Course 5",
      description: "Courszxcze5zxczxczxczxczx",
      course_password: 12347,
      release_date: "1-1-2023",
    },
    {
      course_id: 5,
      title: "Course 5",
      description: "Courszxcze5zxczxczxczxczx",
      course_password: 12347,
      release_date: "1-1-2023",
    },
    {
      course_id: 5,
      title: "Course 5",
      description: "Course5",
      course_password: 12347,
      release_date: "1-1-2023",
    },
    {
      course_id: 5,
      title: "Course 5",
      description: "Czxczxourse5",
      course_password: 12347,
      release_date: "1-1-2023",
    },
    {
      course_id: 5,
      title: "Course 5",
      description: "Course5",
      course_password: 12347,
      release_date: "1-1-2023",
    },
    {
      course_id: 5,
      title: "Course 5",
      description: "Courzxczxce5czxc",
      course_password: 12347,
      release_date: "1-1-2023",
    },
    {
      course_id: 5,
      title: "Course 5",
      description: "Course5",
      course_password: 12347,
      release_date: "1-1-2023",
    },
    {
      course_id: 5,
      title: "Course 5",
      description: "Courzxcse5czxzxczxvzxczxc",
      course_password: 12347,
      release_date: "1-1-2023",
    },
    {
      course_id: 5,
      title: "Course 5",
      description: "Courszxcze5zxczxczxczxczx",
      course_password: 12347,
      release_date: "1-1-2023",
    },
  ]);

  return (
    <Container overflow="auto" maxW={"100vw"} maxH={"100vh"}>
      {/* Render the EditCourseModal component conditionally */}
      <EditCourseModal
        isOpen={isModalEditOpen}
        onClose={closeModalEdit}
        title={editedTitle}
        description={editedDescription}
        handleEdit={handleEdit}
      />

      {/* Render the DeleteCourseModal component conditionally */}
      <DeleteCourseModal
        isOpen={isModalDeleteOpen}
        onClose={closeModalDelete}
        course_id={deletedID}
        handleDelete={handleDelete}
      />

      {/* Render the DeleteCourseModal component conditionally */}
      <AddCourseModal
        isOpen={isModalAddOpen}
        onClose={closeModalAdd}
        handleAdd={handleAdd}
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
            mt="-5"
          >
            <Heading as="h1">Premium Courses</Heading>
            <Box>
              <Button
                bg="#9d4bff"
                textColor="white"
                _hover={{ bg: "#23004d " }}
                my="5"
                onClick={openModalAdd}
              >
                Add Course
              </Button>
            </Box>
          </Box>
          <TableContainer width="80vw">
            <DataTable
              stripedRows
              value={courses}
              paginator
              paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageInput"
              rows={5}
              selectionMode="single"
            >
              <Column
                field="course_id"
                header="CourseID"
                headerClassName="custom-header"
              ></Column>
              <Column
                field="title"
                header="Title"
                headerClassName="custom-header"
              ></Column>
              <Column
                field="description"
                header="Description"
                headerClassName="custom-header"
              ></Column>
              <Column
                field="release_date"
                header="Release Date"
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
                      onClick={() =>
                        openModalEdit(
                          rowData.course_id,
                          rowData.title,
                          rowData.description
                        )
                      }
                    ></Icon>

                    <Icon
                      as={BiSolidTrash}
                      fontSize={"24"}
                      color={"#564c95"}
                      _hover={{ color: "red" }}
                      cursor={"pointer"}
                      onClick={() => openModalDelete(rowData.course_id)}
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
  /* Modal Edit */
}
interface EditCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  handleEdit: () => void;
}

function EditCourseModal({
  isOpen,
  onClose,
  title,
  description,
  handleEdit,
}: EditCourseModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader bg="#d78dff" textAlign={"center"}>
          Edit Premium Course
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
              Course Title
            </FormLabel>
            <Input
              isRequired
              variant="outline"
              bg="white"
              borderRadius="15px"
              mb="5"
              fontSize="sm"
              placeholder={title}
              size="lg"
            />

            <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
              Course Description
            </FormLabel>
            <Textarea
              isRequired
              h="50"
              maxHeight={"150"}
              bg="white"
              borderRadius="15px"
              mb="5"
              fontSize="sm"
              placeholder={description}
              size="lg"
            />
            <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
              Course Image (Optional)
            </FormLabel>
            <Input
              fontSize="sm"
              border="none"
              type="file"
              accept="image/*"
              size="lg"
            />
          </FormControl>
        </ModalBody>

        <ModalFooter justifyContent={"center"}>
          <ButtonGroup>
            <Button colorScheme="gray" flex="1" onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="purple" flex="1" ml={3} onClick={handleEdit}>
              Edit
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

{
  /* Modal Delete */
}
interface DeleteCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  course_id: number;
  handleDelete: () => void;
}

function DeleteCourseModal({
  isOpen,
  onClose,
  course_id,
  handleDelete,
}: DeleteCourseModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign={"center"}>Delete Course</ModalHeader>
        <ModalCloseButton />
        <ModalBody textAlign={"center"}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Text as={BiError} fontSize={"150px"} color="red" />
            <Text>Are you sure want to delete this course?</Text>
          </Box>
        </ModalBody>

        <ModalFooter justifyContent={"center"}>
          <ButtonGroup>
            <Button colorScheme="gray" flex="1" onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" flex="1" ml={3} onClick={handleDelete}>
              Delete
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

{
  /* Modal Add */
}
interface AddCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleAdd: () => void;
}

function AddCourseModal({ isOpen, onClose, handleAdd }: AddCourseModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader bg="#d78dff" textAlign={"center"}>
          Add New Premium Course
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
              Course Title
            </FormLabel>
            <Input
              isRequired
              variant="outline"
              bg="white"
              borderRadius="15px"
              mb="5"
              fontSize="sm"
              size="lg"
              placeholder={"Insert Title Here"}
            />

            <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
              Course Description
            </FormLabel>
            <Textarea
              isRequired
              h="50"
              maxHeight={"150"}
              bg="white"
              borderRadius="15px"
              mb="5"
              fontSize="sm"
              size="lg"
              placeholder={"Insert Description Here"}
            />

            <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
              Course Image
            </FormLabel>
            <Input
              isRequired
              fontSize="sm"
              border="none"
              type="file"
              accept="image/*"
              size="lg"
            />
          </FormControl>
        </ModalBody>

        <ModalFooter justifyContent={"center"}>
          <ButtonGroup>
            <Button colorScheme="gray" flex="1" onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="purple" flex="1" ml={3} onClick={handleAdd}>
              Add
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CoursesList;
