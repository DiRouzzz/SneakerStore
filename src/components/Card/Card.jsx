import { arrSneakers } from '../../data';
import styles from './Card.module.scss';

export const Card = () => {
	return arrSneakers.map(({ id, name, price, image }) => (
		<div className={styles.card} key={id}>
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
				<button className='button' onClick={() => console.log('Click', name)}>
					<img width={11} height={11} src='/img/plus.svg' alt='plus' />
				</button>
			</div>
		</div>
	));
};
