import React, { useState, useEffect } from "react";

import cart from "./../Resources/cart.svg";

import { useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "./../Redux/userSlice";

import { signOut } from "../Firebase/auth";
import {
  addProduct,
  getUserdataDB,
  getUserdataOnSnapashotDB,
} from "../Firebase/db";

export default function Products() {
  const [total, setTotal] = useState(undefined);

  const history = useHistory();
  const userState = useSelector(selectUser);

  const user = JSON.parse(userState.user);

  const handleCart = (e) => {
    const productName = e.target.parentElement.firstChild.textContent;
    addProduct(user.email, { [productName]: 1 }, productName);
  };

  useEffect(() => {
    getUserdataOnSnapashotDB(
      user.email,
      (callReturn) => {
        if (callReturn && callReturn !== "error")
          setTotal(callReturn.totalProducts);
      },
      false
    );
  });

  return (
    <div className="container">
      <h2>
        Products Page <button onClick={signOut}>Sign Out</button>{" "}
      </h2>

      <div className="cart">
        <img
          className="cart-icon"
          onClick={() => history.push("/cart")}
          src={cart}
          alt="cart-icon"
        />
        <span className="total"> {total !== 0 && total ? total : null}</span>
      </div>

      <h2>Hats</h2>
      <div className="products hats d-flex">
        <div className="product">
          <h4>Nike hat</h4>
          <button onClick={handleCart}>Add to cart</button>
        </div>
        <div className="product">
          <h4>Adidas hat</h4>
          <button onClick={handleCart}>Add to cart</button>
        </div>
        <div className="product">
          <h4>Puma Hat</h4>
          <button onClick={handleCart}>Add to cart</button>
        </div>
        <div className="product">
          <h4>Special Edition hat</h4>
          <button onClick={handleCart}>Add to cart</button>
        </div>
      </div>

      <h2>Shoes</h2>
      <div className="products shoes d-flex">
        <div className="product">
          <h4>Reebok Shoe</h4>
          <button onClick={handleCart}>Add to cart</button>
        </div>
        <div className="product">
          <h4>Jordon Shoe</h4>
          <button onClick={handleCart}>Add to cart</button>
        </div>
        <div className="product">
          <h4>Adidas Shoe</h4>
          <button onClick={handleCart}>Add to cart</button>
        </div>
        <div className="product">
          <h4>Nike Shoe</h4>
          <button onClick={handleCart}>Add to cart</button>
        </div>
      </div>
    </div>
  );
}
