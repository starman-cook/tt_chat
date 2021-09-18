import {apiURL} from "./apiURL"

const { default: axios } = require("axios")

const axiosApi = axios.create({
    baseURL: apiURL
})

export default axiosApi
