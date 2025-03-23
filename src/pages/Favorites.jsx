import { Card } from '../components/Card/Card';

export const Favorites = ({
	favorites,
	cartItems,
	onAddToFavorite,
	onAddToCart}) => {
	return (
		<div className='content p-40'>
			<div className='d-flex align-center mb-40 justify-between'>
				<h1>Мои Закладки</h1>
			</div>
			<div className='sneakers d-flex flex-wrap'>
				{favorites.map(sneaker => (
					<Card
						key={sneaker.id}
						{...sneaker}
						onPlus={() => onAddToCart(sneaker)}
						onFavorite={() => onAddToFavorite(sneaker)}
						addedFavorite={favorites.some(item => item.id === sneaker.id)}
						addedCart={cartItems.some(item => item.id === sneaker.id)}
					/>
				))}
			</div>
		</div>
	);
};
