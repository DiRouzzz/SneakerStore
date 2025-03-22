import { Card } from '../components/Card/Card';
import { useContext } from 'react';
import { AppContext } from '../context';

export const Home = ({
	items,
	cartItems,
	inputValue,
	onChangeInput,
	onAddToCart,
	onAddToFavorite,
	favorites,
	isLoading,
}) => {
	// const { isAddedItems } = useContext(AppContext);

	const isAddedItems = (items, idSneaker) =>
		items.some(item => item.id === idSneaker);

	const renderItems = () => {
		const filterItems = items.filter(sneaker =>
			sneaker.name.toLowerCase().includes(inputValue.toLowerCase())
		);
		return (isLoading ? [...Array(10)].map(() => ({})) : filterItems).map(
			(sneaker, idx) => (
				<Card
					key={sneaker?.id || idx}
					{...sneaker}
					onPlus={() => onAddToCart(sneaker)}
					onFavorite={() => onAddToFavorite(sneaker)}
					addedCart={isAddedItems(cartItems, sneaker?.id)}
					addedFavorite={isAddedItems(favorites, sneaker?.id)}
				/>
			)
		);
	};
	return (
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
				{renderItems()}
			</div>
		</div>
	);
};
