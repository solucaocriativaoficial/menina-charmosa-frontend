import React,{ useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom';
import Api from '../../services/api';
import HeaderApi from '../../services/header';
import {getToken} from '../Authenticate';
import {Form} from '@unform/web';
import Input from '../forms/Input';
import imageclose from '../../assets/icon-close.svg';

import '../../styles/Main.css';

export default function InformationProduct({onCloseModal = () => {}, product}){
    const [comment, setComment] = useState([]);
    const [messageComments, setMessageComments] = useState("Carregando comentários!");
    const [newComment, setNewComment] = useState(false);
    const History = useHistory();

    useEffect(() => {
        async function getComments(){
            try {
                const getContent = await Api.get(`/shoppint/product/${product.id}/comment/`);
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
    }, [newComment, product])

    const date = () => {
        const instanceDate = new Date();
        return `${instanceDate.getFullYear()}/${instanceDate.getMonth()}/${instanceDate.getDate()}`;
    }

    const handleSubmitComment = async (data) => {
        if(getToken() === null)
        History.push('/signin')

        try {
            const join_data = Object.assign(data, {
                product: product.id,
                comment_date: date()
            })
            const insertComment = await Api.post('/comment/add', join_data, HeaderApi);
            const {success} = insertComment.data;
            if(success)
            setNewComment(true)
        } catch (error) {
            console.log(error.response.data.message);
        }
    }

    const addProductBox = (product) => {
        if(getToken() === null)
        History.push('/signin');

        else
        History.push(`/box/${product.id}/${product.price}`)
    }

    // console.log(messageInformation)
    return(
        <>
        <div className="modal-information-product">
            <section className="content-modal modal-product">
                <button className="close-box-information-product" onClick={() => onCloseModal()}>
                    <img src={imageclose} alt="Botão de fechar"/>
                </button>
                <div className="content">
                    <div className="content-image">
                        <img src={product.image} alt=""/>
                    </div>
                    <div className="content-describe">
                        <div className="content-title">
                            {product.product_name}
                        </div>
                        <div className="content-more-information">
                            {product.info || "Nenhuma informação cadastrada"}
                        </div>
                        <div className="content-price-btnPurchase">
                            <div className="content-price">
                                <div id="price-real">{product.price}</div>
                                <div id="price-cents">,00</div>
                            </div>
                            <button className="content-btn" onClick={() => addProductBox(product)}>Adicionar a caixa</button>
                        </div>
                    </div>
                </div>
                <div className="comments">
                    <h2>Comentários sobre esse produto</h2>
                    <Form onSubmit={handleSubmitComment}>
                        <div className="add-comment">
                            <Input type="text" name="comment" required placeholder="Escreva seu comentário aqui!"/>
                            <button type="submit">Salvar comentário</button>
                        </div>
                    </Form>
                    {
                        !comment.length ? messageComments :
                        comment.map((comment_complete, index) => (
                            <div className="comment" key={index}>
                                <div className="comment_person">{comment_complete.person_name}</div>
                                <div>{comment_complete.comment}</div>
                                <div>{comment_complete.comment_date}</div>
                            </div>
                        ))   
                    }
                </div>
            </section>
        </div>
        </>
    )
}