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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
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
            setIsAllValid({ ...isAllValid, title: false });
            setIsAllValid({ ...isAllValid, description: false });
        } catch (error) {
            console.error('Error adding module:', error);
        }
        // window.location.reload(); // refresh to see new module added (should change to not reloading)
    };

    const handleClose = () => {
        setTitle("");
        setDescription("");
        setIsAllValid({ ...isAllValid, title: false });
        setIsAllValid({ ...isAllValid, description: false });
        onClose();
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
        <>
            <Loading loading={isLoading} />
            <Modal isOpen={isOpen} onClose={handleClose}>
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
                            <Button colorScheme="gray" flex="1" onClick={handleClose}>
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
        </>
    );
}

{ /* Modal Edit Module */ }
interface EditModuleModalProps {
    isOpen: boolean;
    onClose: () => void;
    successEdit: () => void;
    moduleId: number
}

export function EditModuleModal({
    isOpen,
    onClose,
    successEdit,
    moduleId,
}: EditModuleModalProps) {
    const [editedTitle, setEditedTitle] = useState('');
    const [editedDescription, setEditedDescription] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const newAxiosInstance = axios.create(axiosConfig());
    const [isAllValid, setIsAllValid] = useState({
        title: false,
        description: false,
    });

    useEffect(() => { // Fetch Data to Get Module Detail
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const res = await newAxiosInstance.get(`${config.REST_API_URL}/modul/${moduleId}`);
                if (res.data.status === 200) {
                    setEditedTitle(res.data.data.title);
                    setEditedDescription(res.data.data.description);
                    setTitle(res.data.data.title);
                    setDescription(res.data.data.description);
                } else { }
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching module data:', error);
            }
        };
        fetchData();
    }, [moduleId]);

    const handleEditModule = async () => {
        try {
            setIsLoading(true);
            const response = await newAxiosInstance.put(`${config.REST_API_URL}/modul/${moduleId}`, {
                title: title,
                description: description,
            });

            console.log('Module edited successfully:', response.data.message);

            setIsLoading(false);
            successEdit(); // Refresh new data without reloading page
            setIsAllValid({ ...isAllValid, title: false });
            setIsAllValid({ ...isAllValid, description: false });
        } catch (error) {
            console.error('Error editing module:', error);
        }
        // window.location.reload(); // refresh to see new module added (should change to not reloading)
    };

    const handleClose = () => {
        setTitle(editedTitle);
        setDescription(editedDescription);
        setIsAllValid({ ...isAllValid, title: false });
        setIsAllValid({ ...isAllValid, description: false });
        onClose();
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length > 0) {
            setTitle(e.target.value);
            setIsAllValid({ ...isAllValid, title: true });
        } else {
            setTitle(editedTitle);
            setIsAllValid({ ...isAllValid, title: false });
        }
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (e.target.value.length > 0) {
            setDescription(e.target.value);
            setIsAllValid({ ...isAllValid, description: true });
        } else {
            setDescription(editedDescription);
            setIsAllValid({ ...isAllValid, description: false });
        }
    };

    return (
        <>
            <Loading loading={isLoading} />
            <Modal isOpen={isOpen} onClose={handleClose}>
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
                                // value={editedTitle}
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
                                placeholder={description}
                                size="lg"
                                // value={editedDescription}
                                onChange={handleDescriptionChange}
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter justifyContent={"center"}>
                        <ButtonGroup>
                            <Button colorScheme="gray" flex="1" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button colorScheme="purple" flex="1" ml={3}
                                onClick={handleEditModule}
                                isDisabled={
                                    !(
                                        isAllValid.title ||
                                        isAllValid.description
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

{ /* Modal Delete */ }
interface DeleteModuleModalProps {
    isOpen: boolean;
    onClose: () => void;
    successDelete: () => void;
    moduleId: number;
}

export function DeleteModuleModal({
    isOpen,
    onClose,
    successDelete,
    moduleId,
}: DeleteModuleModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const newAxiosInstance = axios.create(axiosConfig());

    const handleDeleteModule = async () => {
        try {
            setIsLoading(true);
            const response = await newAxiosInstance.delete(`${config.REST_API_URL}/modul/${moduleId}`);

            console.log('Module Deleted successfully:', response.data.message);

            setIsLoading(false);
            successDelete(); // Refresh new data without reloading page
        } catch (error) {
            console.error('Error deleting module:', error);
        }
        // window.location.reload(); // refresh to see new module added (should change to not reloading)
    };
    return (
        <>
            <Loading loading={isLoading} />
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
                            <Button colorScheme="red" flex="1" ml={3}
                            onClick={handleDeleteModule}
                            >
                                Delete
                            </Button>
                        </ButtonGroup>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
