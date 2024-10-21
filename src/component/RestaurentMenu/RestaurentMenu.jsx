import { useParams } from "react-router-dom";
import Menulist from "../Menulist";

const ResaturentMenu = () => {
    const { restaurantSlug } = useParams();
    console.log("Restaurant Menu:- ", restaurantSlug);
    

    return (
        <>
            <Menulist restaurantSlug={restaurantSlug} />
        </>
    );
}

export default ResaturentMenu;