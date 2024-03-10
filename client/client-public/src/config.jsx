import axios from "axios";

let server = "https://server-challenge01.ylliw.lol/pub"

const instace = axios.create({
    baseURL : server,
})

export default instace