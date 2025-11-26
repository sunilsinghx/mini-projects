import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY
const BASE_URL = import.meta.env.VITE_BASE_URL



export const fetchWeather = async(city : string)=>
{
    const res = await axios.get(`${BASE_URL}/weather`,{
        params:{
            q:city,appid:API_KEY,units:'metric'
        }
    })
    return res.data;
}

export const fetchForcast = async(city:string)=>{
    const res = await axios.get(`${BASE_URL}/forecast`,{
        params:{
            q:city,
            appid:API_KEY,
            units:'metric'
        }
    })
    return res.data;
}