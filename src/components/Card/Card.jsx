import styles from './Card.module.scss';
import ContentLoader from 'react-content-loader';

export const Card = ({
	name,
	price,
	image,
	onPlus,
	onFavorite,
	addedItems,
	addedFavorite,
	isLoading,
}) => {
	const onClickPlus = () => {
		onPlus();
	};

	const onClickFavorite = () => {
		onFavorite();
	};

	return (
		<div className={styles.card}>
			{isLoading ? (
				<ContentLoader
					speed={2}
					width={210}
					height={260}
					viewBox='0 0 210 260'
					backgroundColor='#f3f3f3'
					foregroundColor='#ecebeb'>
					<rect x='0' y='0' rx='2' ry='2' width='150' height='91' />
					<rect x='0' y='107' rx='3' ry='3' width='150' height='15' />
					<rect x='-4' y='126' rx='3' ry='3' width='93' height='15' />
					<rect x='0' y='163' rx='8' ry='8' width='80' height='24' />
					<rect x='118' y='155' rx='8' ry='8' width='32' height='32' />
				</ContentLoader>
			) : (
				<>
					<div className={styles.favorite}>
						<img
							onClick={onClickFavorite}
							src={
								addedFavorite
									? '/img/btn-heart-liked.svg'
									: '/img/btn-heart-unliked.svg'
							}
							alt='heart-unliked'
						/>
					</div>
					<img width={133} height={112} src={image} alt='sneakers' />
					<h5>{name}</h5>
					<div className='d-flex justify-between align-center'>
						<div className='d-flex flex-column'>
							<span>Цена:</span>
							<b>{price} руб.</b>
						</div>
						<img
							className={styles.plus}
							width={32}
							height={32}
							onClick={onClickPlus}
							src={addedItems ? '/img/btn-liked.svg' : '/img/btn-plus.svg'}
							alt='plus'
						/>
					</div>
				</>
			)}
		</div>
	);
};
