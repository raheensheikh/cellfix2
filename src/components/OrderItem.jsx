// import React, { useState } from "react";
// import { Image } from "react-bootstrap";

// const OrderItem = ({
//   image,
//   title,
//   price,
//   showCloseButton = false,
//   onRemove,
// }) => {
//   const [quantity, setQuantity] = useState(1);

//   const increment = () => setQuantity((prev) => prev + 1);
//   const decrement = () => {
//     if (quantity > 1) setQuantity((prev) => prev - 1);
//   };

//   return (
//     <div className="orderItem">
//       <div className="d_flex">
//         <Image src={image} alt="product" />
//         {showCloseButton && (
//           <button className="removeItem" onClick={onRemove}>
//             ×
//           </button>
//         )}
//         <div style={{ flex: 1 }}>
//           <div className="d_flexBetween">
//             <p className="title2">{title}</p>
//           </div>

//           <div className="d_flexBetween">
//             <p className="price">${price}</p>
//             <div className="counter">
//               <button onClick={decrement} className="counterBtn">
//                 −
//               </button>
//               <span className="qty">{quantity}</span>
//               <button onClick={increment} className="counterBtn">
//                 +
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderItem;
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
          <button className="removeItem" onClick={onRemove}>
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
              <button onClick={onDecrement} className="counterBtn">
                −
              </button>
              <span className="qty">{quantity}</span>
              <button onClick={onIncrement} className="counterBtn">
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
