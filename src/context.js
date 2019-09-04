import React, { Component } from "react";
import { storeProducts, detailProduct } from "./data.js";
// creating a context api, where we are able to get data from anywhere of the components
//one is the Provider : which provides all the information
//other is Consumer : we do not have to pass props down to child components, we can grab the props anywhere
//provider alone is not good, we need the class ProductProvider
//this class returns our product context and providercomponent
const ProductContext = React.createContext();

class ProductProvider extends Component {
  state = {
    // this passes a reference to the values.... not the right way to do it
    // products: storeProducts,
    // detailProduct : detailProduct
    products: [],
    detailProduct: detailProduct,
    cart: [],
    modelOpen: false,
    modelProduct: detailProduct,
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0
  };

  componentDidMount() {
    this.setProducts();
  }

  setProducts = () => {
    let tempProducts = [];
    // for each iterates through each object in storeProducts (from /data.js)
    storeProducts.forEach(item => {
      // ... is a spread operator
      const singleItem = { ...item };
      tempProducts = [...tempProducts, singleItem];
    });
    this.setState(() => {
      return { products: tempProducts };
    });
  };

  getItem = id => {
    // item is the parameter being passed in for the object to find the object's id
    const product = this.state.products.find(item => item.id === id);
    return product;
  };

  handleDetail = id => {
    const product = this.getItem(id);
    this.setState(() => {
      return { detailProduct: product };
    });
  };

  addToCart = id => {
    let tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;
    this.setState(
      () => {
        return { products: tempProducts, cart: [...this.state.cart, product] };
      },
      () => {
        {
          this.addTotals();
        }
      }
    );
  };

  openModel = id => {
    const product = this.getItem(id);
    this.setState(() => {
      return { modelProduct: product, modelOpen: true };
    });
  };

  closeModel = () => {
    this.setState(() => {
      return { modelOpen: false };
    });
  };

  // these will add or subtract
  increment = id => {
    // finding id of element in cart first
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item => item.id == id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    //then shifting value of state
    product.count += 1;
    product.total = product.price * product.count;
    this.setState(() => {
      return (
        { cart: [...tempCart] },
        () => {
          this.addTotals();
        }
      );
    });
  };

  decrement = id => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item => item.id == id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    //then shifting value of state
    product.count -= 1;
    if (product.count === 0) {
      this.removeItem(id);
    } else {
      product.total = product.price * product.count;
    }
    this.setState(() => {
      return (
        { cart: [...tempCart] },
        () => {
          this.addTotals();
        }
      );
    });
  };

  removeItem = id => {
    let tempProducts = [...this.state.products];
    let tempCart = [...this.state.cart];
    tempCart = tempCart.filter(item => item.id != id);
    const index = tempProducts.indexOf(this.getItem(id));
    let removedProduct = tempProducts[index];
    removedProduct.inCart = false;
    removedProduct.count = 0;
    removedProduct.total = 0;

    this.setState(
      () => {
        return {
          cart: [...tempCart],
          products: [...tempProducts]
        };
      },
      () => {
        this.addTotals();
      }
    );
  };

  clearCart = () => {
    this.setState(
      () => {
        return { cart: [] };
      },
      // we set the products to the original data
      () => {
        this.setProducts();
        this.addTotals();
      }
    );
  };
  addTotals = () => {
    let subTotal = 0;
    this.state.cart.map(item => (subTotal += item.total));
    const tempTax = subTotal * 0.1;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax;
    this.setState(() => {
      return {
        cartSubTotal: subTotal,
        cartTax: tax,
        cartTotal: total
      };
    });
  };
  render() {
    //returning the productcontext's provider
    // const {products, details} = this.state
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          openModel: this.openModel,
          closeModel: this.closeModel,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
