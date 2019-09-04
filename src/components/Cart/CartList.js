import React from "react";
import CartItem from "./CartItem.js";

export default function CartList({ value }) {
  const { cart } = value;
  // item is the items in the cart, such as the phone, id, price etc
  // the value is everything from the context file
  console.log(cart);
  return (
    <div>
      {cart.map(item => {
        return <CartItem key={item.id} item={item} value={value}></CartItem>;
      })}
    </div>
  );
}
