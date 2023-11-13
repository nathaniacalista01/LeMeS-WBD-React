import React, { useState } from "react";
import {
    Drawer,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerOverlay,
    VStack,
    DrawerBody,
    Text,
    IconButton,
} from "@chakra-ui/react";
import { useSidenav } from "../context/context";
import Items, { Item, Profile } from "../items/items";
import LogoutDialog from "../LogoutPopup";
import { BiMenu, BiLogOut, BiSad } from "react-icons/bi";

export interface SidenavProps {
    navItems: Item[];
    pict: Profile;
}

export function Sidenav({ navItems, pict }: SidenavProps) {
    const { isOpen, onClose, onOpen } = useSidenav();

    return (
        <React.Fragment>
            <VStack spacing="3" as="nav" display="flex">
                <IconButton
                    mt="-5"
                    aria-label="menu1"
                    onClick={onOpen}
                    icon={<BiMenu />}
                    bg="transparent"
                />
                <Text mt="-3" fontWeight={"bold"}>LeMeS</Text>
                <Text mt="-5" fontWeight={"bold"}>Premium</Text>
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
