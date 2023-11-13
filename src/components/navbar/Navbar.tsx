import { BiHome, BiLogOut, BiBookAdd, BiGroup, BiUserPlus, BiSad} from "react-icons/bi";
import { Outlet } from "react-router-dom";
import {
  Provider,
  Container,
  Item,
  Profile,
  Sidenav
} from ".";
import React from "react";

export default function Navbar() {
  const pict: Profile = {
    image_path: "defaultprofile.jpg",
    label: "username",
    role: "admin",
    to: "profile"
  };

  const navItems: Item[] = [
    { icon: BiHome, label: "Home", to: "" },
    { icon: BiUserPlus, label: "Upgrade Request", to: "request" },
    { icon: BiBookAdd, label: "Premium Courses", to: "premium-courses" },
    { icon: BiGroup, label: "Premium Users", to: "premium-users" },
    // { icon: BiLogOut, label: "Logout", to: "logout" }
    // Add more button if needed
  ];

  return (
    <Provider>
      <Container sidenav={<Sidenav navItems={navItems} pict={pict} />}>
        <Outlet />
      </Container>
    </Provider>
  );
}