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
} from "react-icons/bi";
import { useParams } from "react-router-dom";
import { Modules, Materials } from "../types";
import {
  EditModuleModal,
  AddModuleModal,
  DeleteModuleModal,
} from "../components/modals/module";
import {
  EditMaterialModal,
  AddMaterialModal,
  DeleteMaterialModal,
} from "../components/modals/material";
import { axiosConfig } from "../utils/axios";
import config from "../config/config";
import axios from "axios";
import ReactPlayer from "react-player";
// import { Document, Page } from "react-pdf";
import "pdfjs-dist/build/pdf.worker.entry";
// import PdfViewer from "../components/pdfviewer/pdfviewer";
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
        const res = await newAxiosInstance.get(
          `${config.REST_API_URL}/modul/course/${course_id}`
        );
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
        console.error("Axios Error:", error);
        setIsLoading(false);
      }
    };

    if (course_id === undefined || course_id === null) {
      console.error("Course ID is undefined or null");
    } else {
      const courseIdAsString: string = course_id.toString();
      const courseIdAsInt = parseInt(courseIdAsString, 10);

      if (isNaN(courseIdAsInt)) {
        console.error("Invalid course_id:", courseIdAsString);
      } else {
        setCourseIDInt(courseIdAsInt);
        getModules(courseIdAsInt);
      }
    }
  }, [refreshModule]);

  const handleClickModule = (id: number) => {
    setIdSelectedModules((prevId) => {
      // console.log(prevId); // This will log the previous state
      return id;
    });
    getMaterials(id);
  };

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
  };

  // HANDLING EDIT MODULE
  const [isModalEditModuleOpen, setIsModalEditModuleOpen] = useState(false);

  const handleOpenEditModule = (id: number) => {
    setIdSelectedModules(id);
    openModalEditModule();
  };
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
  };

  // HANDLING DELETE MODULE
  const [isModalDeleteModuleOpen, setIsModalDeleteModuleOpen] = useState(false);
  const handleOpenDeleteModule = (id: number) => {
    setIdSelectedModules(id);
    openModalDeleteModule();
  };
  const openModalDeleteModule = () => {
    setIsModalDeleteModuleOpen(true);
  };
  const closeModalDeleteModule = () => {
    setIsModalDeleteModuleOpen(false);
  };
  const successDeleteModule = () => {
    setIsModalDeleteModuleOpen(false);
    setRefreshModule((prevRefresh) => !prevRefresh);
  };

  // -------------------------------------- HANDLING LIST OF MATERIALS OF A MODULE ---------------------------------

  const initialMaterials: Materials[] = [];
  const [materials, setMaterials] = useState(initialMaterials);
  const [refreshMaterial, setRefreshMaterial] = useState(false);
  const [idSelectedMaterials, setIdSelectedMaterials] = useState(0);

  // FETCH DATA FROM SERVER
  const getMaterials = async (module_id: number) => {
    try {
      setIsLoading(true);
      const res = await newAxiosInstance.get(
        `${config.REST_API_URL}/material/module/${module_id}`
      );
      // console.log(res);
      const MaterialsData: Materials[] = res.data.data.map((material: any) => {
        return {
          id: material.id,
          title: material.title,
          description: material.description,
          source_type: material.source_type,
          material_path: material.material_path,
          module_id: material.modul_id,
        };
      });
      setMaterials(MaterialsData);
      setIsLoading(false);
    } catch (error) {
      console.error("Axios Error:", error);
      setIsLoading(false);
    }
  };

  // HANDLING ADD MATERIAL
  const [isModalAddMaterialOpen, setIsModalAddMaterialOpen] = useState(false);
  const openModalAddMaterial = () => {
    setIsModalAddMaterialOpen(true);
  };
  const closeModalAddMaterial = () => {
    setIsModalAddMaterialOpen(false);
  };
  const successAddMaterial = () => {
    setIsModalAddMaterialOpen(false);
    getMaterials(idSelectedModules);
  };

  // HANDLING EDIT MATERIAL
  const [isModalEditMaterialOpen, setIsModalEditMaterialOpen] = useState(false);
  const handleOpenEditMaterial = (id: number) => {
    setIdSelectedMaterials(id);
    openModalEditMaterial();
  };
  const openModalEditMaterial = () => {
    setIsModalEditMaterialOpen(true);
  };
  const closeModalEditMaterial = () => {
    setIsModalEditMaterialOpen(false);
  };
  const successEditMaterial = () => {
    setIsModalEditMaterialOpen(false);
    getMaterials(idSelectedModules);
  };

  // HANDLING DELETE MATERIAL
  const [isModalDeleteMaterialOpen, setIsModalDeleteMaterialOpen] =
    useState(false);
  const handleOpenDeleteMaterial = (id: number) => {
    setIdSelectedMaterials(id);
    openModalDeleteMaterial();
  };
  const openModalDeleteMaterial = () => {
    setIsModalDeleteMaterialOpen(true);
  };
  const closeModalDeleteMaterial = () => {
    setIsModalDeleteMaterialOpen(false);
  };
  const successDeleteMaterial = () => {
    setIsModalDeleteMaterialOpen(false);
    getMaterials(idSelectedModules);
  };

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
        isOpen={isModalDeleteModuleOpen}
        onClose={closeModalDeleteModule}
        successDelete={successDeleteModule}
        moduleId={idSelectedModules}
      />

      {/* --------------- MATERIAL POPUPS -------------------- */}
      <AddMaterialModal
        isOpen={isModalAddMaterialOpen}
        onClose={closeModalAddMaterial}
        successAdd={successAddMaterial}
        moduleId={idSelectedModules}
      />
      <EditMaterialModal
        isOpen={isModalEditMaterialOpen}
        onClose={closeModalEditMaterial}
        successEdit={successEditMaterial}
        materialId={idSelectedMaterials}
      />
      <DeleteMaterialModal
        isOpen={isModalDeleteMaterialOpen}
        onClose={closeModalDeleteMaterial}
        successDelete={successDeleteMaterial}
        materialId={idSelectedMaterials}
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
                              style={{ textDecoration: "none" }}
                            >
                              <Text fontSize={"sm"}>{item.title}</Text>
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
        <VStack w="80%" h="95vh" mt="1rem" bg="white">
          {idSelectedModules != 0 ? (
            <>
              {materials.length > 0 ? (
                <Box w="100%" h="94%" overflow={"hidden"}>
                  <Box w="full" p="3" px="8">
                    <Text align="left" fontWeight={"bold"}>
                      Materials
                    </Text>
                    <Divider mt="1" borderColor="black.500" borderWidth="1" />
                  </Box>
                  <Box
                    px="10"
                    w="100%"
                    h="95%"
                    overflow="auto"
                    css={{
                      "::-webkit-scrollbar": {
                        width: "10px",
                      },
                      "::-webkit-scrollbar-thumb": {
                        background: "rgb(206, 207, 211)",
                      },
                      "::-webkit-scrollbar-track": {
                        background: "rgba(255, 255, 255, 0.8)",
                      },
                    }}
                  >
                    {materials
                      .sort((a, b) => a.id - b.id)
                      .map((item) => (
                        <Accordion key={item.id} allowToggle>
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
                                onClick={(e) => {
                                  e.stopPropagation(); // Stop event propagation
                                  handleOpenEditMaterial(item.id);
                                }}
                              ></Icon>
                              <Icon
                                as={BiSolidTrash}
                                fontSize={"18"}
                                color={"#564c95"}
                                _hover={{ color: "red" }}
                                cursor={"pointer"}
                                onClick={(e) => {
                                  e.stopPropagation(); // Stop event propagation
                                  handleOpenDeleteMaterial(item.id);
                                }}
                              ></Icon>
                            </AccordionButton>
                            {item.source_type === "PDF" ? (
                              <AccordionPanel>
                                <Text
                                  align="left"
                                  fontSize={"md"}
                                  fontWeight={"bold"}
                                >
                                  Deskripsi Materi:
                                </Text>
                                <Text mb="5" align="left" fontSize={"sm"}>
                                  {item.description}
                                </Text>
                                <div>
                                  <iframe
                                    src={`http://localhost:8000/file/${item.material_path}`}
                                    width="100%"
                                    height="500px"
                                    title={item.id.toString()}
                                  />
                                </div>
                              </AccordionPanel>
                            ) : (
                              <AccordionPanel>
                                <Text
                                  align="left"
                                  fontSize={"md"}
                                  fontWeight={"bold"}
                                >
                                  Deskripsi Materi:
                                </Text>
                                <Text mb="5" align="left" fontSize={"sm"}>
                                  {item.description}
                                </Text>
                                <div>
                                  <ReactPlayer
                                    url={`http://localhost:8000/file/${item.material_path}`}
                                    width="100%"
                                    height="500px"
                                    controls
                                  />
                                </div>
                              </AccordionPanel>
                            )}
                          </AccordionItem>
                          <Divider mt="3" borderColor="transparent" />
                        </Accordion>
                      ))}
                  </Box>
                </Box>
              ) : (
                <Box px="5" w="100%" h="94%">
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
                onClick={() => openModalAddMaterial()}
              ></Icon>
            </>
          ) : (
            <Box
              px="5"
              w="100%"
              h="94%"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Box w="full" p="3">
                <Text align="center" fontWeight={"bold"} fontSize={"30"}>
                  Welcome To This Course!
                </Text>
                <Text align="center" fontSize={"24"}>
                  Please Select a Module to See the Materials
                </Text>
              </Box>
            </Box>
          )}
        </VStack>
      </HStack>
    </Container>
  );
};

export default ModuleMaterials;
