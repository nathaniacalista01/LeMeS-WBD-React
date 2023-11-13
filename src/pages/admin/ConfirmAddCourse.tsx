import React from "react";
import { BiHome, BiLogOut, BiBookAdd, BiGroup } from "react-icons/bi";
import { Outlet } from "react-router-dom";
import {
    Flex,
    Button,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    useDisclosure,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

function ConfirmAddCourse() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef<HTMLButtonElement | null>(null);

    return (
        <>
          <Button onClick={onOpen}>Add Course</Button>
          <AlertDialog
            motionPreset='slideInBottom'
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isOpen={isOpen}
            isCentered
          >
            <AlertDialogOverlay />
    
            <AlertDialogContent>
              <AlertDialogHeader>Add Course Confirmation</AlertDialogHeader>
              <AlertDialogCloseButton />
              <AlertDialogBody>
                Are you sure want to add course?
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
        </>
      );
    }
  
export default ConfirmAddCourse;
