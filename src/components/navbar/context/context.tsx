import { useDisclosure } from "@chakra-ui/react";
import { createContext, useContext } from "react";

const Context = createContext<ReturnType<typeof useDisclosure> | null>(null);

export function useSidenav() {
  const sidebar = useContext(Context);
  if (!sidebar) {
    throw new Error("Cannot use `sidebar context` outside SidebarProvider");
  }
  return { ...(sidebar as ReturnType<typeof useDisclosure>) };
}

export function Provider({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  const disclosure = useDisclosure();
  return (
    <Context.Provider value={{ ...disclosure }} {...props}>
      {children}
    </Context.Provider>
  );
}

export default Provider;
