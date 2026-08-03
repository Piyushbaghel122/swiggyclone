"use client";

import NavbarDashboard from "../navbar/NavbarDashboard";
import SearchPage from "../search/search";
import MenuFood from "../common/menuFood";
import CompanyMenu from "../common/companyMenu";
import RestaurantList from "../common/restaurantList";
import DarkMenu from "./darkmenu";
import GridItem from "./GridItem.tsx";
import CitiesPage from "./citiesPage.tsx";

export default function UIPage() {
   return (
      <>
         <NavbarDashboard />
         <SearchPage />
         <MenuFood />
         <CompanyMenu />
         <RestaurantList />
         <GridItem />
         <CitiesPage />
         <DarkMenu />
      </>
   );
}