import {
    Box,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    ModalFooter,
    ButtonGroup,
    Button,
    Container
} from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiError } from "react-icons/bi";
import { axiosConfig } from "../../utils/axios";
import axios from "axios";
import config from "../../config/config";
import Loading from "../loading/Loading";

{/* Modal Add Module*/ }
interface AddModuleModalProps {
    isOpen: boolean;
    onClose: () => void;
    successAdd: () => void;
    courseId: number;
}

export function AddModuleModal({
    isOpen,
    onClose,
    successAdd,
    courseId,
}: AddModuleModalProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const newAxiosInstance = axios.create(axiosConfig());
    const [isAllValid, setIsAllValid] = useState({
        title: false,
        description: false,
    });
    const handleAddModule = async () => {
        try {
            setIsLoading(true);
            console.log("berhasil yeah");
            const response = await newAxiosInstance.post(`${config.REST_API_URL}/modul`, {
                title: title,
                description: description,
                course_id: courseId,
            });

            console.log('Module added successfully:', response.data.message);

            // Clear the form after successful submission if needed
            setTitle('');
            setDescription('');
            setIsLoading(false);
            successAdd(); // Refresh new data without reloading page
        } catch (error) {
            console.error('Error adding module:', error);
        }
        // window.location.reload(); // refresh to see new module added (should change to not reloading)
    };

    const checkTitle = () => {
        setTitle((prevTitle) => {
            const isValid = prevTitle.trim().length > 0;
            setIsAllValid((prev) => ({ ...prev, title: isValid }));
            return prevTitle;
        });
    };

    const checkDescription = () => {
        setDescription((prevDescription) => {
            const isValid = prevDescription.trim().length > 0;
            setIsAllValid((prev) => ({ ...prev, description: isValid }));
            return prevDescription;
        });
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
        checkTitle();
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
        checkDescription();
    };

    return (
        <Container>
            <Loading loading={isLoading} />
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader bg="#d78dff" textAlign={"center"}>
                        Add New Module
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                                Module Title
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
                                value={title}
                                onChange={handleTitleChange}
                            />

                            <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                                Module Description
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
                                value={description}
                                onChange={handleDescriptionChange}
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter justifyContent={"center"}>
                        <ButtonGroup>
                            <Button colorScheme="gray" flex="1" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme="purple" flex="1" ml={3}
                                onClick={handleAddModule}
                                isDisabled={
                                    !(
                                        isAllValid.title &&
                                        isAllValid.description
                                    )
                                }
                            >
                                Add
                            </Button>
                        </ButtonGroup>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Container>
    );
}

{ /* Modal Edit */ }
interface EditModuleModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description: string;
    handleEdit: () => void;
}

export function EditModuleModal({
    isOpen,
    onClose,
    title,
    description,
    handleEdit,
}: EditModuleModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader bg="#d78dff" textAlign={"center"}>
                    Edit Module
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                            Module Title
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
                            Module Description
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

{ /* Modal Delete */ }
interface DeleteModuleModalProps {
    isOpen: boolean;
    onClose: () => void;
    course_id: number;
    handleDelete: () => void;
}

export function DeleteModuleModal({
    isOpen,
    onClose,
    course_id,
    handleDelete,
}: DeleteModuleModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader textAlign={"center"}>Delete Module</ModalHeader>
                <ModalCloseButton />
                <ModalBody textAlign={"center"}>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Text as={BiError} fontSize={"150px"} color="red" />
                        <Text>Are you sure want to delete this module?</Text>
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
