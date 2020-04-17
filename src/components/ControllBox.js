export function addProductBox({product, person}){
    const currentBox = readProducts();
    const join_data = Object.assign(currentBox, {
        box_product: product,
        box_person: person
    })
    localStorage.setItem("box", join_data)
}

export function readProducts(){
    const box = localStorage.getItem("box");
    return box;
}