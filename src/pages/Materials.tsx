import { Container, HStack, VStack, Text, TableContainer, Table, Tr, Tbody, Td, Icon, Box, Divider, Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Image } from "@chakra-ui/react";
import { useState } from "react";
import { BiSolidEdit, BiSolidTrash, BiPlusCircle } from "react-icons/bi";
import { Link } from 'react-router-dom';
import ReactPlayer from "react-player";
import PdfViewer from "../components/pdfviewer/pdfviewer";

const Materials = () => {
    type module = {
        module_id: number;
        title: string;
    };

    const [module, setModule] = useState([
        { module_id: 1, title: 'module a sasdasds asdaa sD asd asdasdadsadasfasdashasdsadasdasahdasdahahahaasdasdassfasdasdahahdasdasdasdasdsahhaakasiandehlosemuanyasssssdasd asdasd asd assfasdasasdas ddasd asd d1asd as' },
        { module_id: 2, title: 'modudas dle 2' },
        { module_id: 3, title: 'module 2' },
        { module_id: 4, title: 'module 2' },
        { module_id: 5, title: 'module 2' },
    ]);

    return (
        <Container overflow="auto"
            maxW={"100vw"}
            maxH={"100vh"}>
            <HStack
                align="start"
                justify="center">
                <VStack maxW="20%" maxH="95vh" mt="1rem">
                    <Text whiteSpace='normal' wordBreak='break-all' fontWeight={"bold"}>
                        Course Title
                    </Text>
                    <Container
                        overflow="auto"
                        css={{
                            '::-webkit-scrollbar': {
                                width: '3px',
                            },
                            '::-webkit-scrollbar-thumb': {
                                background: 'rgb(206, 207, 211)',
                            },
                            '::-webkit-scrollbar-track': {
                                background: 'rgba(255, 255, 255, 0.8)',
                            },
                        }}>
                        <TableContainer width="80vw">
                            <Table bg="white" borderRadius={"5"}>
                                {module.length > 0 ? (
                                    <Tbody>
                                        {/* ITERATE HERE LOOPING DATABASE TO FILL TABLE */}
                                        {module.map((item) => (
                                            <Tr key={item.module_id}>
                                                <Td height="auto" maxWidth="95%" p="2" whiteSpace='normal' wordBreak='break-all' >
                                                    <Link to={`/${item.module_id}`} style={{ textDecoration: 'none' }}>
                                                        <Text _hover={{ color: "purple.500" }}>
                                                            {item.title}
                                                        </Text>
                                                    </Link>
                                                </Td>
                                                <Td width="5%" p="2">
                                                    <Icon as={BiSolidEdit} fontSize={"18"} color={"#564c95"} _hover={{ color: "green" }} cursor={"pointer"}></Icon>
                                                    <Icon as={BiSolidTrash} fontSize={"18"} color={"#564c95"} _hover={{ color: "red" }} cursor={"pointer"}></Icon>
                                                </Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                ) : (
                                    <Tr>
                                        <Td>No modules available</Td>
                                    </Tr>
                                )}
                            </Table>
                        </TableContainer>
                    </Container>
                    <Icon as={BiPlusCircle} fontSize={"26"} color={"#564c95"} _hover={{ color: "green" }} cursor={"pointer"}></Icon>
                </VStack>
                <VStack w="80%" h="95vh" mt="1rem" bg="white">
                    <Box w="full" p="3">
                        <Text align="left" fontWeight={"bold"}>
                            Module Title
                        </Text>
                        <Divider mt="1" borderColor="black.500" borderWidth="1" />
                    </Box>
                    <Box w="98%" h="86%" px="8" overflow="auto"
                        css={{
                            '::-webkit-scrollbar': {
                                width: '3px',
                            },
                            '::-webkit-scrollbar-thumb': {
                                background: 'rgb(206, 207, 211)',
                            },
                            '::-webkit-scrollbar-track': {
                                background: 'rgba(255, 255, 255, 0.8)',
                            },
                        }}>
                        <Accordion allowToggle>
                            <AccordionItem>
                                <AccordionButton bg="#f0f0f0" borderRadius={"5"}>
                                    <Box flex="1" textAlign="left">
                                        Material Title
                                    </Box>
                                    <AccordionIcon />
                                    <Icon as={BiSolidEdit} fontSize={"18"} color={"#564c95"} _hover={{ color: "green" }} cursor={"pointer"}></Icon>
                                    <Icon as={BiSolidTrash} fontSize={"18"} color={"#564c95"} _hover={{ color: "red" }} cursor={"pointer"}></Icon>
                                </AccordionButton>
                                <AccordionPanel>
                                    <Text align="left">
                                        Material Description
                                    </Text>
                                    <PdfViewer pdfPath={"/Quiz-1.pdf"} />
                                </AccordionPanel>
                            </AccordionItem>
                            <Divider mt="3" borderColor="transparent" />

                        </Accordion>
                    </Box>
                    <Icon as={BiPlusCircle} fontSize={"26"} color={"#564c95"} _hover={{ color: "green" }} cursor={"pointer"}></Icon>
                </VStack>
            </HStack>
        </Container>
    );
}

export default Materials;