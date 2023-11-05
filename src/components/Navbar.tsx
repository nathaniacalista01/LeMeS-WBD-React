import { IconType } from 'react-icons'
import { ReactText } from 'react'
import { Link } from 'react-router-dom';
import {
  IconButton,
  Box,
  Flex,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Image
} from '@chakra-ui/react'
import {
  BiHome,
  BiSolidBookAdd,
  BiGroup,
  BiLogOut,
  BiMenu,
} from 'react-icons/bi'


interface LinkItemProps {
  name: string
  icon: IconType
  destination: string
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: BiHome, destination: "" },
  { name: 'Premium Courses', icon: BiSolidBookAdd, destination: "premium-courses" },
  { name: 'Premium Users', icon: BiGroup, destination: "premium-users" },
  { name: 'Logout', icon: BiLogOut, destination: "logout" },
]

export default function SimpleSidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Box minH="100vh">
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* navbar when window size is kecil */}
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
    </Box>
  )
}

interface SidebarProps extends BoxProps {
  onClose: () => void
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      bg={useColorModeValue('#564c95', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      ml="-4"
      {...rest}>
      <Flex h="20" alignItems="center" margin="15">
        <Image
          src="/premiumlogo.png"
          alt="Logo"
          width="200px"
          height="auto"
        />
        <Flex ml="10">
          <Icon as={BiMenu} display={{ base: 'flex', md: 'none' }} onClick={onClose} fontSize="30" cursor="pointer" color="white" />
        </Flex>
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} destination={link.destination}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  )
}

interface NavItemProps extends FlexProps {
  icon: IconType
  destination: string
  children: ReactText
}
const NavItem = ({ icon, destination, children, ...rest }: NavItemProps) => {
  return (
    <Link to={destination}>
      <Box
        as="a"
        style={{ textDecoration: 'none' }}
        _focus={{ boxShadow: 'none' }}>
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          color="white"
          _hover={{
            bg: 'purple.100',
            color: 'black',
          }}
          {...rest}>
          {icon && (
            <Icon
              mr="4"
              fontSize="30"
              _groupHover={{
                color: 'black',
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Box>
    </Link>
  )
}

interface MobileProps extends FlexProps {
  onOpen: () => void
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      justifyContent="flex-start"
      {...rest}>
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<BiMenu fontSize="30" />}
      />
    </Flex>
  )
}