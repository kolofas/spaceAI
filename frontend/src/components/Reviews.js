// src/components/Reviews.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Reviews() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/reviews/')
            .then(response => {
                setReviews(response.data);
            })
            .catch(error => {
                console.error('Error fetching reviews:', error);
            });
    }, []);

    return (
        <div className="container mt-4">
            <h2>Reviews</h2>
            <table className="table table-striped mt-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User</th>
                        <th>Comment</th>
                    </tr>
                </thead>
                <tbody>
                    {reviews.map(review => (
                        <tr key={review.id}>
                            <td>{review.id}</td>
                            <td>{review.user}</td>
                            <td>{review.comment}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Reviews;
