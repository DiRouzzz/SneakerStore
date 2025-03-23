import { useEffect, useState } from 'react';
import { Card } from '../components/Card/Card';
import axios from 'axios';
import { ORDERS_API } from '../api';

export const Orders = () => {
	const [orders, setOrders] = useState([]);
	useEffect(() => {
		(async () => {
			const { data } = await axios.get(ORDERS_API);
			setOrders(data);
		})();
	}, []);

	const onClickRemoveOrder = async id => {
		try {
			const { status } = await axios.delete(`${ORDERS_API}/${id}`);
			if (status !== 200) {
				throw new Error('Ошибка при отмене заказа');
			}
			setOrders(prev => prev.filter(item => item.id !== id));
		} catch (error) {
			console.error('Ошибка в onClickRemoveOrder:', error?.message || error);
		}
	};

	return (
		<div className='content p-40'>
			<div className='d-flex align-center mb-40 justify-between'>
				<h1>Мои Заказы</h1>
			</div>
			{orders.map(({ id, items }) => {
				return (
					<div key={id}>
						<div className='d-flex align-center justify-between'>
							<h2>Заказ "{id}"</h2>
							<button onClick={() => onClickRemoveOrder(id)}>
								Отменить заказ
							</button>
						</div>
						<div className='sneakers d-flex flex-wrap'>
							{items.map(sneaker => (
								<Card key={sneaker.id} {...sneaker} isOrders={true} />
							))}
						</div>
					</div>
				);
			})}
		</div>
	);
};
