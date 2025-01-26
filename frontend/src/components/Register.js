import React, { useState } from 'react';
import axios from 'axios';
import Layout from './Layout';
import '../styles/Register.css';

function Register() {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.username || !formData.email || !formData.password) {
            setError('All fields are required');
            return;
        }
        setError('');
        axios.post('http://127.0.0.1:8000/api/register/', formData)
            .then(response => {
                alert('Registration successful!');
                setFormData({ username: '', email: '', password: '' });
            })
            .catch(error => {
                console.error('Error registering user:', error);
                if (error.response) {
                    setError(error.response.data.detail || 'Registration failed');
                } else if (error.request) {
                    setError('No response from server');
                } else {
                    setError('An error occurred');
                }
            });
    };

    return (
        <Layout>
            <div className="register-container">
                <div className="register-card">
                    <h2>Register</h2>
                    {error && <p className="text-danger">{error}</p>}
                    <form onSubmit={handleSubmit} className="mt-3">
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Register</button>
                    </form>
                </div>
            </div>
        </Layout>
    );
}

export default Register;