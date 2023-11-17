import {
  BiHome,
  BiLogOut,
  BiBookAdd,
  BiGroup,
  BiUserPlus,
  BiSad,
} from "react-icons/bi";
import { Outlet } from "react-router-dom";
import { Provider, Container, Item, Profile, Sidenav } from ".";
import axios from "axios";
import { axiosConfig } from "../../utils/axios";
import config from "../../config/config";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isAdmin, setIsAdmin] = useState(false);
  const axiosInstance = axios.create(axiosConfig());
  const checkAdmin = () => {
    axiosInstance
      .get(`${config.REST_API_URL}/user/isAdmin`)
      .then((res) =>{
        const response = res["data"];
        const {data} = response;
        setIsAdmin(data)
      });
  };
  useEffect(()=>{
    checkAdmin();
    getProfile();
  },[])
  const adminItems: Item[] = [
    { icon: BiUserPlus, label: "Upgrade Request", to: "/admin/request" },
    { icon: BiBookAdd, label: "Premium Courses", to: "/admin/courses" },
    { icon: BiGroup, label: "Premium Users", to: "/admin/users" },
  ];
  const teacherItems: Item[] = [
    { icon: BiHome, label: "Home", to: "/course?page=1" },
    // { icon: BiLogOut, label: "Logout", to: "logout" }
  ];

  const [userImage, setUserImage] = useState("");
  const [username, setUsername] = useState("");
  const [userRole, setUserRole] = useState("");
  const getProfile = () => {
    axiosInstance
    .get(`${config.REST_API_URL}/user/profile`)
    .then((res) => {
      if (res.data.data.image_path){
        setUserImage(res.data.data.image_path);
      } else{
        setUserImage("defaultprofile.jpg");
      }
      setUsername(res.data.data.username);
      {isAdmin ? setUserRole("Admin") : setUserRole("Teacher")}
    })
  }
  
  const pict: Profile = {
    image_path: userImage.toString(),
    label: username,
    role: userRole,
    to: "/profile",
  };
  
  return (
    <Provider>
      <Container sidenav={<Sidenav navItems={isAdmin ? adminItems : teacherItems} pict={!isAdmin ? pict : undefined} />}>
        <Outlet />
      </Container>
    </Provider>
  );
}
