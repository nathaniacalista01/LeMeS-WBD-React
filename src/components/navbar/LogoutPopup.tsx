import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  Box,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { BiSad } from "react-icons/bi";
import { axiosConfig } from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import config from "../../config/config";

interface LogoutDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LogoutDialog = ({ isOpen, onClose }: LogoutDialogProps) => {
  const axiosInstance = axios.create(axiosConfig());
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    axiosInstance.post(`${config.REST_API_URL}/auth/logout`).then((res) => {
      if (res.status === 200) {
        toast({
          title: "Logout Success!",
          description: "You have been logged out!",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        navigate("/login");
      } else {
        toast({
          title: "Logout failed!",
          description: "Your logout request has failed!",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
    });
    onClose();
  };
  const cancelRef = React.useRef<HTMLButtonElement | null>(null);
  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader textAlign={"center"}>Logout</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody textAlign={"center"}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Text as={BiSad} fontSize={"150px"} color="purple" />
            <Text>Are you sure want to Logout?</Text>
          </Box>
        </AlertDialogBody>
        <AlertDialogFooter justifyContent={"center"}>
          <Button colorScheme="gray" ref={cancelRef} onClick={onClose} flex="1">
            Cancel
          </Button>
          <Button colorScheme="red" ml={3} flex="1" onClick={handleLogout}>
            Logout
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
