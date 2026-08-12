import RatingPage from "./Rating";
import FoodSeller from "./foodSeller";
import UnderPage from "./underPage";
import OffersPage from "./offers";
import SortAll from "./sortAll";

export default function SellerPage(){
    return (
        <div className="flex flex-row flex-wrap items-center justify-center gap-3 py-2 overflow-x-auto w-full scrollbar-hide">
             <SortAll />
             <RatingPage />
             <FoodSeller />
             <UnderPage />
             <OffersPage />
        </div>
    )
}

