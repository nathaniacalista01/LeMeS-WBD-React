import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Container,
  Divider,
  SimpleGrid,
  Stack,
  Text,
  Image,
  Heading,
  Box,
  useToast,
} from "@chakra-ui/react";
import { Card, CardBody, CardFooter } from "@chakra-ui/react";
import ReactPaginate from "react-paginate";
import { IconContext } from "react-icons";
import { BiChevronLeftCircle, BiChevronRightCircle } from "react-icons/bi";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Courses } from "../types";
import { axiosConfig } from "../utils/axios";
import config from "../config/config";

const Home = () => {
  const { page: pageNumber } = useParams();
  const toast = useToast();
  const initialCourses: Courses[] = [];
  const [courses, setCourses] = useState(initialCourses);
  const [totalPages, setTotalPages] = useState(1); // Initialize with 1 as default
  const [isLoading, setIsLoading] = useState(false);
  const newAxiosInstance = axios.create(axiosConfig());
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = parseInt(queryParams.get('page') || '1', 10);
  const navigate = useNavigate();
  const n = 8;

  useEffect(() => {
    const getCourses = async (pageNumber: number) => {
      try {
        setIsLoading(true);
        const res = await newAxiosInstance.get(`${config.REST_API_URL}/course?page=${pageNumber}`);
        const {status} = res["data"];
        if(status === 401){
          toast({
            title : "Unathorized user",
            description : "You have to log in",
            status : "error",
            duration:3000,
            isClosable : true,
            position : "top"
          })
          navigate("/login");
        }
        setTotalPages(Math.ceil(res.data.total/n));

        const coursesData: Courses[] = res.data.data.map((course: any) => {
          const releaseDate = new Date(course.release_date);
          const formattedDate = releaseDate.toLocaleDateString();
          return {
            id: course.id,
            title: course.title,
            description: course.description,
            image_path: course.image_path,
            release_date: formattedDate,
          };
        });
        setCourses(coursesData);
        setIsLoading(false);
        console.log("berhasil yeah");
      } catch (error) {
        console.error('Axios Error:', error);
        setIsLoading(false);
      }
    }

    getCourses(page);
  }, [page]);

  return (
    <>
      {!isLoading && (
        <Container
          overflow={"auto"}
          px="20"
          py="35"
          maxW={"100vw"}
          maxH={"100vh"}
          justifyContent={"space-between"}
        >
          <Heading size="lg">
            Select a Premium Course to Get Premium Knowledges!
          </Heading>
          {courses.length > 0 ? (
            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 4 }}
              spacing={"30px"}
              mt={10}
              justifyItems="space-between"
            >
              {courses.map((item, index) => (
                <Card maxW="sm">
                  <CardBody>
                    <Image
                      w="50"
                      src={item.image_path ? item.image_path.toString() : 'premiumlogo.png'}
                      alt="Course Image"
                      borderRadius="lg"
                    />
                    <Stack mt="6" spacing="3">
                      <Heading size="sm">{item.title}</Heading>
                      <Text fontSize={"14"}>{item.description}</Text>
                      <Text fontSize="13" fontWeight={"bold"}>
                        {item.release_date}
                      </Text>
                    </Stack>
                  </CardBody>
                  <Divider />
                  <CardFooter justify="center">
                    <Link
                      to={`/materials/${item.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Button variant="solid" colorScheme="purple">
                        See Course
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </SimpleGrid>
          ) : (
            <Text fontSize={"20"} mt="200px" mb="200px">Sorry, no courses available at the moment...</Text>
          )}
          <Box mt={10} alignContent="center">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <ReactPaginate
                containerClassName={"pagination"}
                pageClassName={"page-item"}
                activeClassName={"active-page"}
                onPageChange={(selectedItem) => {
                  if ('selected' in selectedItem) {
                    const nextPage = selectedItem.selected + 1;
                    navigate(`/course?page=${nextPage}`);
                  }
                }}
                pageCount={totalPages}
                initialPage={page - 1}
                breakLabel="..."
                previousLabel={
                  <IconContext.Provider value={{ size: "36px" }}>
                    <BiChevronLeftCircle color="gray" />
                  </IconContext.Provider>
                }
                nextLabel={
                  <IconContext.Provider value={{ size: "36px" }}>
                    <BiChevronRightCircle color="gray" />
                  </IconContext.Provider>
                }
              />
            </div>
          </Box>
        </Container>
      )}
    </>
  );
};

export default Home;
