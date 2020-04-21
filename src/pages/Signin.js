import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import Header from '../components/Header'
import Api from '../services/api';
import { Form } from '@unform/web';
import Input from '../components/forms/Input';
import {addToken} from '../components/Authenticate';
import '../styles/Main.css';

export default function Login(){
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [tokenConfigure, setTokenConfigure] = useState(false);
    const History = useHistory();

    const checkSignin = async (data) => {
        try {
            const authenticate = await Api.post("/signin", data);
            const {success, content, message: messageResponse} = authenticate.data;
            if(success)
            {
                addToken(content)
                setTokenConfigure(true)
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
            History.goBack();
        }
    }
    return(
        <>
        <Header/>
        <div className="auth">
            <h1>Faça seu login</h1>
            <Form onSubmit={handleSubmit}>
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
        </div>
        </>
    )
}