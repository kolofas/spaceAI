import React, {useEffect, useState} from "react";
import {fetchCategories} from "../api";


const CategoryList = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchCategories();
                setCategories(data);
            } catch (error) {
                console.error('Error fetch categories:', error);
            }
        };

        getData();
    }, []);


return (
    <div>
        <h2>Список категорий</h2>
        <ul>
            {categories.map(category => (
                <li key={category.id}>{category.name}</li>
            ))}
        </ul>
    </div>
);
};

export default CategoryList;
