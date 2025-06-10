import React from "react";

const TotalCost = ({subtotal, shipping, total}) => {
  return (
    <div className="totalPrices">
      <div className="d_flexBetween">
        <p className="boldText">Subtotal:</p>
        <p className="price">${subtotal}</p>
      </div>
      <div className="d_flexBetween">
        <p className="boldText">Shipping Cost:</p>
        <p className="price">${shipping}</p>
      </div>
      <div className="d_flexBetween">
        <p className="boldText">Total:</p>
        <p className="price">${total}</p>
      </div>
    </div>
  );
};

export default TotalCost;
