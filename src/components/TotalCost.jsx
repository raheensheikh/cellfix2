import React from "react";

const TotalCost = () => {
  return (
    <div className="totalPrices">
      <div className="d_flexBetween">
        <p className="boldText">Subtotal:</p>
        <p className="price">$559.00</p>
      </div>
      <div className="d_flexBetween">
        <p className="boldText">Shipping Cost:</p>
        <p className="price">$49.00</p>
      </div>
      <div className="d_flexBetween">
        <p className="boldText">Total:</p>
        <p className="price">$608.00</p>
      </div>
    </div>
  );
};

export default TotalCost;
