import { useState } from 'react';
import './Register.css';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [restaurantName, setRestaurantName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Make sure all fields are filled
        if (!restaurantName || !username || !password) {
            toast.error('All fields are required');
            return;
        }

        try {
            // Fetch request to the signup endpoint
            const response = await fetch('https://qrmenubackend.onrender.com/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ restaurantName, username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                toast.success('Registration successful!');
                navigate("/login");
                console.log('User data:', data);
                // You can clear the form if needed
                setRestaurantName("");
                setUsername("");
                setPassword("");
            } else {
                const errorData = await response.json();
                toast.error(errorData.error || 'Registration failed');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred. Please try again.');
        }
    };

    return (
        <div className="register-container">
            <h2 className="heading">Register Your Restaurant</h2>
            <div className="form-wrapper">
                <form className="register-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="res-name">Restaurant Name</label>
                        <input type="text" id="res-name" name='restaurantName' placeholder="Your restaurant name" value={restaurantName}
                            onChange={(e) => setRestaurantName(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" placeholder="Enter username..." value={username}
                            onChange={(e) => setUsername(e.target.value)} name="username" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="Enter password..." value={password}
                            onChange={(e) => setPassword(e.target.value)} name="password" />
                    </div>

                    <button type="submit" className="submit-btn">Sign Up</button>
                </form>
            </div>
        </div>
    );
}

export default Register;