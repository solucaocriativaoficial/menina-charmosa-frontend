import React, {useState, useEffect} from 'react';
import icon_close from '../../assets/icon-close.svg';
export default function InformationProduct({product}){
    const [closeModal, setCloseModal] = useState(false);

    if(product === null)
    return(<></>)

    const {id, product_name, price, describe, image} = product;
    return(
        <div className="modal-information-product">
            <div className="content-modal">
                <section className="box-information-product">
                    <div className="product-image">
                        <img src={image} alt=""/>
                    </div>
                    <div className="describe-product">
                        <div>{product_name}</div>
                        <div>{describe}</div>
                    </div>
                    <div className="price-product">
                        {price}
                    </div>
                </section>
                <section className="box-comment-information-product">

                </section>
                <button className="close-box-information-product" onClick={setCloseModal(true)}>
                    <img src={icon_close} alt="x"/>
                </button>
            </div>
        </div>
    )
}