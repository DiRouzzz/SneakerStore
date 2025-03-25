import styles from './Card.module.scss';
import { AppContext } from '../../context';
import { useContext } from 'react';
import { LoaderCard } from './components/LoaderCard/LoaderCard';

export const Card = ({
  name,
  price,
  image,
  onPlus,
  onFavorite,
  addedCart,
  addedFavorite,
  isOrders = false,
}) => {
  const { isLoading } = useContext(AppContext);

  return (
    <div className={styles.card}>
      {isLoading ? (
        <LoaderCard />
      ) : (
        <>
          <div className={styles.favorite}>
            {!isOrders && (
              <img
                onClick={onFavorite}
                src={
                  addedFavorite
                    ? '/img/btn-heart-liked.svg'
                    : '/img/btn-heart-unliked.svg'
                }
                alt="heart-unliked"
              />
            )}
          </div>
          <img width={133} height={112} src={image} alt="sneakers" />
          <h5>{name}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{price} руб.</b>
            </div>
            {!isOrders && (
              <img
                className={styles.plus}
                width={32}
                height={32}
                onClick={onPlus}
                src={addedCart ? '/img/btn-liked.svg' : '/img/btn-plus.svg'}
                alt="plus"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};
