// src/components/Categories.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from "./Layout";
import '../styles/Global.css';

function Categories() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/categories/')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    return (
        <Layout>
            <div className="table-container">
                <h2 className='categories-title'>Categories</h2>
                <table className="table-custom">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Discription</th>
                    </tr>
                    </thead>
                    <tbody>
                    {categories.map(category => (
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td>{category.description}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
}

export default Categories;
