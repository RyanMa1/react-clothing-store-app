import React, { Component } from 'react';
import Title from './Title.js';
import Product from './Product.js';
import {ProductConsumer} from '../context.js'
class ProductList extends Component {
    
    render() {
        return (

            <React.Fragment>
                <div className = "py-5">
                    <div className = "container">
                        <Title name = "our" title = "products"></Title>
                        <div className = "row">
                            {/* Using context right here */}
                            <ProductConsumer>
                                {(value) => {
                                    return(
                                        value.products.map( products => {
                                            return <Product key = {products.id} products = {products}></Product>
                                        }
                                    ))
                                } }
                            </ProductConsumer>
                        </div>
                        
                    </div>
                </div>

            </React.Fragment>
            
        );
    }
}

export default ProductList;