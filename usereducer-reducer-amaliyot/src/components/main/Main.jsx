// components/main/Main.jsx
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import "./Main.css";
import { ACTION_TYPES } from "../../store/reducer";

export default function Main({ sortBy, selectedBrand, selectedColor }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { state, dispatch } = useContext(Context);
    const { products } = state;

    useEffect(() => {
        async function fetchProducts() {
            setLoading(true);
            setError(null);

            let query = 'https://headphones-server.onrender.com/products';
            let params = [];

            if (selectedBrand) {
                params.push(`brand_name=${encodeURIComponent(selectedBrand)}`);
            }

            if (selectedColor) {
                params.push(`color_options_like=${encodeURIComponent(selectedColor)}`);
            }

            if (sortBy) {
                if (sortBy === 'cheap') {
                    params.push(`_sort=price&_order=asc`);
                } else if (sortBy === 'expensive') {
                    params.push(`_sort=price&_order=desc`);
                }
            }

            if (params.length) {
                query += `?${params.join('&')}`;
            }

            try {
                const response = await fetch(query);
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                dispatch({ type: ACTION_TYPES.FETCH_PRODUCTS, payload: data });
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, [selectedBrand, selectedColor, sortBy, dispatch]);

    if (loading) {
        return <p>Loading products...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!products.length) {
        return <p>No products found.</p>;
    }

    return (
        <div>
            <ul className="products">
                {products.map((p) => (
                    <li className="product-card" key={p.id}>
                        <img src={p.image_url} alt={p.name} />
                        <h3>{p.name}</h3>
                        <p><strong>{p.brand_name}</strong></p>
                        <ul className="color-options">
                            {p.color_options.map((color, index) => (
                                <li key={index}
                                    style={{
                                        backgroundColor: color,
                                        width: '20px',
                                        height: '20px',
                                        borderRadius: '50%',
                                        border: '1px solid #000',
                                        marginRight: '5px',
                                    }}
                                ></li>
                            ))}
                        </ul>
                        <p><strong>${p.price}</strong></p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
