import Navbar from "./navbar";
import CompanyLogo from "./CompanyLogo";
import DomeGallery from './DomeGallery';
import DarkMenu from "../Darkmenu";

export default function FrontendComponent(){
    return(
        <>
        <Navbar />
        <CompanyLogo/>
           
    <div style={{ width: '100vw', height: '100vh' }}>
      <DomeGallery
  fit={0.8}
  minRadius={600}
  maxVerticalRotationDeg={0}
  segments={34}
  dragDampening={2}
  grayscale={false}
  autoRotate={true}
  autoRotateSpeed={0.5}
/>
</div> 
<DarkMenu />
        </>
    );
}
