import axios from "axios";

let server = "https://server-challenge01.ylliw.lol"

const instace = axios.create({
    baseURL : server,
})

export default instace