import React from 'react';
import { Button, Container, Divider, SimpleGrid, Stack, Text, Image, Heading } from '@chakra-ui/react'
import { Card, CardBody, CardFooter } from '@chakra-ui/react'

const Home = () => {
  const courses = [
    { course_id: '1', title: 'Course 1', description: 'Course ini adlaha dwakjdskdjalsdjaks  sasdga s', release_date: '11-08-2023' },
    { course_id: '1', title: 'Course 1', description: 'Course ini adlaha dwakjdskdjalsdjaks  sasdga s', release_date: '11-08-2023' },
    { course_id: '1', title: 'Course 1', description: 'Course ini adlaha dwakjdskdjalsdjaks  sasdga s', release_date: '11-08-2023' },
    { course_id: '1', title: 'Course 1', description: 'Course ini adlaha dwakjdskdjalsdjaks  sasdga s', release_date: '11-08-2023' },
    { course_id: '1', title: 'Course 1', description: 'Course ini adlaha dwakjdskdjalsdjaks  sasdga s', release_date: '11-08-2023' },
    { course_id: '1', title: 'Course 1', description: 'Course ini adlaha dwakjdskdjalsdjaks  sasdga s', release_date: '11-08-2023' },
    { course_id: '1', title: 'Course 1', description: 'Course ini adlaha dwakjdskdjalsdjaks  sasdga s', release_date: '11-08-2023' },
  ];

  return (
    <Container
      overflow={"auto"}
      px="20"
      py="35"
      maxW={"100vw"}
      maxH={"100vh"}>
      <Heading size='md'>Select a Premium Course to Get Premium Knowledges!</Heading>
      <SimpleGrid minChildWidth='240px' spacing='30px' mt="5">
        {courses.map((course, index) => (
          <Card maxW='sm'>
            <CardBody>
              <Image
                w="50"
                src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                alt='Course Image'
                borderRadius='lg'
              />
              <Stack mt='6' spacing='3'>
                <Heading size='sm'>{course.title}</Heading>
                <Text fontSize={"14"}>
                  {course.description}
                </Text>
                <Text fontSize='13' fontWeight={"bold"}>
                  {course.release_date}
                </Text>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter justify="center">
              <Button variant='solid' colorScheme='purple'>
                See Course
              </Button>
            </CardFooter>
          </Card>
        ))
        }
      </SimpleGrid>
    </Container>
  );
};

export default Home;
