import React, {useState, useEffect} from 'react';
import Api from '../services/api';
import HeaderApi from '../services/header';

export default function insertBox(product){
    const [msg, setMsg] = useState(null);
    
    useEffect(() => {
        const separatorElementsToBox = ({id, price, ...rest}) => {
            const date = new Date();
            const today = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`
        
            return {
                product: id,
                box_add_at: today,
                number_of_product: 1,
                price_all_product: price
            }
        }

        async function getData(){
            try {
                const data = separatorElementsToBox(product)
                const responseBox = await Api.post("/box/add/", data, HeaderApi);
                const {success, message: messageResponse} = responseBox.data
                if(success)
                setMsg(messageResponse);
            } catch (error) {
                setMsg(error.response.data.message);
            }
        }
        getData()
    }, [])
    
    return msg
}