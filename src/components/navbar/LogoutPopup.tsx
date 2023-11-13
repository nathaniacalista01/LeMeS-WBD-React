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
    Text
} from "@chakra-ui/react";
import React from "react";
import { BiSad } from "react-icons/bi";

interface LogoutDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

function LogoutDialog({
    isOpen,
    onClose,
}: LogoutDialogProps) {
    const cancelRef = React.useRef<HTMLButtonElement | null>(null);
    const handleLogout = () => {
        // Handle the Logout action here, e.g., send an API request to update the data
        // You can use the Logout and Logout state variables
        // to send the updated data.
        // After Logout is complete, close the modal.
    };
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
                    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                        <Text as={BiSad} fontSize={"150px"} color="purple" />
                        <Text>
                            Are you sure want to Logout?
                        </Text>
                    </Box>
                </AlertDialogBody>
                <AlertDialogFooter justifyContent={"center"}>
                    <Button colorScheme="gray" ref={cancelRef} onClick={onClose} flex="1">
                        Cancel
                    </Button>
                    <Button colorScheme='red' ml={3} flex="1" onClick={onClose}>
                        Logout
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default LogoutDialog;