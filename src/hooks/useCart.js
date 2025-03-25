import { useContext } from 'react';
import { AppContext } from '../context';

export const useCart = () => {
  const { cartItems, setCartItems } = useContext(AppContext);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);
  const percentOfTotalPrice = ((totalPrice / 100) * 5).toFixed(2);

  const getCurrentDateTime = () => {
    const now = new Date();

    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}`;
  };

  return {
    cartItems,
    setCartItems,
    totalPrice,
    percentOfTotalPrice,
    getCurrentDateTime,
  };
};
