"use client";

import Navbar from "../navbar/NavbarHome";
import SearchPage from "../search/search";
import MenuFood from "../common/menuFood";
import CompanyMenu from "../common/companyMenu";
import RestaurantList from "../common/restaurantList";
import DarkMenu from "./darkmenu";

export default function UIPage() {
   return (
      <>
         <Navbar />
         <SearchPage />
         <MenuFood />
         <CompanyMenu />
         <RestaurantList />
         <DarkMenu />
      </>
   );
}
