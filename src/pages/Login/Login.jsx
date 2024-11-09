import { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { login } from '../../store/user/userSlice.js';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Make sure all fields are filled
        if (!username || !password) {
            toast.error('All fields are required');
            return;
        }

        try {
            // Fetch request to the signup endpoint
            const response = await fetch('https://qrmenubackend.onrender.com/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            // console.log(response);
            

            if (response.ok) {
                const data = await response.json();
                toast.success('Login successful!');
                navigate("/menu");
                console.log('User data:', data);

                dispatch(login(data)); // 

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
        <div className="login-container">
            <h2 className="heading">Login</h2>
            <div className="form-wrapper">
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" placeholder="Enter username..." value={username} onChange={(e)=> setUsername(e.target.value)}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="Enter password..." value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>

                    <button type="submit" className="submit-btn">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
