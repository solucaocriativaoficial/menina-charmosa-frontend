import React, {useState} from 'react';
import Api from '../../services/api';
import { Form } from '@unform/web';
import Input from '../forms/Input';
import {addToken} from '../Authenticate';
import '../../styles/Main.css';
import imageclose from '../../assets/icon-close.svg';

export default function SignIn({onCloseModalSignIn = () => {}}){
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [register, setRegister] = useState(false);

    const checkSignin = async (data) => {
        try {
            const url = register ? "/registration" : "/signin";
            const authenticate = await Api.post(url, data);
            const {success, content, message: messageResponse} = authenticate.data;
            if(success)
            {
                addToken(content)
            }

            else
            setMessage(messageResponse)
        } catch (error) {
            setMessage(error.response.data.content)
        }
    }

    const handleSubmit = async (data) => {
        if(data.mail.indexOf("@") < 1)
        setMessage("E-mail informado é inválido! Veja o formato dele!")

        else{
            setLoading(true);
            await checkSignin(data);
            onCloseModalSignIn();
            window.location.reload()
        }
    }
    return(
        <div className="modal-information-auth">
            <section className="content-modal auth">
                <button className="btn-close-modal" onClick={() => onCloseModalSignIn()}>
                    <img src={imageclose} alt="Botão de fechar"/>
                </button>
                <h1>Faça seu {register ? "Cadastro" : "login"}</h1>
                <Form onSubmit={handleSubmit}>
                    {
                        !register ? null :
                        <div className="auth-field">
                            <label htmlFor="person_name">
                                Nome completo
                            </label>
                            <Input type="text" name="person_name" id="person_name" maxLength="200"/>
                        </div>
                    }
                    <div className="auth-field">
                        <label htmlFor="mail">
                            E-mail
                        </label>
                        <Input type="text" name="mail" id="mail" maxLength="200"/>
                    </div>
                    <div className="auth-field">
                        <label htmlFor="mail">
                            Password
                        </label>
                        <Input type="password" name="password" id="password"/>
                    </div>
                    <div>{message}</div>
                    <button type="submit">{loading ? "Carregando!" : "Entrar"}</button>
                </Form>
                <button onClick={() => {
                    setRegister(true)
                }}>{register ? "Tenho uma conta" : "Cadastrar-se"}</button>
            </section>
        </div>
    )
}