const header = {
    headers: {
        auth: localStorage.getItem("@token")
    }
}

export default header;