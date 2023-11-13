import React from "react";
import {
    Button,
    Container,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Text,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    useDisclosure,
} from "@chakra-ui/react";

function FormAddCourse() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef<HTMLButtonElement | null>(null);

    return (
        <Container display={"flex"} flexDir={"column"}>
            <Flex
                direction='column'
                alignSelf='center'
                justifySelf='center'
                mt="3rem"
                overflow='hidden'>
                <Flex alignItems='center' justifyContent='center' mb='60px'>
                    <Flex
                        direction='column'
                        w='445px'
                        background='transparent'
                        borderRadius='15px'
                        p='40px'
                        mx={{ base: "100px" }}
                        bg={"#f2f2f2"}
                        boxShadow='0 20px 27px 0 rgb(0 0 0 / 15%)'>
                        <Text fontSize='4xl' color='black' fontWeight='bold' mb="8">
                            Add Courses
                        </Text>
                        <FormControl>
                            <FormLabel ms='4px' fontSize='sm' fontWeight='bold'>
                                Title
                            </FormLabel>
                            <Input
                                bg="white"
                                fontSize='sm'
                                ms='4px'
                                borderRadius='15px'
                                type='text'
                                placeholder='Course Title'
                                mb='24px'
                                size='lg'
                            />
                            <FormLabel ms='4px' fontSize='sm' fontWeight='bold'>
                                Course Description
                            </FormLabel>
                            <Input
                                bg="white"
                                fontSize='sm'
                                ms='4px'
                                borderRadius='15px'
                                type='text'
                                placeholder='Description'
                                mb='24px'
                                size='lg'
                            />
                            <FormLabel ms='4px' fontSize='sm' fontWeight='bold'>
                                Course Password
                            </FormLabel>
                            <Input
                                bg="white"
                                fontSize='sm'
                                ms='4px'
                                borderRadius='15px'
                                type='text'
                                placeholder='Password'
                                mb='24px'
                                size='lg'
                            />
                            {/* <FormLabel ms='4px' fontSize='sm' fontWeight='bold'>
                                Password
                            </FormLabel>
                            <Input
                                fontSize='sm'
                                ms='4px'
                                borderRadius='15px'
                                type='password'
                                placeholder='Optional'
                                mb='24px'
                                size='lg'
                            /> */}
                            <FormLabel ms='4px' fontSize='sm' fontWeight='bold'>
                                Add File
                            </FormLabel>
                            <Input
                                fontSize='sm'
                                ms='4px'
                                border='none'
                                type='file'
                                accept="image/*"
                                placeholder='add file'
                                mb='24px'
                                size='lg'
                            />
                            <Button 
                                type='submit'
                                bg='purple.500'
                                fontSize='16 px'
                                color='white'
                                fontWeight='bold'
                                w='100%'
                                h='45'
                                mb='24px'
                                _hover={{
                                    bg: "purple.200"
                                }}
                                _active={{
                                    bg: "purple.300"
                                }}
                                onClick={onOpen}>Add Course</Button>
                        </FormControl>
                    </Flex>
                </Flex>
            </Flex>
        </Container >
    );
}

export default FormAddCourse;
