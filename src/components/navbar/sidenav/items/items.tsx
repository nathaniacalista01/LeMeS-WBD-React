import {
    List,
    ListItem,
    Icon,
    Flex,
    Text,
    Link,
    Tooltip,
    IconButton
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import { NavLink } from "react-router-dom";

export interface Item {
    icon: IconType;
    label: string;
    to: string;
}

export interface ItemsProps {
    navItems: Item[];
    mode?: "semi" | "over";
}

export function Items({ navItems, mode = "semi" }: ItemsProps) {
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
            <Tooltip label={item.label} placement="right" bg="transparent" color="black">
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
    return (
        <List spacing={3}>
            {mode === "semi"
                ? navItems.map((item, index) => sidebarItemInSemiMode(item, index))
                : navItems.map((item, index) => sidebarItemInOverMode(item, index))}
        </List>
    );
}

export default Items;
