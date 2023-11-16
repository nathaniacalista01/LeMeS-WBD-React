import { IconType } from "react-icons";
import { NavLink, useNavigate } from "react-router-dom";
import {
  List,
  ListItem,
  Icon,
  Flex,
  Text,
  Link,
  Tooltip,
  IconButton,
  Avatar,
  WrapItem,
  Button,
  useToast,
} from "@chakra-ui/react";
import { BiLogOut } from "react-icons/bi";

import { useState } from "react";
import { LogoutDialog } from "../LogoutPopup";
import axios from "axios";
import { axiosConfig } from "../../../utils/axios";
import config from "../../../config/config";

export interface Item {
  icon: IconType;
  label: string;
  to: string;
}

export interface Profile {
  image_path: string;
  label: string;
  role: string;
  to: string;
}

export interface ItemsProps {
  navItems: Item[];
  mode?: "semi" | "over";
  pict?: Profile;
}

export function Items({ navItems, mode = "semi", pict }: ItemsProps) {
  const axiosInstance = axios.create(axiosConfig());
  const toast = useToast();
  const navigate = useNavigate();
  const [isModalLogoutOpen, setIsModalLogoutOpen] = useState(false);
  const openModalLogout = () => {
    setIsModalLogoutOpen(true);
  };
  const closeModalLogout = () => {
    
    setIsModalLogoutOpen(false);
  };

  const sidebarItemInOverMode = (item: Item, index: number) => (
    <ListItem key={index}>
      <Link
        display="block"
        as={NavLink}
        to={item.to}
        _focus={{ bg: "gray.100" }}
        _hover={{
          bg: "gray.200",
        }}
        _activeLink={{ bg: "purple.500", color: "white" }}
        w="full"
        borderRadius="md"
      >
        <Flex alignItems="center" p={2}>
          <Icon boxSize="8" as={item.icon} />
          <Text ml={2}>{item.label}</Text>
        </Flex>
      </Link>
    </ListItem>
  );
  const sidebarItemInSemiMode = (
    { icon: Icon, ...item }: Item,
    index: number
  ) => (
    <ListItem key={index}>
      <Tooltip
        label={item.label}
        placement="right"
        bg="purple.500"
        color="white"
      >
        <IconButton
          key={index}
          as={NavLink}
          fontSize={"30"}
          _focus={{ bg: "gray.100" }}
          _activeLink={{ boxShadow: "md", bg: "purple.500", color: "white" }}
          bg="transparent"
          aria-label={item.label}
          borderRadius="xl"
          icon={<Icon />}
          to={item.to}
        />
      </Tooltip>
    </ListItem>
  );
  if (mode === "semi") {
    return (
      <List spacing={3}>
        <LogoutDialog isOpen={isModalLogoutOpen} onClose={closeModalLogout} />
        {pict && (
          <Tooltip
            label={pict.label}
            placement="right"
            bg="purple.500"
            color="white"
          >
            <NavLink to={pict.to} style={{ textDecoration: "none" }}>
              <Avatar
                src={pict.image_path}
                name={pict.label}
                size="l"
                bg="transparent"
                _hover={{ cursor: "pointer" }}
              />
              <Text>{pict.role}</Text>
            </NavLink>
          </Tooltip>
        )}

        {navItems.map((item, index) => sidebarItemInSemiMode(item, index))}
        <Tooltip
          label={"Logout"}
          placement="right"
          bg="purple.500"
          color="white"
        >
          <IconButton
            fontSize={"30"}
            aria-label="logout"
            onClick={openModalLogout}
            icon={<BiLogOut />}
            bg="transparent"
          />
        </Tooltip>
      </List>
    );
  } else {
    return (
      <List spacing={3}>
        <LogoutDialog isOpen={isModalLogoutOpen} onClose={closeModalLogout} />
        {pict && (
          <WrapItem>
            <Link
              display="block"
              as={NavLink}
              to={pict.to}
              _focus={{ bg: "gray.100" }}
              _hover={{
                bg: "gray.200",
              }}
              _activeLink={{ bg: "purple.500", color: "white" }}
              w="full"
              borderRadius="md"
            >
              <Flex alignItems="center" p={2}>
                <Avatar name={pict.label} src={pict.image_path} />
                <Flex display={"block"}>
                  <Text ml={2} fontWeight={"bold"}>
                    {pict.label}
                  </Text>
                  <Text ml={2}>{pict.role}</Text>
                </Flex>
              </Flex>
            </Link>
          </WrapItem>
        )}

        {navItems.map((item, index) => sidebarItemInOverMode(item, index))}
        <WrapItem>
          <Button
            display="block"
            _hover={{
              bg: "gray.200",
            }}
            bg="transparent"
            w="full"
            borderRadius="md"
            onClick={openModalLogout}
          >
            <Flex alignItems="left">
              <Icon as={BiLogOut} fontSize={"30"} ml="-2" />
              <Text ml={2} p="1">
                Logout
              </Text>
            </Flex>
          </Button>
        </WrapItem>
      </List>
    );
  }
}

export default Items;
