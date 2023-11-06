import React from "react";
import {
    Drawer,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerOverlay,
    VStack,
    DrawerBody,
    Text
} from "@chakra-ui/react";
import { useSidenav } from "./context/context";
import Items, { Item } from "./items/items";

export interface SidenavProps {
    navItems: Item[];
}

export function Sidenav({ navItems }: SidenavProps) {
    const { isOpen, onClose } = useSidenav();
    return (
        <React.Fragment>
            <VStack spacing="3" as="nav" display={{ base: "none", md: "flex" }}>
                <Text fontWeight={"bold"}>LeMeS</Text>
                <Text mt="-5" fontWeight={"bold"}>Plus</Text>
                <Items navItems={navItems} />
            </VStack>
            <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>LeMeS Premium</DrawerHeader>
                    <DrawerBody>
                        <Items navItems={navItems} mode="over" />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </React.Fragment>
    );
}

export default Sidenav;
