import React,{ useEffect, useState } from 'react';
import {useHistory, useParams} from 'react-router-dom';
import Header from '../components/Header';
import Api from '../services/api';

import '../styles/Main.css';

export default function InformationProduct(){
    const [dataInformation, setInformation] = useState([]);
    const [comment, setComment] = useState([]);
    const [messageInformation, setMessageInformation] = useState("Carregando dados");
    const [messageComments, setMessageComments] = useState("Carregando comentários!");
    const {id: product_id} = useParams();
    const History = useHistory();

    useEffect(() => {
        async function getInformation(){
            try {
                const getContent = await Api.get(`/shopping/product/${product_id}/`);
                const {success,content, message} = getContent.data;
                if(success)
                setInformation(content)


                else
                setMessageInformation(message)
            } catch (error) {
                setMessageInformation(error.response.data.message)
            }
        }
        getInformation();
    }, [product_id])

    useEffect(() => {
        async function getComments(){
            try {
                const getContent = await Api.get(`/shoppint/product/${product_id}/comment/`);
                const {success,content, message} = getContent.data;
                if(success)
                setComment(content)

                else
                setMessageComments(message)
            } catch (error) {
                setMessageComments(error.response.data.message)
            }
        }
        getComments();
    }, [product_id])
    return(
        <>
        <Header/>
        <div id="controlApp">
            <section className="title-filter-pages">
                <div className="title-pages">
                    Informações sobre produto
                </div>
                <button className="btn-filter" onClick={() => {
                    History.goBack()
                }}>
                    Voltar
                </button>
            </section>
            <section className="boxInformationProduct">
                <div className="content">
                    <div className="content-image">
                        <img src={dataInformation.image} alt=""/>
                    </div>
                    <div className="content-describe">
                        <div className="content-title">
                            {dataInformation.product_name}
                        </div>
                        <div className="content-more-information">
                            {dataInformation.describe}
                        </div>
                        <div className="content-price">
                            <div id="price-real">{dataInformation.price}</div>
                            <div id="price-cents">,00</div>
                        </div>
                        <button className="content-btn">Adicionar a caixa</button>
                    </div>
                </div>
                <div className="comments">
                    <h2>Comentários sobre esse produto</h2>
                    {
                        !comment.length ? messageComments :
                        comment.map((comment_complete, index) => (
                            <div className="comment" key={index}>
                                <div className="comment_person">{comment_complete.person_name}</div>
                                <div>{comment_complete.comment}</div>
                            </div>
                        ))   
                    }
                </div>
            </section>
        </div>
        </>
    )
}