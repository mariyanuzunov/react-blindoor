import { createContext, useState } from 'react';

const CartContext = createContext({
    products: [],
    addProductToCart: product => {},
    removeProductFromCart: productId => {},
    updateProductQuantity: (productId, quantity) => {},
    checkIfInCart: () => {},
    resetCart: () => {},
});

export function CartProvider({ children }) {
    const [products, setProducts] = useState([]);

    function addProductToCart(product) {
        product.quantity = 1;
        setProducts(state => [...state, product]);
    }

    function removeProductFromCart(productId) {
        setProducts(state => state.filter(product => product.id !== productId));
    }

    function updateProductQuantity(productId, quantity) {
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

    function checkIfInCart(productId) {
        return products.find(x => x.id === productId) ? true : false;
    }

    function resetCart() {
        setProducts([]);
    }

    return (
        <CartContext.Provider
            value={{
                products,
                addProductToCart,
                removeProductFromCart,
                updateProductQuantity,
                checkIfInCart,
                resetCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export default CartContext;

//
