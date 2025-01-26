// src/components/Networks.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Networks() {
    const [networks, setNetworks] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/networks/')
            .then(response => {
                setNetworks(response.data);
            })
            .catch(error => {
                console.error('Error fetching networks:', error);
            });
    }, []);

    return (
        <div className="container mt-4">
            <h2>Networks</h2>
            <table className="table table-striped mt-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {networks.map(network => (
                        <tr key={network.id}>
                            <td>{network.id}</td>
                            <td>{network.name}</td>
                            <td>{network.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Networks;
