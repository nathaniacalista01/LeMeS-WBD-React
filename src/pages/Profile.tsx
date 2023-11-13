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
    Box,
} from "@chakra-ui/react";
import { BiWinkSmile } from "react-icons/bi";

function Profile() {
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
                            Your Profile
                        </Text>
                        <FormControl>
                            <FormLabel ms='4px' fontSize='sm' fontWeight='bold'>
                                Name
                            </FormLabel>
                            <Input
                                isRequired
                                bg="white"
                                fontSize='sm'
                                ms='4px'
                                borderRadius='15px'
                                type='text'
                                placeholder='user.fullname'
                                mb='24px'
                                size='lg'
                            />
                            <FormLabel ms='4px' fontSize='sm' fontWeight='bold'>
                                Username
                            </FormLabel>
                            <Input
                                isRequired
                                bg="white"
                                fontSize='sm'
                                ms='4px'
                                borderRadius='15px'
                                type='text'
                                placeholder='user.username'
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
                                New Picture
                            </FormLabel>
                            <Input
                                fontSize='sm'
                                ms='4px'
                                border='none'
                                type='file'
                                accept="image/*"
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
                                onClick={onOpen}>Edit Profile</Button>
                            <AlertDialog
                                leastDestructiveRef={cancelRef}
                                onClose={onClose}
                                isOpen={isOpen}
                                isCentered
                            >
                                <AlertDialogOverlay />
                                <AlertDialogContent>
                                    <AlertDialogHeader textAlign={"center"}>Edit Profile</AlertDialogHeader>
                                    <AlertDialogCloseButton />
                                    <AlertDialogBody textAlign={"center"}>
                                        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                                            <Text as={BiWinkSmile} fontSize={"150px"} color="purple" />
                                            <Text>
                                                Are you sure want to edit profile?
                                            </Text>
                                        </Box>
                                    </AlertDialogBody>
                                    <AlertDialogFooter justifyContent={"center"}>
                                        <Button colorScheme="gray" ref={cancelRef} onClick={onClose} flex="1">
                                            Cancel
                                        </Button>
                                        <Button colorScheme='purple' ml={3} flex="1">
                                            Edit
                                        </Button>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </FormControl>
                    </Flex>
                </Flex>
            </Flex>
        </Container >
    );
}

export default Profile;
