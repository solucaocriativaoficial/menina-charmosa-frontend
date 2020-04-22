import React,{ useEffect, useState } from 'react';
import {useHistory, useParams} from 'react-router-dom';
import Header from '../components/Header';
import Api from '../services/api';
import {getToken} from '../components/Authenticate';
import Footer from '../components/Footer';
import InformationProduct from '../components/Modals/InformationProduct';
import '../styles/Main.css';

export default function Home(){
    const [data, setData] = useState([]);
    const [message, setMessage] = useState("Carregando dados!");
    const History = useHistory();
    const {search = ''} = useParams();
    const [openModal, setOpenModal] = useState(false);
    const [dataModalProduct, setDataModalProduct] = useState(null);

    useEffect(() => {
        try {
            async function  getProduct (){
                let filter = search === '' ? '' : `?search=${search}`;
                const reqData = await Api.get(`/shopping/product/${filter}`);
                const {success, content, message} = reqData.data;
                if(success)
                setData(content)
    
                else
                setMessage(message)
            }
            getProduct();   
        } catch (error) {
            setMessage(error.response.data.message)
        }
    }, [search])

    const addProductBox = (product) => {
        if(getToken() === null)
        History.push('/signin');

        else
        History.push(`/box/${product.id}/${product.price}`)
    }

    const openModalBox = (product) => {
        setDataModalProduct(product);
        setOpenModal(true);
    }
    return(
        <>
        <Header/>
        <div id="controlApp">
            <section className="title-filter-pages">
                <div className="title-pages">
                    Tudo para você, linda e maravilhosa!
                </div>
            </section>
            <section className="boxContent">
                <div className="control-content">
                    {
                        !data.length ? message :
                        data.map((product, index) => (
                            <div className="content" key={product.id}>
                                <div className="content-image">
                                    <img src={product.image} alt=""/>
                                </div>
                                <div className="content-describe">
                                    <div className="content-title">
                                        {product.product_name}
                                    </div>
                                    <div className="content-more-information" onClick={() => {
                                        openModalBox(product)
                                    }}>
                                        + informação
                                    </div>
                                    <div className="content-price">
                                        <div id="price-real">5</div>
                                        <div id="price-cents">,00</div>
                                    </div>
                                    <button className="content-btn" onClick={() => {
                                        addProductBox(product);
                                    }}>Adicionar a caixa</button>
                                </div>
                            </div>
                        ))
                    }
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