export const Drawer = ({ onClose, cartItems, setCartItems }) => {
	const onClickRemove = id => {
		const removeItems = cartItems.filter(item => item.id !== id);
		setCartItems(removeItems);
	};
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
			</div>
		</div>
	);
};
