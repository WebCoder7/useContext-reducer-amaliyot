export const ACTION_TYPES = {
    FETCH_COLORS: "FETCH_COLORS",
    FETCH_BRANDS: "FETCH_BRANDS",
    FETCH_PRODUCTS: "FETCH_PRODUCTS",
};

export const initialState = {
    products: [],
    brands: [],
    colors: [],
};

export default function reducer(state, action) {
    switch (action.type) {
        case ACTION_TYPES.FETCH_COLORS:
            return { ...state, colors: action.payload };
        case ACTION_TYPES.FETCH_BRANDS:
            return { ...state, brands: action.payload };
        case ACTION_TYPES.FETCH_PRODUCTS:
            return { ...state, products: action.payload };
        default:
            return state;
    }
}
