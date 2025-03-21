import { Card } from './components/Card/Card';
import { Header } from './components/Header';
import { Drawer } from './components/Drawer/Drawer';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
	const [cartOpened, setCartOpened] = useState(false);
	const [items, setItems] = useState([]);
	const [cartItems, setCartItems] = useState([]);
	const [inputValue, setInputValue] = useState('');

	useEffect(() => {
		axios
			.get('https://67d0888a825945773eb13b65.mockapi.io/items')
			.then(response => setItems(response.data));

		axios
			.get('https://67d0888a825945773eb13b65.mockapi.io/cart')
			.then(response => setCartItems(response.data));
	}, []);

	const onAddToCart = sneakerItem => {
		console.log('sneakerItem', sneakerItem);
		
		if (!cartItems.some(item => item.id === sneakerItem.id)) {
			axios.post(
				'https://67d0888a825945773eb13b65.mockapi.io/cart',
				sneakerItem
			);
			setCartItems(prevItems => [...prevItems, sneakerItem]);
		}
	};

	const onClickRemove = id => {
		axios.delete(`https://67d0888a825945773eb13b65.mockapi.io/cart/${id}`);
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
			<div className='content p-40'>
				<div className='d-flex align-center mb-40 justify-between'>
					<h1>{inputValue ? `Поиск по '${inputValue}'` : 'Все Кроссовки'}</h1>
					<div className='search-block d-flex align-center'>
						<img
							width={14.25}
							height={14.25}
							src='/img/search.svg'
							alt='search'
						/>
						<input
							onChange={onChangeInput}
							value={inputValue}
							placeholder='Поиск...'
						/>
					</div>
				</div>
				<div className='sneakers d-flex flex-wrap'>
					{items
						.filter(sneaker =>
							sneaker.name.toLowerCase().includes(inputValue.toLowerCase())
						)
						.map(sneaker => (
							<Card
								key={sneaker.id}
								{...sneaker}
								onPlus={() => onAddToCart(sneaker)}
							/>
						))}
				</div>
			</div>
		</div>
	);
}

export default App;
