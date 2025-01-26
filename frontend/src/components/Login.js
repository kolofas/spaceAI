import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from './Layout'; // Импортируем Layout
import '../styles/Global.css';
import '../styles/Login.css'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/token/', {
                username,
                password,
            });
            localStorage.setItem('accessToken', response.data.access);
            localStorage.setItem('refreshToken', response.data.refresh);
            navigate('/');
        } catch (err) {
            setError('Invalid email or password. Please try again.');
        }
    };

    return (
        <Layout>
            <div className="login-container">
                <div className="login-card">
                    <h2>Login</h2>
                    {error && <p className="text-danger">{error}</p>}
                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label className="form-label">Username:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password:</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default Login;



// kolo@gogo.com
// nikita_test_user
// lofaslo24
// доступы для авторизации