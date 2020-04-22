export function addToken(token){
    localStorage.setItem("@token", token)
}

export function getToken(){
    const getToken = localStorage.getItem("@token");
    return getToken;
}

export function removeToken(){
    localStorage.removeItem("@token");
}