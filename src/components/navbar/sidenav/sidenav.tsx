import React from "react";
import {
    Drawer,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerOverlay,
    VStack,
    DrawerBody,
    Text,
    WrapItem
} from "@chakra-ui/react";
import { useSidenav } from "./context/context";
import Items, { Item, Profile } from "./items/items";
import { Avatar } from '@chakra-ui/react'

export interface SidenavProps {
    navItems: Item[];
    pict: Profile;
}

export function Sidenav({ navItems, pict }: SidenavProps) {
    const { isOpen, onClose } = useSidenav();
    return (
        <React.Fragment>
            <VStack spacing="3" as="nav" display={{ base: "none", md: "flex" }}>
                <Text fontWeight={"bold"}>LeMeS</Text>
                <Text mt="-5" fontWeight={"bold"}>Plus</Text>
                <Items navItems={navItems} pict={pict} />
            </VStack>
            <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>LeMeS Premium</DrawerHeader>
                    <DrawerBody>
                        <Items navItems={navItems} mode="over" pict={pict} />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </React.Fragment>
    );
}

export default Sidenav;
