import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Header from '../components/Header'
import Api from '../services/api';
import '../styles/Main.css';

export default function Login(){
    const [mail, setMail] = useState(null);
    const [password, setPassword] = useState(null);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        function getData(){

        }
    })
    return(
        <>
        <Header/>
        <div className="auth">
            <h1>Faça seu login</h1>
            <form method="post">
                <div className="auth-field">
                    <label htmlFor="mail">
                        E-mail
                    </label>
                    <input type="text" name="mail" id="mail" maxLength="200"/>
                </div>
                <div className="auth-field">
                    <label htmlFor="mail">
                        Password
                    </label>
                    <input type="password" name="password" id="password"/>
                </div>
                <button>Entrar</button>
            </form>
        </div>
        </>
    )
}