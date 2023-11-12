import { IconType } from "react-icons";
import { NavLink } from "react-router-dom";
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
    WrapItem
} from "@chakra-ui/react";

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
    pict: Profile;
}

export function Items({ navItems, mode = "semi", pict }: ItemsProps) {
    const sidebarItemInOverMode = (item: Item, index: number) => (
        <ListItem key={index}>
            <Link
                display="block"
                as={NavLink}
                to={item.to}
                _focus={{ bg: "gray.100" }}
                _hover={{
                    bg: "gray.200"
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
            <Tooltip label={item.label} placement="right" bg="purple.500" color="white">
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
                <Tooltip label={pict.label} placement="right" bg="purple.500" color="white">
                    <NavLink to={pict.to} style={{ textDecoration: 'none' }}>
                        <Avatar
                            src={pict.image_path}
                            name={pict.label}
                            size="l"
                            bg="transparent"
                            _hover={{ cursor: 'pointer' }}
                            />
                        <Text>{pict.role}</Text>
                    </NavLink>
                </Tooltip>
                {navItems.map((item, index) => sidebarItemInSemiMode(item, index))}
            </List>
        );
    } else {
        return (
            <List spacing={3}>
                <WrapItem>
                    <Link
                        display="block"
                        as={NavLink}
                        to={pict.to}
                        _focus={{ bg: "gray.100" }}
                        _hover={{
                            bg: "gray.200"
                        }}
                        _activeLink={{ bg: "purple.500", color: "white" }}
                        w="full"
                        borderRadius="md"
                    >
                        <Flex alignItems="center" p={2}>
                            <Avatar name={pict.label} src={pict.image_path} />
                            <Flex display={"block"}>
                                <Text ml={2} fontWeight={"bold"}>{pict.label}</Text>
                                <Text ml={2}>{pict.role}</Text>
                            </Flex>
                        </Flex>
                    </Link>
                </WrapItem>
                {navItems.map((item, index) => sidebarItemInOverMode(item, index))}
            </List>
        );
    };
}

export default Items;
