import styles from './Drawer.module.scss';

export const Drawer = ({ onClose, cartItems, onClickRemove }) => {
	return (
		<div className='overlay'>
			<div className='drawer'>
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
						<div className='items'>
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
									<b>12 999 руб.</b>
								</li>
								<li>
									<span>Налог 5%:</span>
									<div></div>
									<b>1000 руб.</b>
								</li>
							</ul>
							<button className='greenButton'>
								Оформить заказ
								<img src='/img/arrow.svg' alt='arrow' />
							</button>
						</div>
					</>
				) : (
					<div className='cartEmpty d-flex align-center justify-center flex-column flex'>
						<img
							className='mb-20'
							width='120px'
							height='120px'
							src='/img/emptyCart.svg'
							alt='emptyCart'
						/>
						<h2>Корзина пустая</h2>
						<p className='opacity-6'>
							Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.
						</p>
						<button onClick={onClose} className='greenButton'>
							<img src='/img/arrow.svg' alt='arrow' />
							Вернуться назад
						</button>
					</div>
				)}
			</div>
		</div>
	);
};
