import axios from "axios";
import { base_url } from "../../../static/staticData";
import { Address, UserState } from "./userSlice";
import { json } from "react-router-dom";



const register = async (userData: UserState): Promise<any> => {
    const res = await axios.post(`${base_url}/users/register`, userData)
    return res.data
}

const login = async (userData: UserState): Promise<any> => {
    // console.log("userData",userData)
    const res = await axios.post(`${base_url}/users/login`, userData )
    if (res.data) {
        localStorage.setItem("token", JSON.stringify(res.data?.user))
        localStorage.setItem("userId",JSON.stringify(res.data?.user.id));
        localStorage.setItem("tokenData",JSON.stringify(res.data?.user.refreshToken));
        // console.log("tokenId",localStorage.getItem("tokenData"))
        return res.data
    }
}

const logout = async (): Promise<any> => {
    const res = await axios.get(`${base_url}/users/logout`)
    if (res.data) {
        console.log("loggedout") 
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("tokenData");
        localStorage.removeItem('wishlist');
    }
    return res.data
}


const forgot = async (email: string) => {
    const res = await axios.post(`${base_url}/users/forgot-password-token`, { email })
    return res.data
}

const saveUserAddress = async (address: Address) => {
    // console.log(address);
    const res = await axios.post(`${base_url}/address/save`, address)
    return res.data
}

const reset = async (token: string, password: string) => {
    // console.log(JSON.parse(password));
    const res = await axios.put(`${base_url}/users/resetpassword/${token}`, { password })
    return res.data
}
const sendotp = async (mobile: string) => {
    const res = await axios.post(`${base_url}/users/req-otp`, { mobile })
    return res.data
}
const verifyOtp = async (mobile: string, otp: string[]) => {
    const res = await axios.post(`${base_url}/users/verify-otp`, { mobile, otp })
    if (res.data) {
        localStorage.setItem("token", JSON.stringify(res.data?.user))
        return res.data
    }
}
const userService = {
    login,
    logout,
    register,
    forgot,
    reset,
    sendotp,
    verifyOtp,
    saveUserAddress
}

export default userService