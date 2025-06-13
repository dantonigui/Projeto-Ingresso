import axios from 'axios'

const API = "http://localhost:5000/api/"

export const login = async (email,password) =>{
    const response  = await axios.post(`${API}auth/login`, {email, password})
    return response.data
}

export const register = async (name,email, password, phone, adress) =>{
    const response  = await axios.post(`${API}auth/register`, {name, email, password, phone, adress})
    return response.data
}

export const loginAdmin = async (email,password) =>{
    const response  = await axios.post(`${API}admin/login`, {email, password})
    return response.data
}

export const registerAdmin = async (name,email, password) =>{
    const response  = await axios.post(`${API}admin/register`, {name, email, password})
    return response.data
}