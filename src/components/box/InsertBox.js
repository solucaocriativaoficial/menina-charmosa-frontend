import React, {useState, useEffect} from 'react';

export default function insertBox(product){
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
    console.log(product)
    return "bruno"
}