import { Home } from './pages/Home';
import { Favorites } from './pages/Favorites';
import { Header } from './components/Header';
import { Drawer } from './components/Drawer/Drawer';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ITEMS_API, FAVORITES_API, CART_API } from './api';
import { Route, Routes } from 'react-router-dom';

function App() {
	const [cartOpened, setCartOpened] = useState(false);
	const [items, setItems] = useState([]);
	const [cartItems, setCartItems] = useState([]);
	const [favorites, setFavorites] = useState([]);
	const [inputValue, setInputValue] = useState('');
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			const cartResponse = await axios.get(CART_API);
			const favoritesResponse = await axios.get(FAVORITES_API);
			const itemsResponse = await axios.get(ITEMS_API);

			setTimeout(() => {
				setIsLoading(false);

				setCartItems(cartResponse.data);
				setFavorites(favoritesResponse.data);
				setItems(itemsResponse.data);
			}, 3000);
		};

		fetchData();
	}, []);

	const onAddToCart = async sneakerItem => {
		try {
			const existingItem = cartItems.find(fav => fav.id === sneakerItem.id);

			if (existingItem) {
				const response = await axios.delete(`${CART_API}/${sneakerItem.id}`);

				if (response.status !== 200) {
					throw new Error('Ошибка при удалении из корзины');
				}

				setCartItems(prev => prev.filter(item => item.id !== sneakerItem.id));
				return;
			}

			const response = await axios.post(CART_API, sneakerItem);

			if (response.status !== 201) {
				throw new Error('Ошибка при добавлении в корзину');
			}

			setCartItems(prevItems => [...prevItems, response.data]);
		} catch (error) {
			console.error('Ошибка в onAddToCart:', error?.message || error);
		}
	};

	const onAddToFavorite = async sneakerItem => {
		try {
			const existingItem = favorites.find(fav => fav.id === sneakerItem.id);

			if (existingItem) {
				const response = await axios.delete(
					`${FAVORITES_API}/${sneakerItem.id}`
				);

				if (response.status !== 200) {
					throw new Error('Ошибка при удалении из закладок');
				}

				setFavorites(prev => prev.filter(item => item.id !== sneakerItem.id));
				return;
			}

			const response = await axios.post(FAVORITES_API, sneakerItem);

			if (response.status !== 201) {
				throw new Error('Ошибка при добавлении в закладки');
			}

			setFavorites(prevItems => [...prevItems, response.data]);
		} catch (error) {
			console.error('Ошибка в onAddToFavorite:', error?.message || error);
		}
	};

	const onClickRemove = id => {
		axios.delete(`${CART_API}/${id}`);
		setCartItems(prev => prev.filter(item => item.id !== id));
	};

	const onChangeInput = event => {
		setInputValue(event.target.value);
	};

	return (
		<div className='wrapper clear'>
			{cartOpened && (
				<Drawer
					cartItems={cartItems}
					onClose={() => setCartOpened(false)}
					onClickRemove={onClickRemove}
				/>
			)}
			<Header onClickCart={() => setCartOpened(true)} />
			<Routes>
				<Route
					path='/'
					element={
						<Home
							items={items}
							cartItems={cartItems}
							favorites={favorites}
							inputValue={inputValue}
							onChangeInput={onChangeInput}
							onAddToCart={onAddToCart}
							onAddToFavorite={onAddToFavorite}
							isLoading={isLoading}
						/>
					}
					exact
				/>
				<Route
					path='/favorites'
					element={
						<Favorites
							favorites={favorites}
							onAddToFavorite={onAddToFavorite}
						/>
					}
				/>
			</Routes>
		</div>
	);
}

export default App;
