import React, { Component } from 'react';
import {ProductConsumer} from '../context.js'
import {Link} from "react-router-dom"
import {ButtonContainer} from "./Button.js"
class Details extends Component {
    render() {
        return (
            <ProductConsumer>
                {/* value parameter gives us all information from context */}
                {value => {
                    const {id, company, img, info,price, title, inCart } = value.detailProduct;
                    return(
                        <div className ='container py-5' >
                            {/* title */}
                            <div className = 'row'>
                                <div className = 'col-10 mx-auto text-center text-slanted text-blue my-5'>
                                    {title}
                                </div>
                            </div>
                            {/* end of title */}
                        {/* product info */}
                            <div className = 'row'>
                                <div className = 'col-10 mx-auto cold-md-6 my-3'>
                                    <img src={img} className = 'img-fluid' alt = "product"></img>
                                </div>
                                {/* product text */}
                                <div className = 'col-10 mx-auto cold-md-6 my-3 text-capitalize'>
                                    <h1>model:{title} </h1>
                                    {/* mt, mb = margin top, margin bottom */}
                                    <h3 className = 'text-title text-upercase text-muted mt-3 mb-2'>made by: <span className= 'text-uppercase'>
                                        {company}</span></h3 >
                                    <h4 className = "text-blue">
                                        <strong>
                                            price : <span>${price}</span>
                                        </strong>
                                    </h4>
                                    <p className= "text-capitalize font-weight-bold mt-3 mb-0">some info about product: </p>
                                    <p className = "text-muted lead">
                                        {info}
                                    </p>
                                    {/* buttons */}
                                    <div>
                                        <Link to = '/'>
                                            <ButtonContainer>
                                                back to products
                                            </ButtonContainer>
                                        </Link>
                                        <ButtonContainer cart disabled = {inCart ? true : false} onClick = {() => {
                                            value.addToCart(id);
                                            value.openModel(id);
                                        }}>
                                            {inCart ? 'In Cart' : "add to cart"}
                                        </ButtonContainer>
                                    </div>
                                </div>

                            </div>

                        </div>
                    )
                }}

            </ProductConsumer>
        );
    }
}

export default Details;