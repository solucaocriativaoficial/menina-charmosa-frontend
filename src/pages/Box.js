import React,{ useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom';
import Header from '../components/Header';
import Api from '../services/api';
import HeaderApi from '../services/header';
import '../styles/Main.css';
import InformationProduct from '../components/Modals/InformationProduct';
import Footer from '../components/Footer';
import {getToken} from '../components/Authenticate';

export default function Box(){
    const [data, setData] = useState([]);
    const [priceFinal, setPriceFinal] = useState(0);
    const [message, setMessage] = useState("Carregando dados!");
    const [removeItemBox, setRemoveItemBox] = useState(null);
    const [loadingPage, setLoadingPage] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [dataModalProduct, setDataModalProduct] = useState(null);
    const [purchase, setPurchase] = useState(false);
    const History = useHistory();

    useEffect(() => {
        const priceAll = (content) => {
            let sum = 0;
            for (const iterator of content) {
                sum = sum + iterator.price_all_product
            }
            setPriceFinal(sum);
        }
        async function  getBox (){
            try {
                const reqData = await Api.get('/box', HeaderApi);
                const {success, content, message} = reqData.data;
                if(success)
                {
                    setData(content)
                    priceAll(content)
                }
    
                else
                setMessage(message)

                setLoadingPage(false)
            } catch (error) {
                setMessage(error.response.data.message)
            }
        }
        if(getToken() !== null)
        getBox();
    }, [loadingPage])

    useEffect(() => {
        async function removeItem (){
            try {
                const removeItem = await Api.delete(`/box/${removeItemBox}`, HeaderApi);
                const {success, message: messageRemoveItem} = removeItem.data;
                if(success)
                setLoadingPage(true)

                console.log(messageRemoveItem)
            } catch (error) {
                console.log(error.response.data.message);
            }
        }

        if(removeItemBox !== null)
        removeItem();
    }, [removeItemBox])

    useEffect(() => {
        async function purchase_add(){
            try {
                const date = new Date();
                const purchase_date = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`;
                const payment = await Api.put("/box", {
                    purchase_date: purchase_date,
                    purchase: "yes"
                }, HeaderApi)
                
                const {success, message} = payment.data;
                if(success)
                alert(message)

            } catch (error) {
                console.log(error.response.data.message)
            }
        }

        if(purchase)
        purchase_add();
    }, [purchase])

    const openModalBox = (product) => {
        const {product: product_id, price_all_product, id, ...rest} = product;
        const join_data = Object.assign({
            id: product_id,
            price: price_all_product,
        }, rest)
        console.log(join_data)
        setDataModalProduct(join_data);
        setOpenModal(true);
    }
    return(
        <>
        <Header title="Sua caixinha"/>
        <div id="controlApp">
            <section className="title-filter-pages">
                <div className="title-pages">
                    Sua caixinha esta com estes produtos
                </div>
                <button className="btn-filter" onClick={() => {
                    History.goBack()
                }}>
                    Voltar
                </button>
            </section>
            <section className="boxContent box-container">
                <div className="control-content">
                    {
                        !data.length ? message :
                        data.map((box, index) => (
                            <div className="content" key={box.id}>
                                <div className="content-image">
                                    <img src={box.image} alt=""/>
                                </div>
                                <div className="content-describe">
                                    <div className="content-title">
                                        {box.product_name}
                                    </div>
                                    <div className="content-more-information" onClick={() => {
                                        openModalBox(box)
                                    }}>
                                        + informação
                                    </div>
                                    <div className="content-price">
                                        <div id="price-real">{box.price_all_product}</div>
                                        {/* <div id="price-cents">,00</div> */}
                                    </div>
                                    <button className="content-btn" onClick={() => {
                                        setRemoveItemBox(box.id);
                                    }}>Remover da caixa</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="total_price_account">
                    <div>
                        <span>Total</span>
                        <span>
                            R$
                            <span id="price_all">{priceFinal}</span>
                        </span>
                    </div>
                    <button onClick={() => {
                        setPurchase(true);
                    }}>Fechar caixinha e comprar</button>
                </div>
            </section>
        </div>
        {
            !openModal ? null : 
            <InformationProduct onCloseModal={() => setOpenModal(false)} product={dataModalProduct}/>
        }
        <Footer/>
        </>
    )
}