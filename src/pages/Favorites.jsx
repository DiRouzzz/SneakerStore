import { useContext } from 'react';
import { Card } from '../components/Card/Card';
import { Info } from '../components/Info/Info';
import { AppContext } from '../context';

export const Favorites = () => {
  const { favorites, cartItems, onAddToCart, onAddToFavorite } =
    useContext(AppContext);
  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>Мои Закладки</h1>
      </div>
      <div className="sneakers d-flex flex-wrap">
        {favorites.length ? (
          favorites.map((sneaker) => (
            <Card
              key={sneaker.id}
              {...sneaker}
              onPlus={() => onAddToCart(sneaker)}
              onFavorite={() => onAddToFavorite(sneaker)}
              addedFavorite={favorites.some((item) => item.id === sneaker.id)}
              addedCart={cartItems.some((item) => item.id === sneaker.id)}
            />
          ))
        ) : (
          <Info
            title="Закладок нет :("
            description="Вы ничего не добавляли в закладки"
            src="/img/smileFavorite.svg"
            alt="smileFavorite"
            width="70px"
            height="70px"
          />
        )}
      </div>
    </div>
  );
};
