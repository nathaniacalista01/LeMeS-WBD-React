import {
    Button,
    Container,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

function Profile() {
    return (
        <Container display={"flex"} flexDir={"column"} >
            <Flex
                direction='column'
                alignSelf='center'
                justifySelf='center'
                overflow='hidden'>
                <Flex
                    direction='column'
                    textAlign='center'
                    justifyContent='center'
                    align='center'
                    mt='3rem'
                    mb='15px'>
                    <Text fontSize='4xl' color='black' fontWeight='bold'>
                        Your Profile
                    </Text>
                </Flex>
                <Flex alignItems='center' justifyContent='center' mb='60px' mt='20px'>
                    <Flex
                        direction='column'
                        w='445px'
                        background='transparent'
                        borderRadius='15px'
                        p='40px'
                        mx={{ base: "100px" }}
                        bg={useColorModeValue("#f2f2f2", "gray.700")}
                        boxShadow='0 20px 27px 0 rgb(0 0 0 / 15%)'>
                        <FormControl>
                            <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
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
                            <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
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
                            {/* <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
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
                            <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
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
                                fontSize='16px'
                                color='white'
                                fontWeight='bold'
                                w='100%'
                                h='45'
                                mb='24px'
                                _hover={{
                                    bg: "purple.200",
                                }}
                                _active={{
                                    bg: "purple.300",
                                }}>
                                Edit Profile
                            </Button>
                        </FormControl>
                    </Flex>
                </Flex>
            </Flex>
        </Container >
    );
}

export default Profile;