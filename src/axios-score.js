import axios from "axios";

const instance = axios.create({
    baseURL: "https://match-the-cards-51587.firebaseio.com/",
})

export default instance;