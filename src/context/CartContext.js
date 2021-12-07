import { ProductionQuantityLimitsOutlined } from '@mui/icons-material';
import { createContext, useState } from 'react';

const CartContext = createContext({
    products: [],
    addProductToCart: product => {},
    removeProductFromCart: productId => {},
    updateProductQuantity: (productId, quantity) => {},
});

export function CartProvider({ children }) {
    const [products, setProducts] = useState([]);

    function addProductToCart(product) {
        // console.log(product.quantity);

        // setProducts(state => {
        //     const existingProduct = state.find(x => x.id === product.id);

        //     if (!existingProduct) {
        //         return [...state, product];
        //     }

        //     return state.map(x => {
        //         if (x.id === product.id) {
        //             x.quantity += product.quantity;
        //         }

        //         return x;
        //     });
        // });
        product.quantity = 1;
        setProducts(state => [...state, product]);
    }

    function removeProductFromCart(productId) {
        setProducts(state => state.filter(product => product.id !== productId));
    }

    function updateProductQuantity(productId, quantity) {
        console.log('here');
        setProducts(state =>
            state.map(x => {
                if (x.id === productId) {
                    x.quantity = quantity;
                    return x;
                }
                return x;
            })
        );
    }

    return (
        <CartContext.Provider
            value={{
                products,
                addProductToCart,
                removeProductFromCart,
                updateProductQuantity,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export default CartContext;

//
