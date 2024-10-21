import './Menuitem.css';
import burgerImage from '../../assets/burger.jpeg';

const Menuitem = ({ name, price_full, price_half ,image}) => {
    return (
        <div className="menu-item">
            <img src={image ?? burgerImage} className="menu-item-image" alt={name} />
            <div className="menu-item-details">
                <p className="menu-item-name">{name}</p>
                {/* Conditionally render prices */}
                {price_half !== null ? (
                    <>
                        <p className="menu-item-price">₹{price_full} full plate</p>
                        <p className="menu-item-price half-price">₹{price_half} half plate</p>
                    </>
                ) : (
                    <p className="menu-item-price">₹{price_full}</p>
                )}
            </div>
        </div>
    );
}

export default Menuitem