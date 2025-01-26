// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import Categories from './components/Categories';
import Networks from './components/Networks';
import Reviews from './components/Reviews';
import Register from './components/Register';
import Logout from './components/Logout';
import Navbar from './components/Navbar';
import Profile from "./components/Profile";
import Login from "./components/Login";
import './App.css';
import './styles/Global.css'; // Импорт глобальных стилей

function App() {
    return (
        <Router>
            <div>
                <Navbar />
                <div className="container mt-4">
                    <Routes>>
                        <Route path="/" element={<Home />} />
                        <Route path="/categories" element={<Categories />} />
                        <Route path="/networks" element={<Networks />} />
                        <Route path="/reviews" element={<Reviews />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route path="/me" element={<Profile />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
