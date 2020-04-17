import React,{ useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom';
import Header from '../components/Header';
import Api from '../services/api';
import {addProductBox} from '../components/ControllBox';
import {getToken} from '../components/Authenticate';

import icon_arrow_right from '../assets/icon-arrow-right.svg';
import '../styles/Main.css';

export default function Home(){
    const [openFilterMenu, setOpenFilterMenu] = useState('')
    const [data, setData] = useState([]);
    const [message, setMessage] = useState("Carregando dados!");
    const History = useHistory();

    useEffect(() => {
        try {
            async function  getProduct (){
                const reqData = await Api.get('/shopping/product/');
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
    }, [])

    const checkAuthentication = () => {
        const checkAuth = getToken();
        if(checkAuth === null)
        History.push('/signin');
    }

    function openFilter(){
        if(openFilterMenu === '')
        {
            setOpenFilterMenu('open-filter-fields')
        }
        else{
            setOpenFilterMenu('')
        }
    }
    return(
        <>
        <Header/>
        <div id="controlApp">
            <section className="title-filter-pages">
                <div className="title-pages">
                    Tudo para você, linda e maravilhosa!
                </div>
                <button className="btn-filter" onClick={openFilter}>
                    <img src={icon_arrow_right} alt=""/>
                    <div>Filtro</div>
                </button>
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
                                        History.push(`/product/${product.id}/information/`)
                                    }}>
                                        + informação
                                    </div>
                                    <div className="content-price">
                                        <div id="price-real">5</div>
                                        <div id="price-cents">,00</div>
                                    </div>
                                    <button className="content-btn" onClick={() => {
                                        checkAuthentication()
                                    }}>Adicionar a caixa</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className={`filter-fields ${openFilterMenu}`}>
                    <div className="filter-fields-content">
                        <h3>Selecione o tipo de filtro</h3>
                    </div>
                </div>
            </section>
        </div>
        </>
    )
}