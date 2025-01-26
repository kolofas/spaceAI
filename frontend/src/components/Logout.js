// src/components/Logout.js
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const refreshToken = localStorage.getItem('refreshToken'); // Получаем refresh_token
        const accessToken = localStorage.getItem('accessToken'); // Получаем access_token

        if (!refreshToken) {
            alert('Refresh token not found. Logout failed.');
            return;
        }

        try {
            // Отправка запроса logout с accessToken в заголовке и refreshToken в теле
            await axios.post(
                'http://127.0.0.1:8000/api/logout/',
                { refresh_token: refreshToken }, // Тело запроса
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`, // Добавляем accessToken
                    },
                }
            );

            // Очистка токенов
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            alert('Logged out successfully!');
            navigate('/');
        } catch (error) {
            console.error('Error logging out:', error);
            alert('Logout failed! Please try again.');
        }
    };

    return (
        <div className="container mt-4">
            <h2>Are you sure you want to log out?</h2>
            <button onClick={handleLogout} className="btn btn-danger mt-3">
                Logout
            </button>
        </div>
    );
}

export default Logout;
