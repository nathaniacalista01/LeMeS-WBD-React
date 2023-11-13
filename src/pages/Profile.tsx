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
                                bg="white"
                                fontSize='sm'
                                ms='4px'
                                borderRadius='15px'
                                type='text'
                                placeholder='Your full name'
                                mb='24px'
                                size='lg'
                            />
                            <FormLabel ms='4px' fontSize='sm' fontWeight='bold'>
                                Username
                            </FormLabel>
                            <Input
                                bg="white"
                                fontSize='sm'
                                ms='4px'
                                borderRadius='15px'
                                type='text'
                                placeholder='Your username'
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
                                placeholder='Your username'
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
                                motionPreset='slideInBottom'
                                leastDestructiveRef={cancelRef}
                                onClose={onClose}
                                isOpen={isOpen}
                                isCentered
                            >
                                <AlertDialogOverlay />

                                <AlertDialogContent>
                                    <AlertDialogHeader>Edit Profile</AlertDialogHeader>
                                    <AlertDialogCloseButton />
                                    <AlertDialogBody>
                                        Are you sure want to edit profile?
                                    </AlertDialogBody>
                                    <AlertDialogFooter>
                                        <Button ref={cancelRef} onClick={onClose}>
                                            No
                                        </Button>
                                        <Button colorScheme='blue' ml={3}>
                                            Yes
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
