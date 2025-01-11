import React, { createContext, useReducer, useContext } from 'react';

const AppContext = createContext();

const initialState = {
  user: null, // User data (e.g., { id, name, email })
  token: null, // Token for authenticated API requests
  menuItems: [], // Available menu items
  cart: [], // Items in the cart
  orders: [], // Order history
};

// Reducer to manage state updates
const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };

    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        cart: [],
      };

    case 'SET_MENU':
      return {
        ...state,
        menuItems: action.payload,
      };

    case 'ADD_TO_CART': {
      const existingItemIndex = state.cart.findIndex(item => item._id === action.payload._id);
      if (existingItemIndex !== -1) {
        const updatedCart = [...state.cart];
        updatedCart[existingItemIndex].quantity += 1;
        return { ...state, cart: updatedCart };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };
    }

    case 'UPDATE_CART_ITEM': {
      const { itemId, increment } = action.payload;
      const updatedCart = state.cart
        .map(item =>
          item._id === itemId
            ? { ...item, quantity: item.quantity + (increment ? 1 : -1) }
            : item
        )
        .filter(item => item.quantity > 0);
      return { ...state, cart: updatedCart };
    }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item._id !== action.payload),
      };

    case 'CLEAR_CART':
      return { ...state, cart: [] };

    case 'PLACE_ORDER': {
      const totalAmount = state.cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      const order = {
        id: `order-${Date.now()}`,
        customerName: action.payload.customerName,
        deliveryAddress: action.payload.deliveryAddress,
        items: action.payload.items,
        totalAmount,
        date: new Date().toLocaleString(),
        estimatedDelivery: action.payload.estimatedDelivery,
      };
      return {
        ...state,
        orders: [...state.orders, order], // Add order to the orders array
        cart: [], // Clear the cart after placing the order
      };
    }

    case 'SET_ORDERS':
      return { ...state, orders: action.payload };

    case 'ADD_ORDER':
      return {
        ...state,
        orders: [...state.orders, action.payload], // Append the new order to the orders array
      };

    case 'SET_ORDER_DETAILS':
      return {
        ...state,
        orderDetails: action.payload, // Store order details in state
      };

    default:
      console.error(`Unhandled action type: ${action.type}`);
      return state;
  }
};

// App Provider to wrap the application
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Hook to use AppContext
export const useAppContext = () => useContext(AppContext);
