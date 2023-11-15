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
import { ChangeEvent, createRef, useEffect, useState } from "react";
import { BiError } from "react-icons/bi";
import { axiosConfig } from "../../utils/axios";
import axios from "axios";
import config from "../../config/config";
import Loading from "../loading/Loading";

{/* Modal Add Material*/ }
interface AddMaterialModalProps {
    isOpen: boolean;
    onClose: () => void;
    successAdd: () => void;
    moduleId: number;
}

export function AddMaterialModal({
    isOpen,
    onClose,
    successAdd,
    moduleId,
}: AddMaterialModalProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const newAxiosInstance = axios.create(axiosConfig());
    const [fileType, setFileType] = useState("");
    const [fileName, setFileName] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isAllValid, setIsAllValid] = useState({
        title: false,
        description: false,
        file: false,
    });
    const handleAddMaterial = async () => {
        try {
            setIsLoading(true);
            try {
                upload();
            } catch (error) {
                console.error('Error uploading:', error);
            } finally {
                const response = await newAxiosInstance.post(`${config.REST_API_URL}/material/`, {
                    title: title,
                    description: description,
                    source_type: fileType,
                    material_path: fileName,
                    modul_id: moduleId,
                });

                console.log('Material added successfully:', response.data.message);

                // Clear the form after successful submission if needed
                setTitle('');
                setDescription('');
                setIsLoading(false);
                successAdd(); // Refresh new data without reloading page
            }
        } catch (error) {
            console.error('Error adding material:', error);
        } finally {
            setIsAllValid(prevState => ({
                ...prevState,
                title: false,
                description: false,
                file: false,
            }));
        }
        // window.location.reload(); // refresh to see new material added (should change to not reloading)
    };

    const upload = () => {
        const formData = new FormData()
        if (selectedFile) {
            formData.append('file', selectedFile)
        }
        newAxiosInstance.post(`${config.REST_API_URL}/material/upload`, formData)
            .then(res => { })
            .catch(er => console.log(er))
    }

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files?.[0];

            if (file) {
                // const name = file.name;
                // const type = file.type;
                setSelectedFile(file);
                if (file.type.startsWith('video')) {
                    setFileType('VIDEO');
                } else {
                    setFileType('PDF');
                }

                setFileName(file.name);

                setIsAllValid({ ...isAllValid, file: true });
            } else {
                setIsAllValid({ ...isAllValid, file: false });
            }
        } else {
            setSelectedFile(null);
            setIsAllValid({ ...isAllValid, file: false });
        }
    };

    const handleClose = () => {
        setTitle("");
        setDescription("");
        setIsAllValid(prevState => ({
            ...prevState,
            title: false,
            description: false,
            file: false,
        }));
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
                                value={title}
                                onChange={handleTitleChange}
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
                                value={description}
                                onChange={handleDescriptionChange}
                            />

                            <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                                Material File
                            </FormLabel>
                            <Input
                                fontSize="sm"
                                border="none"
                                type="file"
                                accept=".pdf, video/*"
                                size="lg"
                                onChange={handleFileChange}
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter justifyContent={"center"}>
                        <ButtonGroup>
                            <Button colorScheme="gray" flex="1" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button colorScheme="purple" flex="1" ml={3}
                                onClick={handleAddMaterial}
                                isDisabled={
                                    !(
                                        isAllValid.title &&
                                        isAllValid.description &&
                                        isAllValid.file
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

{ /* Modal Edit Material */ }
interface EditMaterialModalProps {
    isOpen: boolean;
    onClose: () => void;
    successEdit: () => void;
    materialId: number
}

export function EditMaterialModal({
    isOpen,
    onClose,
    successEdit,
    materialId,
}: EditMaterialModalProps) {
    const [editedTitle, setEditedTitle] = useState('');
    const [editedDescription, setEditedDescription] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const newAxiosInstance = axios.create(axiosConfig());
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileType, setFileType] = useState("");
    const [fileName, setFileName] = useState("");
    const [oldFile, setOldFile] = useState("");
    const [isAllValid, setIsAllValid] = useState({
        title: false,
        description: false,
        file: false,
    });

    useEffect(() => { // Fetch Data to Get Material Detail
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const res = await newAxiosInstance.get(`${config.REST_API_URL}/material/${materialId}`);
                if (res.data.status === 200) {
                    setEditedTitle(res.data.data.title);
                    setEditedDescription(res.data.data.description);
                    setTitle(res.data.data.title);
                    setDescription(res.data.data.description);
                    setOldFile(res.data.data.material_path);
                } else { }
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching material data:', error);
            }
        };
        fetchData();
    }, [materialId]);

    const handleEditMaterial = async () => {
        try {
            setIsLoading(true);
            try {
                if (isAllValid.file) {
                    upload();
                } else {
                    setFileName(oldFile);
                }
            } catch (error) {
                console.error('Error uploading:', error);
            } finally {
                const response = await newAxiosInstance.put(`${config.REST_API_URL}/material/${materialId}`, {
                    title: title,
                    description: description,
                    source_type: fileType,
                    material_path: fileName,
                });

                console.log('Material edited successfully:', response.data.message);
                setIsLoading(false);
                successEdit(); // Refresh new data without reloading page
            }
        } catch (error) {
            console.error('Error editing material:', error);
        } finally {
            // window.location.reload(); // refresh to see new material added (should change to not reloading)
            setIsAllValid(prevState => ({
                ...prevState,
                title: false,
                description: false,
                file: false,
            }));
        }
    };

    const upload = () => {
        const formData = new FormData()
        if (oldFile) {
            // Make a delete request to remove the old file
            newAxiosInstance.delete(`${config.REST_API_URL}/material/deleteFile/${oldFile}`)
                .then(() => {
                    console.log('Old file deleted successfully');
                })
                .catch((error) => {
                    console.error('Error deleting old file:', error);
                });
        }
        if (selectedFile) {
            formData.append('file', selectedFile)
        }
        newAxiosInstance.post(`${config.REST_API_URL}/material/upload`, formData)
            .then(res => { })
            .catch(er => console.log(er))
    }

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files?.[0];

            if (file) {
                // const name = file.name;
                // const type = file.type;
                setSelectedFile(file);
                if (file.type.startsWith('video')) {
                    setFileType('VIDEO');
                } else {
                    setFileType('PDF');
                }

                setFileName(file.name);

                setIsAllValid({ ...isAllValid, file: true });
            } else {
                setIsAllValid({ ...isAllValid, file: false });
            }
        } else {
            setSelectedFile(null);
            setIsAllValid({ ...isAllValid, file: false });
        }
    };

    const handleClose = () => {
        setTitle(editedTitle);
        setDescription(editedDescription);
        setIsAllValid(prevState => ({
            ...prevState,
            title: false,
            description: false,
            file: false,
        }));
        onClose();
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length > 0) {
            setTitle(e.target.value);
            setIsAllValid(prevState => ({
                ...prevState,
                title: true,
            }));
        } else {
            setTitle(editedTitle);
            setIsAllValid(prevState => ({
                ...prevState,
                title: false,
            }));
        }
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (e.target.value.length > 0) {
            setDescription(e.target.value);
            setIsAllValid(prevState => ({
                ...prevState,
                description: true,
            }));
        } else {
            setDescription(editedDescription);
            setIsAllValid(prevState => ({
                ...prevState,
                description: false,
            }));
        }
    };

    return (
        <>
            <Loading loading={isLoading} />
            <Modal isOpen={isOpen} onClose={handleClose}>
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
                                // value={editedTitle}
                                onChange={handleTitleChange}
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
                                // value={editedDescription}
                                onChange={handleDescriptionChange}
                            />

                            <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                                Material File
                            </FormLabel>
                            <Input
                                fontSize="sm"
                                border="none"
                                type="file"
                                accept=".pdf, video/*"
                                size="lg"
                                onChange={handleFileChange}
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter justifyContent={"center"}>
                        <ButtonGroup>
                            <Button colorScheme="gray" flex="1" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button colorScheme="purple" flex="1" ml={3}
                                onClick={handleEditMaterial}
                                isDisabled={
                                    !(
                                        isAllValid.title ||
                                        isAllValid.description ||
                                        isAllValid.file
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
interface DeleteMaterialModalProps {
    isOpen: boolean;
    onClose: () => void;
    successDelete: () => void;
    materialId: number;
}

export function DeleteMaterialModal({
    isOpen,
    onClose,
    successDelete,
    materialId,
}: DeleteMaterialModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [oldFile, setOldFile] = useState("");
    const newAxiosInstance = axios.create(axiosConfig());

    useEffect(() => { // Fetch Data to Get Material Detail
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const res = await newAxiosInstance.get(`${config.REST_API_URL}/material/${materialId}`);
                if (res.data.status === 200) {
                    setOldFile(res.data.data.material_path);
                } else { }
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching material data:', error);
            }
        };
        fetchData();
    }, [materialId]);

    const handleDeleteMaterial = async () => {
        try {
            setIsLoading(true);
            // Make a delete request to remove the old file
            newAxiosInstance.delete(`${config.REST_API_URL}/material/deleteFile/${oldFile}`)
                .then(() => {
                    console.log('Old file deleted successfully');
                })
                .catch((error) => {
                    console.error('Error deleting old file:', error);
                });

            const response = await newAxiosInstance.delete(`${config.REST_API_URL}/material/${materialId}`);

            console.log('Material Deleted successfully:', response.data.message);

            setIsLoading(false);
            successDelete(); // Refresh new data without reloading page
        } catch (error) {
            console.error('Error deleting material:', error);
        }
        // window.location.reload(); // refresh to see new material added (should change to not reloading)
    };
    return (
        <>
            <Loading loading={isLoading} />
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
                            <Button colorScheme="red" flex="1" ml={3}
                                onClick={handleDeleteMaterial}
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
