import { useEffect, useState } from 'react';
import { Card } from '../components/Card/Card';
import axios from 'axios';
import { ORDERS_API } from '../api';
import { Info } from '../components/Info/Info';

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(ORDERS_API);

        if (response.status !== 200) {
          throw new Error('Ошибка при запросе заказов');
        }

        setOrders(response.data);
      } catch (error) {
        console.error(
          'Ошибка при получении данных: fetchOrders',
          error?.message || error
        );
      }
    };

    fetchOrders();
  }, []);

  const onClickRemoveOrder = async (id) => {
    try {
      const { status } = await axios.delete(`${ORDERS_API}/${id}`);
      if (status !== 200) {
        throw new Error('Ошибка при отмене заказа');
      }
      setOrders((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Ошибка в onClickRemoveOrder:', error?.message || error);
    }
  };

  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>Мои Заказы</h1>
      </div>
      {orders.length ? (
        orders.map(({ id, items, date }) => {
          return (
            <div className="order" key={id}>
              <div className="d-flex align-center justify-between">
                <h2>Заказ "{id}"</h2>
                <h3>Дата оформления заказа {date}</h3>
                <button
                  className="removeOrderButton mb-30 mt-30"
                  onClick={() => onClickRemoveOrder(id)}
                >
                  Отменить заказ
                </button>
              </div>
              <div className="sneakers d-flex flex-wrap">
                {items.map((sneaker) => (
                  <Card key={sneaker.id} {...sneaker} isOrders={true} />
                ))}
              </div>
              <div className="line"></div>
            </div>
          );
        })
      ) : (
        <div className="info">
          <Info
            title="У вас нет заказов"
            description="Оформите хотя бы один заказ."
            src="/img/smileOrder.svg"
            alt="smileOrder"
            width="70px"
            height="70px"
          />
        </div>
      )}
    </div>
  );
};
