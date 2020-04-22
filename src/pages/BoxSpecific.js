import React, {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import Header from '../components/Header';
import Api from '../services/api';
import HeaderApi from '../services/header';
import Footer from '../components/Footer';

export default function Box(){
    const [msg, setMsg] = useState("Adicionando ao carrinho");
    const History = useHistory();
    const parametrs = useParams();

    useEffect(() => {        
        const separatorElementsToBox = (product, price) => {
            const date = new Date();
            const today = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`
        
            return {
                product: product,
                box_add_at: today,
                number_of_product: 1,
                price_all_product: price
            }
        }

        async function create(){
            try {
                const data = separatorElementsToBox(parametrs.product, parametrs.price);
                const responseBox = await Api.post("/box/add/", data, HeaderApi);
                const {success, message: messageResponse} = responseBox.data
                if(success)
                setMsg(messageResponse);

            } catch (error) {
                setMsg(error.response.data.message)           
            }
        }
        create()
    }, [parametrs])

    return(
        <>
        <Header/>
        <div id="controlApp">
            <section className="title-filter-pages">
                <div className="title-pages">
                    Sua caixinha
                </div>
                <button className="btn-filter" onClick={() => {
                    History.goBack()
                }}>
                    Voltar
                </button>
            </section>
            <section className="boxContent">
                <h1 className="contentMsg">
                    {msg}
                </h1>
            </section>
        </div>
        <Footer/>
        </>
    )
}