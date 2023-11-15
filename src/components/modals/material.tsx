import { Box, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, Textarea, ModalFooter, ButtonGroup, Button } from "@chakra-ui/react";
import { BiError } from "react-icons/bi";

{ /* Modal Edit */ }
interface EditMaterialModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description: string;
    handleEdit: () => void;
}

export function EditMaterialModal({
    isOpen,
    onClose,
    title,
    description,
    handleEdit,
}: EditMaterialModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader bg="#d78dff" textAlign={"center"}>
                    Edit Material
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                            Material Title
                        </FormLabel>
                        <Input
                            isRequired
                            variant="outline"
                            bg="white"
                            borderRadius="15px"
                            mb="5"
                            fontSize="sm"
                            placeholder={title}
                            size="lg"
                        />

                        <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                            Material Description
                        </FormLabel>
                        <Textarea
                            isRequired
                            h="50"
                            maxHeight={"150"}
                            bg="white"
                            borderRadius="15px"
                            mb="5"
                            fontSize="sm"
                            placeholder={description}
                            size="lg"
                        />
                        <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                            Material File
                        </FormLabel>
                        <Input
                            fontSize="sm"
                            border="none"
                            type="file"
                            accept="image/*"
                            size="lg"
                        />
                    </FormControl>
                </ModalBody>

                <ModalFooter justifyContent={"center"}>
                    <ButtonGroup>
                        <Button colorScheme="gray" flex="1" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme="purple" flex="1" ml={3} onClick={handleEdit}>
                            Edit
                        </Button>
                    </ButtonGroup>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

{ /* Modal Delete */ }
interface DeleteMaterialModalProps {
    isOpen: boolean;
    onClose: () => void;
    course_id: number;
    handleDelete: () => void;
}

export function DeleteMaterialModal({
    isOpen,
    onClose,
    course_id,
    handleDelete,
}: DeleteMaterialModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader textAlign={"center"}>Delete Material</ModalHeader>
                <ModalCloseButton />
                <ModalBody textAlign={"center"}>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Text as={BiError} fontSize={"150px"} color="red" />
                        <Text>Are you sure want to delete this Material?</Text>
                    </Box>
                </ModalBody>

                <ModalFooter justifyContent={"center"}>
                    <ButtonGroup>
                        <Button colorScheme="gray" flex="1" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme="red" flex="1" ml={3} onClick={handleDelete}>
                            Delete
                        </Button>
                    </ButtonGroup>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

{/* Modal Add Material*/}
interface AddMaterialModalProps {
    isOpen: boolean;
    onClose: () => void;
    handleAddMaterial: () => void;
}

export function AddMaterialModal({
    isOpen,
    onClose,
    handleAddMaterial,
}: AddMaterialModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader bg="#d78dff" textAlign={"center"}>
                    Add New Material
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                            Material Title
                        </FormLabel>
                        <Input
                            isRequired
                            variant="outline"
                            bg="white"
                            borderRadius="15px"
                            mb="5"
                            fontSize="sm"
                            size="lg"
                            placeholder={"Insert Title Here"}
                        />

                        <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                            Material Description
                        </FormLabel>
                        <Textarea
                            isRequired
                            h="50"
                            maxHeight={"150"}
                            bg="white"
                            borderRadius="15px"
                            mb="5"
                            fontSize="sm"
                            size="lg"
                            placeholder={"Insert Description Here"}
                        />

                        <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                            File
                        </FormLabel>
                        <Input
                            isRequired
                            fontSize="sm"
                            border="none"
                            type="file"
                            accept="image/*"
                            size="lg"
                        />
                    </FormControl>
                </ModalBody>

                <ModalFooter justifyContent={"center"}>
                    <ButtonGroup>
                        <Button colorScheme="gray" flex="1" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme="purple" flex="1" ml={3} onClick={handleAddMaterial}>
                            Add
                        </Button>
                    </ButtonGroup>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}