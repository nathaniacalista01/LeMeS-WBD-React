import {
  Text,
  Box,
  Flex,
  Stack,
  Button,
  Image,
  FormControl,
  Input,
  InputGroup,
  useColorModeValue,
  Container,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";

function Login() {
  return (
    <>
    <Container
    justifyContent={"center"}>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        textColor={"black"}
        bg={useColorModeValue("#f2f2f2", "gray.800")}
        >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={8} px={6}>
          <Stack align={"center"}>
            <Image src="premiumlogo.png" alt="logo" mb={8} />
            <Text fontSize={"lg"} color={"black"} fontWeight={"bold"}>
              Sign In
            </Text>
          </Stack>

          <Box>
            <Stack spacing={4}>
              <FormControl id="username" isRequired>
                <Input
                  type="text"
                  bg="white"
                  placeholder="Username"
                  border={"none"}
                  />
              </FormControl>

              <FormControl id="password" isRequired>
                <InputGroup>
                  <Input
                    type="password"
                    bg="white"
                    placeholder="Password"
                    border={"none"}
                    />
                </InputGroup>
              </FormControl>

              <Stack spacing={10} pt={2}>
                <Button
                  borderRadius={"22px"}
                  size="lg"
                  bg={"#9d4bff"}
                  color={"white"}
                  _hover={{ bg: "#23004d" }}
                  >
                  Login
                </Button>
              </Stack>

              <Stack pt={6}>
                <Text align={"center"}>
                  Don't have an account?{" "}
                    <Link to={{ pathname: "/register" }} style={{ color: "#9d4bff" }}>
                      Sign Up
                    </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
      </Container>
    </>
  );
}

export default Login;