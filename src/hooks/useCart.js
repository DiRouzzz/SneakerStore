import { useContext } from 'react';
import { AppContext } from '../context';

export const useCart = () => {
	const { cartItems, setCartItems } = useContext(AppContext);
	const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);
	const percentOfTotalPrice = ((totalPrice / 100) * 5).toFixed(2);

	return { cartItems, setCartItems, totalPrice, percentOfTotalPrice };
};
