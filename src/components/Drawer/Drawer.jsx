import { Info } from '../Info/Info';
import axios from 'axios';
import { ORDERS_API, CART_API } from '../../api';
import { useCart } from '../../hooks/useCart';
import { useState } from 'react';
import styles from './Drawer.module.scss'

export const Drawer = ({ onClose, onClickRemove, opened }) => {
	const {
		cartItems,
		setCartItems,
		totalPrice,
		percentOfTotalPrice,
		getCurrentDateTime,
	} = useCart();
	const [isOrderComplete, setIsOrderComplete] = useState(false);
	const [idOrder, setIdOrder] = useState(null);
	const [isLoadingBtn, setIsLoadingBtn] = useState(false);

	const onClickOrder = async () => {
		try {
			setIsLoadingBtn(true);
			const { data, status } = await axios.post(ORDERS_API, {
				items: cartItems,
				date: getCurrentDateTime(),
			});
			if (status !== 201) {
				throw new Error('Ошибка при оформлении заказа');
			}
			await Promise.all(
				cartItems.map(({ id }) => axios.delete(`${CART_API}/${id}`))
			);
			setCartItems([]);
			setIdOrder(data.id);
			setIsOrderComplete(true);
		} catch (error) {
			console.error('Ошибка в onCLickOrder:', error?.message || error);
			alert('Произошла ошибка при оформлении заказа. Попробуйте позже.');
		}
		setIsLoadingBtn(false);
	};
	return (
		<div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
			<div className={styles.drawer}>
				<h2 className='mb-30 d-flex justify-between'>
					Корзина
					<img
						onClick={onClose}
						className='removeBtn cu-p'
						src='/img/btn-remove.svg'
						alt='remove'
					/>
				</h2>
				{cartItems.length ? (
					<>
						<div className={styles.items}>
							{cartItems.map(({ id, image, name, price }) => (
								<div key={id} className='cartItem d-flex align-center mb-20'>
									<div
										className='cartItemImg'
										style={{ backgroundImage: `url(${image})` }}></div>
									<div className='mr-20 flex'>
										<p className='mb-5'>{name}</p>
										<b>{price} руб.</b>
									</div>
									<img
										onClick={() => onClickRemove(id)}
										className='removeBtn'
										src='/img/btn-remove.svg'
										alt='remove'
									/>
								</div>
							))}
						</div>
						<div className='cartTotalBlock'>
							<ul>
								<li>
									<span>Итого:</span>
									<div></div>
									<b>{totalPrice} руб.</b>
								</li>
								<li>
									<span>Налог 5%:</span>
									<div></div>
									<b>{percentOfTotalPrice} руб.</b>
								</li>
							</ul>
							<button
								disabled={isLoadingBtn}
								onClick={onClickOrder}
								className='greenButton'>
								Оформить заказ
								<img src='/img/arrow.svg' alt='arrow' />
							</button>
						</div>
					</>
				) : (
					<Info
						title={isOrderComplete ? 'Заказ оформлен!' : 'Корзина пустая'}
						description={
							isOrderComplete
								? `Ваш заказ #${idOrder} скоро будет передан курьерской доставке`
								: 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
						}
						src={
							isOrderComplete ? '/img/completeOrder.svg' : '/img/emptyCart.svg'
						}
						alt={isOrderComplete ? 'Заказ оформлен' : 'Пустая корзина'}
						width='120px'
						height='120px'
						setIsOrderComplete={setIsOrderComplete}
					/>
				)}
			</div>
		</div>
	);
};
