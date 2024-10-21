import React, { useState, useEffect } from 'react';
import './Menu.css';
import './Modal.css';
import { toast } from 'react-hot-toast';
import Menuitem from '../../component/MenuItem/Menuitem.jsx';
import { useSelector } from 'react-redux';
import { selectLoggedInUser } from '../../store/user/userSlice.js';
// import { selectLoggedInUser } from './store/user/userSlice.js';

const Menu = () => {

    const [menuData, setMenuData] = useState([]);
    const [showModal, setShowModal] = useState(false); // State to toggle modal
    const [showHalfPriceInput, setShowHalfPriceInput] = useState(false);
    const [item_name, setItemName] = useState("");
    const [item_price_full, setItemPriceFull] = useState("");
    const [item_price_half, setItemPriceHalf] = useState("");
    const [item_image, setItemImage] = useState(null);
    const [menuUpdated, setMenuUpdated] = useState(false);

    const currentUser = useSelector(selectLoggedInUser);

    const handleToggleHalfPrice = () => {
        setShowHalfPriceInput(!showHalfPriceInput);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Add logic to handle form submission and add the new food item
        // Input validation
        setMenuUpdated(false);
        const restaurant_id = currentUser.user.restaurant_id;
        // console.log("Line 41 id:-  ",restaurant_id

        if (!item_name || !item_price_full) {
            toast.error("Item name and price are required.");
            return;
        }

        try {
            // Fetch request to the signup endpoint
            const response = await fetch('/api/menu/add-item', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ item_name, item_price_full, item_price_half, item_image, restaurant_id }),
                credentials: "include",
                mode: 'cors',
            });

            if (response.ok) {
                const data = await response.json();
                toast.success(data.message);
                console.log(data);
                setMenuUpdated(true);

            } else {
                const errorData = await response.json();
                toast.error(errorData.error || 'Registration failed');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred. Please try again.');
        }

        // console.log(newFoodItem);
        setShowModal(false); // Close the modal after submission
    };

    // API call for fetching restaurant menu
    const fetchData = async () => {

        try {
            const response = await fetch('/api/menu/get-menu', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Include cookies in the request
                mode: 'cors',
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data);

            setMenuData(data.data);
            // console.log("Hai kuch:- ",menuData);

        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, [menuUpdated]);

    return (
        <div className="menu-container">
            <h1 className="menu-heading">Our Menu</h1>
            <div className="menu-items-wrapper">
                {menuData.map(item => (
                    <Menuitem key={item._id}
                        name={item.item_name}
                        price_full={item.item_price_full}
                        price_half={item.item_price_half}
                        image={item.item_image} />
                ))}
            </div>
            <button className="menu-button" onClick={() => setShowModal(true)}>Add More</button>
            {/* <button className="menu-button" disabled>Order Now</button> */}
            <button className="menu-button" disabled>Generate QR</button>
            {/* Modal for adding food items */}
            {showModal && (
                <div className="modal-overlay" aria-hidden={!showModal}>
                    <div className="modal-content">
                        <h2>Add New Food Item</h2>
                        <form className="add-food-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Food Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="item_name"
                                    value={item_name}
                                    onChange={(e) => setItemName(e.target.value)}
                                    placeholder="Enter food name"
                                
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="price">{showHalfPriceInput ? 'Full Price' : 'Price'}</label>
                                <input
                                    type="text"
                                    id="price"
                                    name="item_price_full"
                                    value={item_price_full}
                                    onChange={(e) => setItemPriceFull(e.target.value)}
                                    placeholder={showHalfPriceInput ? 'Enter full price' : 'Enter price'}
                                
                                />
                            </div>
                            <div className="form-group">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={showHalfPriceInput}
                                        onChange={handleToggleHalfPrice}
                                    />
                                    Half Price Available
                                </label>
                            </div>
                            {showHalfPriceInput && (
                                <div className="form-group">
                                    <label htmlFor="halfPrice">Half Price</label>
                                    <input
                                        type="text"
                                        id="halfPrice"
                                        name="item_price_half"
                                        value={item_price_half}
                                        onChange={(e) => setItemPriceHalf(e.target.value)}
                                        placeholder="Enter half price"
                                    />
                                </div>
                            )}
                            <div className="form-group">
                                <label htmlFor="image">Image</label>
                                <input
                                    type="file"
                                    id="image"
                                    accept="image/*"
                                    // onChange={handleImageUpload}
                                
                                />
                            </div>
                            <div className="modal-buttons">
                                <button type="submit" className="submit-btn">Add Item</button>
                                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Menu;

/// Try this for Qr feature
// import React, { useState, useEffect } from 'react';
// import './Menu.css';
// import burgerImage from '../../assets/burger.jpeg';
// import MenuItem from './MenuItem.jsx';
// import './Modal.css';
// import QRCode from 'react-qr-code';
// import axios from 'axios';

// const Menu = () => {
//   const [menuData, setMenuData] = useState([]);
//   const [showModal, setShowModal] = useState(false); // State to toggle modal
//   const [qrCode, setQrCode] = useState(null);
//   const [isQrCodeGenerated, setIsQrCodeGenerated] = useState(false);

//   useEffect(() => {
//     // Fetch data from API and set it to state (example dummy data for now)
//     const fetchData = async () => {
//       const data = [
//         { id: 1, name: 'Cheese Burger', price: '₹120', image: burgerImage },
//         { id: 2, name: 'Margherita Pizza', price: '₹250', image: burgerImage },
//         { id: 3, name: 'Chicken Nuggets', price: '₹150', image: burgerImage },
//         { id: 4, name: 'Pasta Alfredo', price: '₹200', image: burgerImage },
//         { id: 5, name: 'French Fries', price: '₹100', image: burgerImage },
//       ];

//       setMenuData(data);
//     };

//     fetchData();
//   }, []);

//   const handleGenerateQrCode = () => {
//     const qrCodeUrl = `https://example.com/menu/${menuData[0].name}`;
//     setQrCode(qrCodeUrl);
//     setIsQrCodeGenerated(true);
//   };

//   const handleSaveQrCode = () => {
//     axios.post('/save-qrcode', { qrCode, menuData })
//       .then((response) => {
//         console.log(response.data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   return (
//     <div className="menu-container">
//       <h1 className="menu-heading">Our Menu</h1>
//       <div className="menu-items-wrapper">
//         {menuData.map((item) => (
//           <MenuItem key={item.id} item={item} />
//         ))}
//       </div>
//       <button className="menu-button" onClick={() => setShowModal(true)}>Add More</button>
//       {/* <button className="menu-button" disabled>Order Now</button> */}
//       <button className="menu-button" onClick={handleGenerateQrCode}>Generate QR</button>
//       {isQrCodeGenerated && (
//         <div>
//           <QRCode value={qrCode} size={300} />
//           <button onClick={handleSaveQrCode}>Save QR Code</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Menu;
