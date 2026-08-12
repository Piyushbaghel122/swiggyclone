import { useState } from "react";
import { NavbarDashboard } from "./Navbar";
import SellerPage  from "./sellector/SellerPage";
import MainContent from "./mainContent";
import RestaurantList from "./myreastaurant/reastaurantList";
import CreateMenu from "./Dashbaord/createmenu";
import MyReastaurantPage from "./myreastaurant/mymenulist";
import { Canvas } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial } from "@react-three/drei";

export default function SellerDashboard(){
    const [activeTab, setActiveTab] = useState("Dashboard");

    return (
        <div className="relative min-h-screen"> 
            {/* 3D Background */}
            <div className="absolute inset-0 -z-10 pointer-events-none opacity-40">
                <Canvas>
                    <ambientLight intensity={1} />
                    <directionalLight position={[2, 1, 1]} intensity={2} />
                    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
                        <Sphere visible args={[1, 100, 200]} scale={1.5} position={[3, 0, -5]}>
                            <MeshDistortMaterial color="#FF6B00" attach="material" distort={0.5} speed={2} roughness={0} />
                        </Sphere>
                        <Sphere visible args={[1, 100, 200]} scale={1} position={[-4, 2, -10]}>
                            <MeshDistortMaterial color="#9E300B" attach="material" distort={0.3} speed={1.5} roughness={0} />
                        </Sphere>
                    </Float>
                </Canvas>
            </div>

            <div className="relative z-10">
                <NavbarDashboard activeTab={activeTab} setActiveTab={setActiveTab} />
                
                <main className="w-full bg-white/70 backdrop-blur-sm min-h-[calc(100vh-80px)] shadow-sm">
                    {activeTab === "Dashboard" && <RestaurantList />}
                    {activeTab === "My Restaurant" && <MyReastaurantPage />}
                    {activeTab === "Create Menu" && <CreateMenu />}
                    {activeTab === "Settings" && <MainContent />}
                </main>
            </div>
        </div>
    )
}