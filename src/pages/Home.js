import React from 'react';
import {Link} from 'react-router-dom';
import Header from '../components/Header'

import '../styles/Main.css';

export default function Home(){
    return(
        <>
        <Header/>
        <h1>Estou na pagina inicial</h1>
        </>
    )
}