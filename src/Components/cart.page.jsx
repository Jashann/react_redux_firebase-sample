import React, { useEffect, useState } from "react";

import CartItem from "./templates/cart-item.template";

import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "./../Redux/userSlice";

import {
  addProduct,
  getUserdataDB,
  getUserdataOnSnapashotDB,
} from "../Firebase/db";

export default function Cart() {
  const userState = useSelector(selectUser);
  const user = JSON.parse(userState.user);

  const [products, setProducts] = useState("");

  useEffect(() => {
    if (products === "")
      getUserdataOnSnapashotDB(
        user.email,
        (callReturn) => {
          if (callReturn && callReturn !== "error") {
            const totalProducts = callReturn.totalProducts;
            if (totalProducts !== 0 && totalProducts) setProducts(callReturn);
          }
        },
        false
      );
  }, [products, user.email]);

  return (
    <div className="container">
      <h2>Cart Page</h2>
      {products === "" && products.totalProducts === undefined ? null : (
        <div className="cart-items">
          {Object.entries(products.products)
            .sort()
            .map((arr, index) => (
              <CartItem productArr={arr} index={index} key={arr[0]} />
            ))}
        </div>
      )}
    </div>
  );
}

// {
//   /* <div className="cart-item">
//           <span className="cart-item-number">1</span>
//           <span className="cart-item-name">Nike Hat</span>
//           <span className="cart-item-less">
//             <img src={remove} alt="remove" />
//           </span>
//           <span className="cart-item-quantity">Quantity: 1</span>
//           <span className="cart-item-add">
//             <img src={add} alt="add" />
//           </span>
//         </div> */
// }
