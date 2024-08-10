// components/aside/Aside.jsx
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import { ACTION_TYPES } from "../../store/reducer";
import "./Aside.css";

export default function Aside({
    selectedBrand,
    setSelectedBrand,
    selectedColor,
    setSelectedColor
}) {
    const [loadingColors, setLoadingColors] = useState(false);
    const [loadingBrands, setLoadingBrands] = useState(false);
    const [error, setError] = useState(null);

    const { state, dispatch } = useContext(Context);
    const { colors, brands } = state;

    useEffect(() => {
        async function fetchColors() {
            setLoadingColors(true);
            setError(null);
            try {
                const response = await fetch("https://headphones-server.onrender.com/colors");
                if (!response.ok) {
                    throw new Error("Failed to fetch colors");
                }
                const data = await response.json();
                dispatch({ type: ACTION_TYPES.FETCH_COLORS, payload: data });
            } catch (error) {
                setError(error.message);
            } finally {
                setLoadingColors(false);
            }
        }

        async function fetchBrands() {
            setLoadingBrands(true);
            setError(null);
            try {
                const response = await fetch("https://headphones-server.onrender.com/brands");
                if (!response.ok) {
                    throw new Error("Failed to fetch brands");
                }
                const data = await response.json();
                dispatch({ type: ACTION_TYPES.FETCH_BRANDS, payload: data });
            } catch (error) {
                setError(error.message);
            } finally {
                setLoadingBrands(false);
            }
        }

        fetchColors();
        fetchBrands();
    }, [dispatch]);

    return (
        <aside className="aside">
            <h2>Brands</h2>
            {loadingBrands && <p>Loading brands...</p>}
            {error && <p>Error: {error}</p>}
            <ul className="brands-list">
                {brands.map((brand, index) => (
                    <li key={index}>
                        <label>
                            <input
                                type="radio"
                                name="brand"
                                value={brand}
                                checked={selectedBrand === brand}
                                onChange={() => setSelectedBrand(brand)}
                            />
                            {brand}
                        </label>
                    </li>
                ))}
            </ul>
            <button onClick={() => setSelectedBrand("")}>Reset Brands</button>

            <h2>Colors</h2>
            {loadingColors && <p>Loading colors...</p>}
            {error && <p>Error: {error}</p>}
            <ul className="colors-list">
                {colors.map((color, index) => (
                    <li key={index}>
                        <button
                            onClick={() => setSelectedColor(color)}
                            style={{
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',
                                border: selectedColor === color ? '2px solid red' : '1px solid #000',
                                backgroundColor: color,
                                cursor: 'pointer',
                            }}
                        ></button>
                    </li>
                ))}
            </ul>
            <button onClick={() => setSelectedColor("")}>Reset Colors</button>
        </aside>
    );
}
