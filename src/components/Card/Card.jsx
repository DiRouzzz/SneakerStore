import styles from './Card.module.scss';
import { useState } from 'react';

export const Card = ({ name, price, image, onPlus }) => {
	const [isAdded, setIsAdded] = useState(false);

	const onClickPlus = () => {
		onPlus({ name, price, image });
		setIsAdded(!isAdded);
	};

	return (
		<div className={styles.card}>
			<div className={styles.favorite}>
				<img src='/img/btn-heart.svg' alt='heart-unliked' />
			</div>
			<img width={133} height={112} src={image} alt='sneakers' />
			<h5>{name}</h5>
			<div className='d-flex justify-between align-center'>
				<div className='d-flex flex-column'>
					<span>Цена:</span>
					<b>{price} руб.</b>
				</div>
				<img className={styles.plus}
					width={32}
					height={32}
					onClick={onClickPlus}
					src={isAdded ? '/img/btn-liked.svg' : '/img/btn-plus.svg'}
					alt='plus'
				/>
			</div>
		</div>
	);
};
