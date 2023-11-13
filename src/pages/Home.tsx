import React, { useMemo, useState } from 'react';
import { Button, Container, Divider, SimpleGrid, Stack, Text, Image, Heading, Box } from '@chakra-ui/react'
import { Card, CardBody, CardFooter } from '@chakra-ui/react'
import ReactPaginate from 'react-paginate';
import { IconContext } from 'react-icons';
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";

const Home = () => {
  const courses = [
    { course_id: '1', title: 'Course 1', description: 'Course ini adlaha dwakjdskdjalsdjaks  sasdga s', release_date: '11-08-2023', image_path: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80' },
    { course_id: '1', title: 'Course 1', description: 'Course ini adlaha dwakjdskdjalsdjaks  sasdga s', release_date: '11-08-2023', image_path: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80' },
    { course_id: '1', title: 'Course 1', description: 'Course ini adlaha dwakjdskdjalsdjaks  sasdga s', release_date: '11-08-2023', image_path: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80' },
    { course_id: '1', title: 'Course 1', description: 'Course ini adlaha dwakjdskdjalsdjaks  sasdga s', release_date: '11-08-2023', image_path: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80' },
    { course_id: '1', title: 'Course 1', description: 'Course ini adlaha dwakjdskdjalsdjaks  sasdga s', release_date: '11-08-2023', image_path: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80' },
    { course_id: '1', title: 'Course 1', description: 'Course ini adlaha dwakjdskdjalsdjaks  sasdga s', release_date: '11-08-2023', image_path: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80' },
  ];

  const n = 4
  const [page, setPage] = useState(0);
  const filterData = useMemo(() => {
    return courses.filter((item, index) => {
      return (index >= page * n) && (index < (page + 1) * n);
    })
  }, [page])

  return (
    <Container
      overflow={"auto"}
      px="20"
      py="35"
      maxW={"100vw"}
      maxH={"100vh"}
      justifyContent={"space-between"}>
      <Heading size='lg'>Select a Premium Course to Get Premium Knowledges!</Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={'30px'} mt={10} justifyItems="space-between">
        {filterData && filterData.map((item, index) =>
          <Card maxW='sm'>
            <CardBody>
              <Image
                w="50"
                src={item.image_path}
                alt='Course Image'
                borderRadius='lg'
              />
              <Stack mt='6' spacing='3'>
                <Heading size='sm'>{item.title}</Heading>
                <Text fontSize={"14"}>
                  {item.description}
                </Text>
                <Text fontSize='13' fontWeight={"bold"}>
                  {item.release_date}
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
        )}
      </SimpleGrid>
      <Box mt={10} alignContent="center">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ReactPaginate
          containerClassName={"pagination"}
          pageClassName={"page-item"}
          activeClassName={"active"}
          onPageChange={(event) => setPage(event.selected)}
          pageCount={Math.ceil(courses.length / n)}
          breakLabel="..."
          previousLabel={
            <IconContext.Provider value={{ color: "#B8C1CC", size: "36px" }}>
              <AiFillLeftCircle />
            </IconContext.Provider>
          }
          nextLabel={
            <IconContext.Provider value={{ color: "#B8C1CC", size: "36px" }}>
              <AiFillRightCircle />
            </IconContext.Provider>
          }
        />
        </div>
      </Box>
    </Container>
  );
};

export default Home;
