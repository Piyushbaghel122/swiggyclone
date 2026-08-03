import Navbar from "../navbar/navbar";
import Hero from "../Hero/Hero";
import CreateReastaurant from "../common/CreateReastuarant";
import RidePartneer from "../common/ridePartneer";
import DarkMenu from "../common/darkmenu";

export default function HomeComponent(){

    return (
        <>
         
                <Navbar />
                <Hero />
                <CreateReastaurant />
                <RidePartneer />
                <DarkMenu />
    
        </>
    );
}