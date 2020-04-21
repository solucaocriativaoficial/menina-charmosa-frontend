import {useState} from 'react';
import Api from '../services/api';
import HeaderApi from '../services/header';

export default async function readBox(){
    const [data, setData] = useState([]);
    try {
        const responseBox = await Api.get("/box", HeaderApi);
        const {success, content, message} = responseBox.data
        if(success)
        setData(content);

        else
        setData(message);
    } catch (error) {
        setData(error.response.data.message);
    }

    return data
}