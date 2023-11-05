import { Container, Heading } from '@chakra-ui/react'
import React from 'react'
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <Container display={"flex"} flexDirection={"column"}>
      <Heading>
        Home page
      </Heading>
    </Container>
  )
}

export default Home
