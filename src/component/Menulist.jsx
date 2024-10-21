import Menuitem from "./MenuItem/Menuitem";
import './Menulist.css';
import { useState, useEffect } from "react";

const Menulist = ({ restaurantSlug }) => {
    const [menus, setMenus] = useState([]);
    console.log("Menulist component:- ", restaurantSlug);

    useEffect(() => {
        // Fetch data from API and set it to state
        const fetchData = async () => {

            try {
                const response = await fetch('/api/menu/get-menu', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    // credentials: 'include', // Include cookies in the request
                    body: JSON.stringify({ restaurantSlug }),
                    mode: 'cors',
                });

                const data = await response.json();

                if (data.success == false) {
                    console.log("Yahan koi badiya sa page dikhana hai.", data.message);
                    return;
                }

                setMenus(data.data);

            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchData();
    }, []);

    // Api call with restaurent Name in request body

    return (
        <div className="container">
            <h2 className="menu">{restaurantSlug} Menu</h2>
            <div className="menu-items">
                {menus.map((item) => (
                    <Menuitem
                        key={item._id}
                        name={item.item_name}
                        price_full={item.item_price_full}
                        price_half={item.item_price_half}
                        image={item.item_image}
                    />
                ))}
            </div>
        </div>
    );
}

export default Menulist