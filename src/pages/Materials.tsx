import { useEffect, useState } from "react";
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
    Button,
} from "@chakra-ui/react";
import {
    BiSolidEdit,
    BiSolidTrash,
    BiPlusCircle,
    BiError,
} from "react-icons/bi";
import { useParams } from "react-router-dom";
import { Modules, Materials } from "../types"
import { EditModuleModal, AddModuleModal, DeleteModuleModal } from "../components/modals/module";
// import {  } from "../components/modals/material";
import { axiosConfig } from "../utils/axios";
import config from "../config/config";
import axios from "axios";
import ReactPlayer from "react-player";
import PdfViewer from "../components/pdfviewer/pdfviewer";
import Loading from "../components/loading/Loading";

const ModuleMaterials = () => {

    const { course_id } = useParams();
    const [course_id_int, setCourseIDInt] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const newAxiosInstance = axios.create(axiosConfig());

    // -------------------------------------- HANDLING LIST OF MODULES OF A COURSE ---------------------------------

    const initialModules: Modules[] = [];
    const [modules, setModules] = useState(initialModules);
    const [idSelectedModules, setIdSelectedModules] = useState(0);
    const [refreshModule, setRefreshModule] = useState(false);

    // FETCH DATA FROM SERVER
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
                setCourseIDInt(courseIdAsInt);
                getModules(courseIdAsInt);
            }
        }
    }, [refreshModule]);

    const handleClickModule = (id: number) => {
        getMaterials(id);
    }

    // HANDLING ADD MODULE
    const [isModalAddModuleOpen, setIsModalAddModuleOpen] = useState(false);
    const openModalAddModule = () => {
        setIsModalAddModuleOpen(true);
    };
    const closeModalAddModule = () => {
        setIsModalAddModuleOpen(false);
    };
    const successAddModule = () => {
        setIsModalAddModuleOpen(false);
        setRefreshModule((prevRefresh) => !prevRefresh);
    }

    // HANDLING EDIT MODULE
    const [isModalEditModuleOpen, setIsModalEditModuleOpen] = useState(false);

    const handleOpenEditModule = (id: number) => {
        setIdSelectedModules(id);
        openModalEditModule();
    }
    const openModalEditModule = () => {
        setIsModalEditModuleOpen(true);
    };
    const closeModalEditModule = () => {
        setIsModalEditModuleOpen(false);
        setRefreshModule(true);
    };
    const successEditModule = () => {
        setIsModalEditModuleOpen(false);
        setRefreshModule((prevRefresh) => !prevRefresh);
    }

    // HANDLING DELETE MODULE
    const [isModalDeleteOpen, setIsModalDeleteModuleOpen] = useState(false);
    const handleOpenDeleteModule = (id: number) => {
        setIdSelectedModules(id);
        openModalDeleteModule();
    }
    const openModalDeleteModule = () => {
        setIsModalDeleteModuleOpen(true);
    };
    const closeModalDeleteModule = () => {
        setIsModalDeleteModuleOpen(false);
    };
    const successDeleteModule = () => {
        setIsModalDeleteModuleOpen(false);
        setRefreshModule((prevRefresh) => !prevRefresh);
    }


    // -------------------------------------- HANDLING LIST OF MATERIALS OF A MODULE ---------------------------------

    const initialMaterials: Materials[] = [];
    const [materials, setMaterials] = useState(initialMaterials);
    const getMaterials = async (module_id: number) => {
        try {
            setIsLoading(true);
            const res = await newAxiosInstance.get(`${config.REST_API_URL}/modul/course/${module_id}`);
            const MaterialsData: Materials[] = res.data.data.map((module: any) => {
                return {
                    id: module.id,
                    title: module.title,
                    description: module.description,
                    module_id: module.module_id,
                };
            });
            setMaterials(MaterialsData);
            setIsLoading(false);
        } catch (error) {
            console.error('Axios Error:', error);
            setIsLoading(false);
        }
    }

    return (
        <Container overflow="auto" maxW={"100vw"} maxH={"100vh"}>
            <Loading loading={isLoading} />

            {/* --------------- MODULE POPUPS -------------------- */}
            <AddModuleModal
                isOpen={isModalAddModuleOpen}
                onClose={closeModalAddModule}
                successAdd={successAddModule}
                courseId={course_id_int}
            />
            <EditModuleModal
                isOpen={isModalEditModuleOpen}
                onClose={closeModalEditModule}
                successEdit={successEditModule}
                moduleId={idSelectedModules}
                />

            <DeleteModuleModal
                isOpen={isModalDeleteOpen}
                onClose={closeModalDeleteModule}
                successDelete={successDeleteModule}
                moduleId={idSelectedModules}
            />


            {/* --------------- MATERIAL POPUPS -------------------- */}
            {/* <AddMaterialModal
                isOpen={isModalAddOpen}
                onClose={closeModalAdd}
                handleAdd={handleAdd}
            /> */}


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
                                        {modules
                                            .sort((a, b) => a.id - b.id)
                                            .map((item) => (
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
                                                            onClick={() => handleClickModule(item.id)}
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
                                                            onClick={() => handleOpenEditModule(item.id)}
                                                        ></Icon>
                                                        <Icon
                                                            as={BiSolidTrash}
                                                            fontSize={"18"}
                                                            color={"#564c95"}
                                                            _hover={{ color: "red" }}
                                                            cursor={"pointer"}
                                                            onClick={() => handleOpenDeleteModule(item.id)}
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
                        onClick={() => openModalAddModule()}
                    ></Icon>
                </VStack>
                <VStack w="80%" h="95vh" mt="1rem" bg="white" >
                    {materials.length > 0 ? (
                        <Box w="100%" h="94%" overflow={"hidden"}>
                            <Box w="full" p="3" px="8">
                                <Text align="left" fontWeight={"bold"}>
                                    Materials
                                </Text>
                                <Divider mt="1" borderColor="black.500" borderWidth="1" />
                            </Box>
                            <Box
                                px="5"
                                w="100%"
                                h="95%"
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
                                }}>
                                {materials
                                    .sort((a, b) => a.id - b.id)
                                    .map((item) => (
                                        <Accordion allowToggle>
                                            <AccordionItem>
                                                <AccordionButton bg="#f0f0f0" borderRadius={"5"}>
                                                    <Box flex="1" textAlign="left">
                                                        {item.title}
                                                    </Box>
                                                    <AccordionIcon />
                                                    <Icon
                                                        as={BiSolidEdit}
                                                        fontSize={"18"}
                                                        color={"#564c95"}
                                                        _hover={{ color: "green" }}
                                                        cursor={"pointer"}
                                                    // onClick={() => openModalEditModule(item.id, item.title, item.description)}
                                                    ></Icon>
                                                    <Icon
                                                        as={BiSolidTrash}
                                                        fontSize={"18"}
                                                        color={"#564c95"}
                                                        _hover={{ color: "red" }}
                                                        cursor={"pointer"}
                                                        // onClick={() => openModalDelete(item.id)}
                                                    ></Icon>
                                                </AccordionButton>
                                                <AccordionPanel>
                                                    <Text align="left" fontSize={"sm"}>{item.description}</Text>
                                                    <PdfViewer pdfPath={"/Quiz-1.pdf"} />
                                                </AccordionPanel>
                                            </AccordionItem>
                                            <Divider mt="3" borderColor="transparent" />
                                        </Accordion>
                                    ))}
                            </Box>
                        </Box>
                    ) : (<Box
                        px="5"
                        w="100%"
                        h="94%">
                        <Box w="full" p="3">
                            <Text align="left" fontWeight={"bold"}>
                                No Material Available for This Module
                            </Text>
                            <Divider mt="1" borderColor="black.500" borderWidth="1" />
                        </Box>
                    </Box>
                    )}
                    <Icon
                        as={BiPlusCircle}
                        fontSize={"26"}
                        color={"#564c95"}
                        _hover={{ color: "green" }}
                        cursor={"pointer"}
                    // onClick={() => openModalAdd(item.module_id, item.title)}
                    ></Icon>
                </VStack>
            </HStack>
        </Container >
    );
};

export default ModuleMaterials;
