import React from "react";
import { Image } from "react-bootstrap";

const OrderItem = ({
  image,
  title,
  price,
  quantity = 1,
  showCloseButton = false,
  onRemove,
  onIncrement,
  onDecrement,
}) => {
  return (
    <div className="orderItem">
      <div className="d_flex">
        <Image src={image} alt="product" />
        {showCloseButton && (
          <button className="removeItem" type="button" onClick={onRemove}>
            ×
          </button>
        )}
        <div style={{ flex: 1 }}>
          <div className="d_flexBetween">
            <p className="title2">{title}</p>
          </div>

          <div className="d_flexBetween">
            <p className="price">${price}</p>
            <div className="counter">
              <button onClick={onDecrement} type="button" className="counterBtn">
                −
              </button>
              <span className="qty">{quantity}</span>
              <button onClick={onIncrement} type="button" className="counterBtn">
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
