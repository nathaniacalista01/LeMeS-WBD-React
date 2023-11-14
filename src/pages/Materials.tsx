import {
    Container,
    HStack,
    VStack,
    Text,
    TableContainer,
    Table,
    Tr,
    Tbody,
    Td,
    Icon,
    Box,
    Divider,
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Modal,
    ModalOverlay,
    ModalHeader,
    ModalContent,
    ModalCloseButton,
    ModalBody,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    ModalFooter,
    ButtonGroup,
    Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
    BiSolidEdit,
    BiSolidTrash,
    BiPlusCircle,
    BiError,
} from "react-icons/bi";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import PdfViewer from "../components/pdfviewer/pdfviewer";
import { axiosConfig } from "../utils/axios";
import axios from "axios";
import config from "../config/config";
import { Modules, Materials } from "../types"

const ModuleMaterials = () => {
    const { course_id } = useParams();
    const initialModules: Modules[] = [];
    const [modules, setModules] = useState(initialModules);
    const [isLoading, setIsLoading] = useState(false);
    const newAxiosInstance = axios.create(axiosConfig());
    const navigate = useNavigate();
    const location = useLocation();

    const item = {
        module_id: 1,
        title: "Title",
    };

    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [editedTitle, setEditedTitle] = useState("");
    const [editedDescription, setEditedDescription] = useState("");
    const openModalEdit = (id: number, title: string) => {
        setIsModalEditOpen(true);
        setEditedTitle(title);
        // setEditedDescription(description);
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
    const openModalAdd = (module_id: number, title: string) => {
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

    useEffect(() => {
        const getModules = async (course_id: number) => {
            try {
                setIsLoading(true);
                const res = await newAxiosInstance.get(`${config.REST_API_URL}/modul/course/${course_id}`);
                const ModulesData: Modules[] = res.data.data.map((module: any) => {
                    return {
                        id: module.id,
                        title: module.title,
                        description: module.description,
                        course_id: module.course_id,
                    };
                });
                setModules(ModulesData);
                setIsLoading(false);
                console.log("berhasil yeah");
            } catch (error) {
                console.error('Axios Error:', error);
                setIsLoading(false);
            }
        }

        if (course_id === undefined || course_id === null) {
            console.error('Course ID is undefined or null');
        } else {
            const courseIdAsString: string = course_id.toString();
            const courseIdAsInt = parseInt(courseIdAsString, 10);

            if (isNaN(courseIdAsInt)) {
                console.error('Invalid course_id:', courseIdAsString);
            } else {
                getModules(courseIdAsInt);
            }
        }
    }, [course_id]);

    return (
        <Container overflow="auto" maxW={"100vw"} maxH={"100vh"}>
            {/* Render the EditMaterialModal component conditionally */}
            <EditMaterialModal
                isOpen={isModalEditOpen}
                onClose={closeModalEdit}
                title={editedTitle}
                description={editedDescription}
                handleEdit={handleEdit}
            />

            {/* Render the DeleteMaterialModal component conditionally */}
            <DeleteMaterialModal
                isOpen={isModalDeleteOpen}
                onClose={closeModalDelete}
                course_id={deletedID}
                handleDelete={handleDelete}
            />

            {/* Render the DeleteMaterialModal component conditionally */}
            <AddMaterialModal
                isOpen={isModalAddOpen}
                onClose={closeModalAdd}
                handleAdd={handleAdd}
            />
            <HStack align="start" justify="center">
                <VStack maxW="20%" maxH="95vh" mt="1rem">
                    <Text whiteSpace="normal" wordBreak="break-all" fontWeight={"bold"}>
                        Modules
                    </Text>
                    <Container
                        overflow="auto"
                        css={{
                            "::-webkit-scrollbar": {
                                width: "3px",
                            },
                            "::-webkit-scrollbar-thumb": {
                                background: "rgb(206, 207, 211)",
                            },
                            "::-webkit-scrollbar-track": {
                                background: "rgba(255, 255, 255, 0.8)",
                            },
                        }}
                    >
                        <TableContainer width="80vw">
                            <Table bg="white" borderRadius={"5"}>
                                {modules.length > 0 ? (
                                    <Tbody>
                                        {/* ITERATE HERE LOOPING DATABASE TO FILL TABLE */}
                                        {modules.map((item) => (
                                            <Tr key={item.id}>
                                                <Td
                                                    height="auto"
                                                    maxWidth="95%"
                                                    p="2"
                                                    whiteSpace="normal"
                                                    wordBreak="break-all"
                                                >
                                                    <Button
                                                        justifyContent={"left"}
                                                        w="100%"
                                                        bg="transparent"
                                                        onClick={() => navigate(`${location.pathname}/${item.id}`, { replace: true })}
                                                        style={{ textDecoration: 'none' }}
                                                    >
                                                        <Text fontSize={"sm"}>
                                                            {item.title}
                                                        </Text>
                                                    </Button>
                                                </Td>
                                                <Td width="5%" p="2">
                                                    <Icon
                                                        as={BiSolidEdit}
                                                        fontSize={"18"}
                                                        color={"#564c95"}
                                                        _hover={{ color: "green" }}
                                                        cursor={"pointer"}
                                                        onClick={() =>
                                                            openModalEdit(item.id, item.title)
                                                        }
                                                    ></Icon>
                                                    <Icon
                                                        as={BiSolidTrash}
                                                        fontSize={"18"}
                                                        color={"#564c95"}
                                                        _hover={{ color: "red" }}
                                                        cursor={"pointer"}
                                                        onClick={() => openModalDelete(item.id)}
                                                    ></Icon>
                                                </Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                ) : (
                                    <Tr>
                                        <Td>No module available</Td>
                                    </Tr>
                                )}
                            </Table>
                        </TableContainer>
                    </Container>
                    <Icon
                        as={BiPlusCircle}
                        fontSize={"26"}
                        color={"#564c95"}
                        _hover={{ color: "green" }}
                        cursor={"pointer"}
                        onClick={() => openModalAdd(item.module_id, item.title)}
                    ></Icon>
                </VStack>
                <VStack w="80%" h="95vh" mt="1rem" bg="white">
                    <Box w="full" p="3">
                        <Text align="left" fontWeight={"bold"}>
                            Module Title
                        </Text>
                        <Divider mt="1" borderColor="black.500" borderWidth="1" />
                    </Box>
                    <Box
                        w="98%"
                        h="86%"
                        px="8"
                        overflow="auto"
                        css={{
                            "::-webkit-scrollbar": {
                                width: "3px",
                            },
                            "::-webkit-scrollbar-thumb": {
                                background: "rgb(206, 207, 211)",
                            },
                            "::-webkit-scrollbar-track": {
                                background: "rgba(255, 255, 255, 0.8)",
                            },
                        }}
                    >
                        <Accordion allowToggle>
                            <AccordionItem>
                                <AccordionButton bg="#f0f0f0" borderRadius={"5"}>
                                    <Box flex="1" textAlign="left">
                                        Material Title
                                    </Box>
                                    <AccordionIcon />
                                    <Icon
                                        as={BiSolidEdit}
                                        fontSize={"18"}
                                        color={"#564c95"}
                                        _hover={{ color: "green" }}
                                        cursor={"pointer"}
                                        onClick={() => openModalEdit(item.module_id, item.title)}
                                    ></Icon>
                                    <Icon
                                        as={BiSolidTrash}
                                        fontSize={"18"}
                                        color={"#564c95"}
                                        _hover={{ color: "red" }}
                                        cursor={"pointer"}
                                        onClick={() => openModalDelete(item.module_id)}
                                    ></Icon>
                                </AccordionButton>
                                <AccordionPanel>
                                    <Text align="left">Material Description</Text>
                                    <PdfViewer pdfPath={"/Quiz-1.pdf"} />
                                </AccordionPanel>
                            </AccordionItem>
                            <Divider mt="3" borderColor="transparent" />
                        </Accordion>
                    </Box>
                    <Icon
                        as={BiPlusCircle}
                        fontSize={"26"}
                        color={"#564c95"}
                        _hover={{ color: "green" }}
                        cursor={"pointer"}
                        onClick={() => openModalAdd(item.module_id, item.title)}
                    ></Icon>
                </VStack>
            </HStack>
        </Container>
    );
};

{
    /* Modal Edit */
}
interface EditMaterialModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description: string;
    handleEdit: () => void;
}

function EditMaterialModal({
    isOpen,
    onClose,
    title,
    description,
    handleEdit,
}: EditMaterialModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader bg="#d78dff" textAlign={"center"}>
                    Edit Material
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                            Material Title
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
                            Material Description
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
                            Material File
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
interface DeleteMaterialModalProps {
    isOpen: boolean;
    onClose: () => void;
    course_id: number;
    handleDelete: () => void;
}

function DeleteMaterialModal({
    isOpen,
    onClose,
    course_id,
    handleDelete,
}: DeleteMaterialModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader textAlign={"center"}>Delete Material</ModalHeader>
                <ModalCloseButton />
                <ModalBody textAlign={"center"}>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Text as={BiError} fontSize={"150px"} color="red" />
                        <Text>Are you sure want to delete this material?</Text>
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
interface AddMaterialModalProps {
    isOpen: boolean;
    onClose: () => void;
    handleAdd: () => void;
}

function AddMaterialModal({
    isOpen,
    onClose,
    handleAdd,
}: AddMaterialModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader bg="#d78dff" textAlign={"center"}>
                    Add New Material
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                            Material Title
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
                            Material Description
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
                            File
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

export default ModuleMaterials;
