import React from "react";
import {
  Flex,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  Container,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

function Register() {
  const titleColor = "purple.500";
  const textColor = "black";
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
            <Heading color={titleColor} fontSize='32px' mb='10px'>
              SIGN UP
            </Heading>
            <Text
              mb='36px'
              ms='4px'
              color={"gray.600"}
              fontWeight='bold'
              fontSize='14px'>
              Register to Access Various Premium Course
            </Text>
            <FormControl>
              <FormLabel ms='4px' fontSize='sm' fontWeight='bold'>
                Full Name
              </FormLabel>
              <Input
                isRequired
                bg="white"
                borderRadius='15px'
                mb='24px'
                fontSize='sm'
                type='text'
                placeholder='Enter your full name'
                size='lg'
              />
              <FormLabel ms='4px' fontSize='sm' fontWeight='bold'>
                Username
              </FormLabel>
              <Input
                isRequired
                bg="white"
                borderRadius='15px'
                mb='24px'
                fontSize='sm'
                type='text'
                placeholder='Enter your username'
                size='lg'
              />
              <FormLabel ms='4px' fontSize='sm' fontWeight='bold'>
                Password
              </FormLabel>
              <Input
                isRequired
                bg="white"
                borderRadius='15px'
                mb='36px'
                fontSize='sm'
                type='password'
                placeholder='Enter your password'
                size='lg'
              />
              <Button
                fontSize='16px'
                type='submit'
                bg='purple.500'
                w='100%'
                h='45'
                mb='20px'
                color='white'
                mt='20px'
                _hover={{
                  bg: "purple.200",
                }}
                _active={{
                  bg: "purple.400",
                }}>
                Register
              </Button>
            </FormControl>
            <Flex
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
              maxW='100%'
              mt='0px'>
              <Text color={textColor} fontWeight='medium'>
                Already have an account?
                <RouterLink to="/login" style={{ color: "#564c95", marginLeft: '5px', fontWeight: 'bold' }}>
                  Sign In
                </RouterLink>
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Container >
  );
}

export default Register;
