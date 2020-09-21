import React from "react";
import remove from "./../../Resources/remove-circle-outline.svg";
import add from "./../../Resources/add-circle-outline.svg";

import { updateProduct } from "./../../Firebase/db";

export default function CartItem({ productArr, index }) {
  const name = productArr[0];
  const quantity = productArr[1];

  const handleSumbit = (e) => {
    const type = e.target.alt;
    const productName = e.target.parentElement.parentElement.querySelector(
      ".cart-item-name"
    ).textContent;

    updateProduct(type, productName);
  };

  return (
    <div className="cart-item">
      <span className="cart-item-number">{index + 1}</span>
      <span className="cart-item-name">{name}</span>
      <span className="cart-item-less">
        <img onClick={handleSumbit} src={remove} alt="remove" />
      </span>
      <span className="cart-item-quantity">Quantity: {quantity}</span>
      <span className="cart-item-add">
        <img onClick={handleSumbit} src={add} alt="add" />
      </span>
    </div>
  );
}
