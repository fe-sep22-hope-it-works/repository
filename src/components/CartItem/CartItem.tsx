import React, { useEffect, useState } from 'react';
import img from '../../img/card-images/iphone.svg';
import { Phone } from '../../types/Phone';

interface Props {
  product: Phone,
  changeProductQuantity: (productToChange: Phone, newQuantity: number) => void;
  removeItem: (idToRemove: number) => void;
}

export const CartItem: React.FC<Props> = ({
  product, changeProductQuantity, removeItem,
}) => {
  const [
    productQuantity, setProductQuantity,
  ] = useState(product.quantity ? product.quantity : 1);

  useEffect(() => {
    changeProductQuantity(product, productQuantity);
  }, [productQuantity]);

  return (
    <>
      <div className="cart__item__title">
        <button
          type="button"
          className="cart__item__title__button"
          aria-label="Save"
          onClick={() => removeItem(product.id)}
        />

        <img
          src={img}
          alt="iPhone 11 Pro Max"
          className="cart__item__title__image"
        />

        <div className="cart__item__title__text">
          {product.name}
        </div>
      </div>

      <div className="cart__item__price">
        <div className="cart__item__price__quantity">
          <button
            type="button"
            aria-label="Save"
            className="
              cart__item__price__quantity__button
              cart__item__price__quantity__button__decrease
            "
            onClick={() => setProductQuantity(prevQty => prevQty - 1)}
            disabled={productQuantity === 1}
          >
            -
          </button>
          <div
            className="cart__item__price__quantity__text"
          >
            {productQuantity}
          </div>
          <button
            type="button"
            aria-label="Save"
            className="
              cart__item__price__quantity__button
              cart__item__price__quantity__button__increase
            "
            onClick={() => setProductQuantity(
              (prevQty: number) => prevQty + 1,
            )}
          >
            +
          </button>
        </div>

        <div className="cart__item__price__text">
          $
          {product.price}
        </div>
      </div>
    </>
  );
};
