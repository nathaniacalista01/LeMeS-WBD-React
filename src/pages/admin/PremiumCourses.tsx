import React, { useEffect, useState } from "react";
import {
  ModalCloseButton,
  TableContainer,
  ModalOverlay,
  ModalContent,
  FormControl,
  ModalHeader,
  ModalFooter,
  ButtonGroup,
  FormLabel,
  Container,
  ModalBody,
  useToast,
  Heading,
  Button,
  Table,
  Modal,
  Thead,
  Tbody,
  Input,
  Text,
  Flex,
  Icon,
  Box,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import Loading from "../../components/loading/Loading";
import ReactPaginate from "react-paginate";
import config from "../../config/config";
import axios from "axios";
import { axiosConfig, axiosInstance } from "../../utils/axios";
import { IconContext } from "react-icons";
import { Courses } from "../../types";
import {
  BiSolidTrash,
  BiError,
  BiChevronLeftCircle,
  BiChevronRightCircle,
  BiSolidEdit,
} from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const CoursesList = () => {
  const initialCourses: Courses[] = [];
  const [courses, setCourses] = useState(initialCourses);
  const [refresher, setRefresher] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const newAxiosInstance = axios.create(axiosConfig());
  const toast = useToast();
  const navigate = useNavigate();
  const n = 6;

  // FETCH DATA COURSES
  useEffect(() => {
    const getCourses = async (pageNumber: number) => {
      try {
        setIsLoading(true);
        const res = await newAxiosInstance.get(
          `${config.REST_API_URL}/course?page=${pageNumber}`
        );
        const { status } = res["data"];
        if (status !== 200) {
          navigate("/not-found");
        }
        setTotalPages(Math.ceil(res.data.total / n));

        const coursesData: Courses[] = res.data.data.map((course: any) => {
          return {
            id: course.id,
            title: course.title,
            description: course.description,
            release_date: course.release_date,
            image_path: course.image_path,
            teacher_id: course.teacher_id,
          };
        });
        setCourses(coursesData);
        setIsLoading(false);
      } catch (error) {
        console.error("Axios Error:", error);
        setIsLoading(false);
      }
    };

    getCourses(page);
  }, [page, refresher]);

  // HANDLING ADD COURSE
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const openModalAdd = () => {
    setIsModalAddOpen(true);
  };
  const closeModalAdd = () => {
    setIsModalAddOpen(false);
  };

  // HANDLING EDIT COURSE
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [editDescription, setEditedDescription] = useState("");
  const [editTeacher, setEditedTeacher] = useState(0);
  const [editImage, setEditedImage] = useState("");
  const [editTitle, setEditedTitle] = useState("");
  const [editReleaseDate, setEditedReleaseDate] = useState("");
  const [editID, setEditID] = useState(0);
  const openModalEdit = (
    id: number,
    title: string,
    description: string,
    image_path: string,
    release_date: string,
    teacher_id: number
  ) => {
    setEditID(id);
    setEditedTitle(title);
    setEditedDescription(description);
    setEditedImage(image_path);
    setEditedReleaseDate(release_date);
    setEditedTeacher(teacher_id);
    setIsModalEditOpen(true);
  };
  const closeModalEdit = () => {
    setIsModalEditOpen(false);
  };

  const successEdit = () => {
    setRefresher((prevRefresh) => !prevRefresh);
  };

  // HANDLING DELETE COURSE
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [deleteID, setDeleteID] = useState(0);
  const [deleteTitle, setDeleteTitle] = useState("");
  const [deletePath, setDeletePath] = useState("");
  const openModalDelete = (id: number, title: string, image: string) => {
    setDeleteID(id);
    setDeleteTitle(title);
    setDeletePath(image);
    setIsModalDeleteOpen(true);
  };
  const closeModalDelete = () => {
    setIsModalDeleteOpen(false);
  };

  const successDelete = () => {
    closeModalDelete();
    setRefresher((prevRefresh) => !prevRefresh); // lgsung request data baru tanpa hrus reload page (harusnya works)
  };

  return (
    <Container overflow="auto" maxW={"100vw"} maxH={"100vh"}>
      {/* Render the EditModal component conditionally */}
      <Loading loading={isLoading} />
      <ModalEdit
        isOpen={isModalEditOpen}
        onClose={closeModalEdit}
        successEdit={successEdit}
        editTitle={editTitle}
        editDescription={editDescription}
        courseId={editID}
        image_path={editImage}
        teacher_id={editTeacher}
      />

      {/* Render the DeleteModal component conditionally */}
      <ModalDelete
        isOpen={isModalDeleteOpen}
        onClose={closeModalDelete}
        title={deleteTitle}
        oldFile={deletePath}
        oldId={deleteID}
        successDelete={successDelete}
      />

      <ModalAdd
        isOpen={isModalAddOpen}
        onClose={closeModalAdd}
        successAdd={successEdit}
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
                _hover={{ bg: "#23004d" }}
                my="5"
                onClick={openModalAdd}
              >
                Add Course
              </Button>
            </Box>
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
                  <Th textAlign={"center"} color="white" w="10%">
                    CourseID
                  </Th>
                  <Th textAlign={"center"} color="white" w="25%">
                    Title
                  </Th>
                  <Th textAlign={"center"} color="white" w="35%">
                    Description
                  </Th>
                  <Th textAlign={"center"} color="white" w="10%">
                    Release Date
                  </Th>
                  <Th textAlign={"center"} color="white" w="20%">
                    Action
                  </Th>
                </Tr>
              </Thead>
              {courses
                .sort((a, b) => a.id - b.id)
                .map((item, index) => (
                  <Tbody>
                    <Tr
                      key={item.id}
                      bg={index % 2 === 0 ? "white" : "gray.100"}
                    >
                      <Td textAlign={"center"}>{item.id}</Td>
                      <Td textAlign={"center"} fontWeight={"bold"}>
                        {item.title}
                      </Td>
                      <Td textAlign={"center"}>{item.description}</Td>
                      <Td textAlign={"center"}>
                        {item.release_date.substring(0, 10)}
                      </Td>
                      <Td textAlign={"center"}>
                        <Icon
                          as={BiSolidEdit}
                          fontSize={"24"}
                          color={"#564c95"}
                          _hover={{ color: "green" }}
                          cursor={"pointer"}
                          onClick={() =>
                            openModalEdit(
                              item.id,
                              item.title,
                              item.description,
                              item.image_path,
                              item.release_date,
                              item.teacher_id
                            )
                          }
                        ></Icon>

                        <Icon
                          as={BiSolidTrash}
                          fontSize={"24"}
                          color={"#564c95"}
                          _hover={{ color: "red" }}
                          cursor={"pointer"}
                          onClick={() =>
                            openModalDelete(
                              item.id,
                              item.title,
                              item.image_path
                            )
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
  /* Modal Add */
}
interface ModalAddProps {
  isOpen: boolean;
  onClose: () => void;
  successAdd: () => void;
}

function ModalAdd({ isOpen, onClose, successAdd }: ModalAddProps) {
  const axiosInstance = axios.create(axiosConfig());
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newDescription, setNewDescription] = useState<string>("");
  const [newTeacher, setNewTeacher] = useState("");
  const [fileName, setFileName] = useState<string>("");
  const [teacherError, setTeacherError] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAllValid, setIsAllValid] = useState({
    title: false,
    description: false,
    teacher: false,
    file: false,
  });

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      setNewTitle(e.target.value);
      setIsAllValid((prevState) => ({
        ...prevState,
        title: true,
      }));
    } else {
      setNewTitle("");
      setIsAllValid((prevState) => ({
        ...prevState,
        title: false,
      }));
    }
  };

  const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      setNewDescription(e.target.value);
      setIsAllValid((prevState) => ({
        ...prevState,
        description: true,
      }));
    } else {
      setNewDescription("");
      setIsAllValid((prevState) => ({
        ...prevState,
        description: false,
      }));
    }
  };

  const handleChangeTeacher = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      try {
        const id = e.target.value.replace(/\s/g, "");
        axiosInstance.get(`${config.REST_API_URL}/user/${id}`).then((res) => {
          if (res.data.status != 200) {
            setTeacherError("Teacher with this ID is not available");
            setIsAllValid((prevState) => ({
              ...prevState,
              teacher: false,
            }));
          } else {
            setTeacherError("");
            setNewTeacher(e.target.value);
            setIsAllValid((prevState) => ({
              ...prevState,
              teacher: true,
            }));
          }
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      setTeacherError("Teacher with this ID is not available");
      setIsAllValid((prevState) => ({
        ...prevState,
        teacher: false,
      }));
    }
  };

  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };
  useEffect(() => {
    const checkFile = () => {
      if (selectedFile) {
        setFileName(selectedFile.name.replace(/\s/g, ""));
        setIsAllValid({ ...isAllValid, file: true });
      } else {
        setSelectedFile(null);
        setIsAllValid({ ...isAllValid, file: false });
      }
    };
    checkFile();
  }, [selectedFile]);

  const handleClose = () => {
    onClose();
    setTeacherError("");
    setIsAllValid({
      ...isAllValid,
      title: false,
      description: false,
      teacher: false,
      file: false,
    });
  };

  const upload = () => {
    const formData = new FormData();
    if (selectedFile) {
      formData.append("file", selectedFile);
    }
    axiosInstance
      .post(`${config.REST_API_URL}/course/image`, formData)
      .then((res) => {})
      .catch((er) => console.log(er));
  };

  const handleAdd = async () => {
    try {
      setIsLoading(true);
      try {
        upload();
      } catch (error) {
        console.error("Error uploading:", error);
      } finally {
        const response = await axiosInstance.post(
          `${config.REST_API_URL}/course`,
          {
            title: newTitle,
            description: newDescription,
            image_path: fileName,
            teacher_id: parseInt(newTeacher),
          }
        );
        const { status, data } = response;
        if (status === 200) {
          toast({
            title: "Success adding course!",
            description: "New premium course has been added!",
            status: "success",
            isClosable: true,
            duration: 3000,
            position: "top",
          });
        } else {
          toast({
            title: "Failed adding course!",
            description: "Course has not been added",
            status: "error",
            isClosable: true,
            duration: 3000,
            position: "top",
          });
        }
        setIsLoading(false);
        successAdd();
      }
    } catch (error) {
      console.error("Error adding course:", error);
    }
    handleClose();
  };

  return (
    <>
      <Loading loading={isLoading} />
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bg="#d78dff" textAlign={"center"}>
            Add Premium Course
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                New Title
              </FormLabel>
              <Input
                isRequired
                variant="outline"
                bg="white"
                borderRadius="15px"
                mb="5"
                fontSize="sm"
                placeholder={"Insert New Title Course"}
                size="lg"
                onChange={handleChangeTitle}
              />

              <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                New Description
              </FormLabel>
              <Input
                isRequired
                variant="outline"
                bg="white"
                borderRadius="15px"
                mb="5"
                fontSize="sm"
                placeholder={"Insert Description"}
                size="lg"
                onChange={handleChangeDescription}
              />

              <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                ID Teacher Assigned
              </FormLabel>
              <Input
                isRequired
                bg="white"
                borderRadius="15px"
                mb="12px"
                fontSize="sm"
                placeholder={"Assign Teacher"}
                size="lg"
                onKeyPress={(e) => {
                  if (e.key === " ") {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => {
                  const sanitizedValue = e.target.value.replace(/[^0-9]/g, "");
                  e.target.value = sanitizedValue;
                  handleChangeTeacher(e);
                }}
              />
              {newTeacher && !isAllValid.teacher && (
                <Text color="red.400" fontSize="12px" mt="-2" mb="2">
                  {teacherError}
                </Text>
              )}

              <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                Course Image
              </FormLabel>
              <Input
                fontSize="sm"
                border="none"
                type="file"
                accept="image/*"
                size="lg"
                onChange={handleChangeFile}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter justifyContent={"center"}>
            <ButtonGroup>
              <Button colorScheme="gray" flex="1" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                colorScheme="purple"
                flex="1"
                ml={3}
                onClick={handleAdd}
                isDisabled={
                  !(
                    isAllValid.title &&
                    isAllValid.description &&
                    isAllValid.file &&
                    isAllValid.teacher
                  )
                }
              >
                Add
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

{
  /* Modal Edit */
}
interface ModalEditProps {
  isOpen: boolean;
  onClose: () => void;
  successEdit: () => void;
  editTitle: string;
  editDescription: string;
  courseId: number;
  image_path: string;
  teacher_id: number;
}

function ModalEdit({
  isOpen,
  onClose,
  successEdit,
  editTitle,
  editDescription,
  courseId,
  image_path,
  teacher_id,
}: ModalEditProps) {
  const axiosInstance = axios.create(axiosConfig());
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newDescription, setNewDescription] = useState<string>("");
  const [newTeacher, setNewTeacher] = useState("");
  const [fileName, setFileName] = useState<string>("");
  const [oldTitle, setOldTitle] = useState<string>("");
  const [oldDescription, setOldDescription] = useState<string>("");
  const [oldTeacher, setOldTeacher] = useState("");
  const [oldFileName, setOldFileName] = useState<string>("");
  const [teacherError, setTeacherError] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAllValid, setIsAllValid] = useState({
    title: false,
    description: false,
    teacher: false,
    file: false,
  });

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      setNewTitle(e.target.value);
      setIsAllValid((prevState) => ({
        ...prevState,
        title: true,
      }));
    } else {
      setNewTitle(oldTitle);
      setIsAllValid((prevState) => ({
        ...prevState,
        title: false,
      }));
    }
  };

  const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      setNewDescription(e.target.value);
      setIsAllValid((prevState) => ({
        ...prevState,
        description: true,
      }));
    } else {
      setNewDescription(oldDescription);
      setIsAllValid((prevState) => ({
        ...prevState,
        description: false,
      }));
    }
  };

  const handleChangeTeacher = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      try {
        const id = e.target.value.replace(/\s/g, "");
        axiosInstance.get(`${config.REST_API_URL}/user/${id}`).then((res) => {
          if (res.data.status != 200) {
            setTeacherError("Teacher with this ID is not available");
            setNewTeacher(oldTeacher);
            setIsAllValid((prevState) => ({
              ...prevState,
              teacher: false,
            }));
          } else {
            setTeacherError("");
            setNewTeacher(e.target.value);
            setIsAllValid((prevState) => ({
              ...prevState,
              teacher: true,
            }));
          }
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      setTeacherError("");
      setNewTeacher(oldTeacher);
      setIsAllValid((prevState) => ({
        ...prevState,
        teacher: false,
      }));
    }
  };

  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };
  useEffect(() => {
    const checkFile = () => {
      if (selectedFile) {
        setFileName(selectedFile.name.replace(/\s/g, ""));
        setIsAllValid({ ...isAllValid, file: true });
      } else {
        setSelectedFile(null);
        setIsAllValid({ ...isAllValid, file: false });
      }
    };
    checkFile();
  }, [selectedFile]);

  const handleClose = () => {
    onClose();
    setTeacherError("");
    setIsAllValid({
      ...isAllValid,
      title: false,
      description: false,
      teacher: false,
      file: false,
    });
  };

  useEffect(() => {
    // Fetch Data to Get Course Detail
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await axiosInstance.get(
          `${config.REST_API_URL}/course/${courseId}`
        );
        if (res.data.status === 200) {
          setNewTitle(res.data.data.title);
          setNewDescription(res.data.data.description);
          setFileName(res.data.data.image_path);
          setNewTeacher(res.data.data.teacher_id);

          setOldTeacher(res.data.data.teacher_id);
          setOldTitle(res.data.data.title);
          setOldDescription(res.data.data.description);
          setOldFileName(res.data.data.image_path);
        } else {
          console.log("No response");
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [courseId]);

  const upload = () => {
    const formData = new FormData();
    if (oldFileName) {
      // Make a delete request to remove the old file
      axiosInstance
        .delete(`${config.REST_API_URL}/course/image/${oldFileName}`)
        .then(() => {
          console.log("Old file deleted successfully");
        })
        .catch((error) => {
          console.error("Error deleting old file:", error);
        });
    }
    if (selectedFile) {
      formData.append("file", selectedFile);
    }
    axiosInstance
      .post(`${config.REST_API_URL}/course/image`, formData)
      .then((res) => {})
      .catch((er) => console.log(er));
  };

  const handleEdit = async () => {
    try {
      setIsLoading(true);
      try {
        if (isAllValid.file) {
          upload();
        } else {
          setFileName(oldFileName);
        }
      } catch (error) {
        console.error("Error uploading:", error);
      } finally {
        const response = await axiosInstance.put(
          `${config.REST_API_URL}/course/${courseId}`,
          {
            title: newTitle,
            description: newDescription,
            image_path: fileName,
            teacher_id: newTeacher,
          }
        );
        const { status, data } = response;
        if (status === 200) {
          toast({
            title: "Edit success!",
            description: "Course has been edited successfully!",
            status: "success",
            isClosable: true,
            duration: 3000,
            position: "top",
          });
        } else {
          toast({
            title: "Edit failed!",
            description: "Course has not been deleted!",
            status: "error",
            isClosable: true,
            duration: 3000,
            position: "top",
          });
        }
        console.log("Course edited successfully:", response.data.message);
        setIsLoading(false);
        successEdit();
      }
    } catch (error) {
      console.error("Error editing course:", error);
    }
    handleClose();
  };

  return (
    <>
      <Loading loading={isLoading} />
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bg="#d78dff" textAlign={"center"}>
            Edit Premium Course
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                New Title
              </FormLabel>
              <Input
                isRequired
                variant="outline"
                bg="white"
                borderRadius="15px"
                mb="5"
                fontSize="sm"
                placeholder={editTitle}
                size="lg"
                onChange={handleChangeTitle}
              />

              <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                New Description
              </FormLabel>
              <Input
                isRequired
                variant="outline"
                bg="white"
                borderRadius="15px"
                mb="5"
                fontSize="sm"
                placeholder={editDescription}
                size="lg"
                onChange={handleChangeDescription}
              />

              <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                ID Teacher Assigned
              </FormLabel>
              <Input
                isRequired
                bg="white"
                borderRadius="15px"
                mb="12px"
                fontSize="sm"
                placeholder={oldTeacher}
                size="lg"
                onKeyPress={(e) => {
                  if (e.key === " ") {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => {
                  const sanitizedValue = e.target.value.replace(/[^0-9]/g, "");
                  e.target.value = sanitizedValue;
                  handleChangeTeacher(e);
                }}
              />
              {newTeacher && !isAllValid.teacher && (
                <Text color="red.400" fontSize="12px" mt="-2" mb="2">
                  {teacherError}
                </Text>
              )}

              <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                Course Image
              </FormLabel>
              <Input
                fontSize="sm"
                border="none"
                type="file"
                accept="image/*"
                size="lg"
                onChange={handleChangeFile}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter justifyContent={"center"}>
            <ButtonGroup>
              <Button colorScheme="gray" flex="1" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                colorScheme="purple"
                flex="1"
                ml={3}
                onClick={handleEdit}
                isDisabled={
                  !(
                    isAllValid.title ||
                    isAllValid.description ||
                    isAllValid.file ||
                    isAllValid.teacher
                  )
                }
              >
                Edit
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

{
  /* Modal Delete */
}
interface ModalDeleteProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  oldFile: string;
  oldId: number;
  successDelete: () => void;
}

function ModalDelete({
  isOpen,
  onClose,
  title,
  oldFile,
  oldId,
  successDelete,
}: ModalDeleteProps) {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const handleDelete = async () => {
    try {
      setIsLoading(true);
      axiosInstance.delete(`${config.REST_API_URL}/course/image/${oldFile}`);
      const response = await axiosInstance.delete(
        `${config.REST_API_URL}/course/${oldId}`
      );
      const { status, data } = response["data"];
      if (status === 200) {
        toast({
          title : "Delete success!",
          description : "Course has been deleted",
          status : "success",
          duration : 3000,
          isClosable : true,
          position : "top"
        });
      } else {
        toast({
          title: "Delete failed",
          description: "Course has not been deleted",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
      setIsLoading(false);
      successDelete();
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };
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
            <Text>Are you sure want to delete course {title} ?</Text>
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

export default CoursesList;
