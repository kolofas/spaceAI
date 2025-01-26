import React, { useEffect, useState, useCallback } from 'react'; // Добавлен useCallback
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import '../styles/Global.css';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const refreshAccessToken = useCallback(async () => {
        try {
            const refreshToken = localStorage.getItem('refreshToken');
            const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
                refresh: refreshToken,
            });
            localStorage.setItem('accessToken', response.data.access);
            return response.data.access;
        } catch (err) {
            setError('Session expired. Please log in again.');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            navigate('/login');
            return null;
        }
    }, [navigate]);

    // Мемоизируем fetchUserData с помощью useCallback
    const fetchUserData = useCallback(async () => {
        let token = localStorage.getItem('accessToken');
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            const response = await axios.get('http://127.0.0.1:8000/api/profile/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUserData(response.data);
        } catch (err) {
            if (err.response?.status === 401) {
                token = await refreshAccessToken();
                if (token) {
                    fetchUserData(); // Повторить запрос с обновлённым токеном
                }
            } else {
                setError('Failed to fetch user data. Please log in again.');
            }
        }
    }, [navigate, refreshAccessToken]); // Указываем зависимости для fetchUserData

    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]); // Добавляем fetchUserData в массив зависимостей

    if (error) {
        return <p className="text-danger">{error}</p>;
    }

    if (!userData) {
        return <p>Loading...</p>;
    }

    return (
        <Layout>
            <div>
                <h1>Profile</h1>
                <h3><strong>Username:</strong> {userData.username}</h3>
                <h3><strong>Email:</strong> {userData.email}</h3>
            </div>
        </Layout>
    );
};

export default Profile;