import LeftMenu from "./leftMenu";
import Order from "./order";

export default function orderPage(){
    return (
        <div className="flex">
         <LeftMenu />          
           <Order />
        </div>
    )
}