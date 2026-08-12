import Navbar from "../navbar/navbar";
import Darkmenu from "../darkmenu/darkmenu";
import MenuList from "../menu/MenuList.tsx";
import { Outlet } from "@tanstack/react-router";
export default function frontend() {
  return (
   <> 
   <Navbar /> 
   <MenuList />
   <Darkmenu />
   </>
  ) 
}
