import { Card } from './components/Card/Card';
import { Header } from './components/Header';
import { Drawer } from './components/Drawer';
import { useEffect, useState } from 'react';

function App() {
	const [cartOpened, setCartOpened] = useState(false);
	const [items, setItems] = useState([]);
	const [cartItems, setCartItems] = useState([]);

	useEffect(() => {
		fetch('https://67d0888a825945773eb13b65.mockapi.io/items')
			.then(response => response.json())
			.then(json => setItems(json))
			.catch(error => console.log(error));
	}, []);

	const onAddToCart = sneakerItem => {
		if(!cartItems.includes(sneakerItem)){
			setCartItems(prevItems => [...prevItems, sneakerItem]);
		}
		
		
	};

	return (
		<div className='wrapper clear'>
			{cartOpened && (
				<Drawer cartItems={cartItems} onClose={() => setCartOpened(false)} setCartItems={setCartItems} />
			)}
			<Header onClickCart={() => setCartOpened(true)} />
			<div className='content p-40'>
				<div className='d-flex align-center mb-40 justify-between'>
					<h1>Все кроссовки</h1>
					<div className='search-block d-flex align-center'>
						<img
							width={14.25}
							height={14.25}
							src='/img/search.svg'
							alt='search'
						/>
						<input placeholder='Поиск...' />
					</div>
				</div>
				<div className='sneakers d-flex flex-wrap'>
					{items.map(sneaker => (
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
