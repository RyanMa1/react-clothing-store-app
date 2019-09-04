import React, { Component } from "react";
import Title from "../Title.js";
import CartColumns from "./CartColumns.js";
import EmptyCart from "./EmptyCart.js";
import { ProductConsumer } from "../../context";
import CartList from "./CartList.js";
import CartTotal from "./CartTotal.js";
class Cart extends Component {
  render() {
    return (
      <section>
        <ProductConsumer>
          {value => {
            //   destructuring value to get the cart object!!
            //value contains everything from the context file
            const { cart } = value;
            if (cart.length > 0) {
              return (
                <React.Fragment>
                  <Title name="your" title="cart"></Title>

                  <CartColumns></CartColumns>
                  <CartList value={value}></CartList>
                  <CartTotal value={value}></CartTotal>
                </React.Fragment>
              );
            } else {
              return <EmptyCart></EmptyCart>;
            }
          }}
        </ProductConsumer>
      </section>
    );
  }
}

export default Cart;
