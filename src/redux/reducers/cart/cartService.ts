import axios from "axios";
import { CartItem } from "./cartSlice";
import { base_url } from "../../../static/staticData";
import { getAuthHeader } from "../../../common/methods";

// const getAuthHeader = () => {
//     const token: string | null = localStorage.getItem("tokenData");
//     // const user = JSON.parse(localStorage.getItem("user"));
//     const user = token ? JSON.parse(token) : null;
//     if (user!=null) {
//         // console.log("token header",user)
//         return {
//             Authorization: `Bearer ${user}`,
//             'Content-Type': 'application/json',
//         };
//     } else {
//         return {
//             'Content-Type': 'application/json',
//         };
//     }
//   };

const addToCart = async (product: CartItem[]) => {
    try {
        
        const parsedUserId: string | null = localStorage.getItem("userId");
        const userId = parsedUserId ? JSON.parse(parsedUserId) : null; 
        const length = product.length;
        const productId = product.length > 0 ? product[length-1].id : null;
        const res = await axios.post(`${base_url}/cart/add?userId=${userId}&&productId=${productId}`,null,{
            headers:getAuthHeader(),
        });
        return res.data;
    } catch (error) {
        console.error("Error adding product to cart:", error);
        throw error;
    }
};
const fetchFromCart = async () => {
    try {
        if(localStorage.getItem("userId")){
            const parsedUserId: string | null = localStorage.getItem("userId");
        const userId = parsedUserId ? JSON.parse(parsedUserId) : null; 
        const res = await axios.get(`${base_url}/cart/get?userId=${userId}`,{
            headers:getAuthHeader(),
        });
        return res.data;
        }else{
            return [];
        }
    } catch (error) {
        console.error("Error getting product from cart:", error);
    }
};

const removeFromCart = async (product: CartItem[]) => {
    try {
        const parsedUserId: string | null = localStorage.getItem("userId");
        const userId = parsedUserId ? JSON.parse(parsedUserId) : null; 
        // console.log(userId,product);
        const res = await axios.delete(`${base_url}/cart/remove?userId=${userId}&&productId=${product}`, { headers:getAuthHeader(), });
        return res.data;
    } catch (error) {
        console.error("Error removing product from cart:", error);
        throw error;
    }
};

const clearCart = async () => {
    try {
        const parsedUserId: string | null = localStorage.getItem("userId");
        const userId = parsedUserId ? JSON.parse(parsedUserId) : null; 
        const res = await axios.delete(`${base_url}/cart/clear/${userId}`, { headers:getAuthHeader(), });
        return res.data;
    } catch (error) {
        console.error("Error clearing cart:", error);
        throw error;
    }
};

const decreaseCart = async (productId: string) => {
    try {
        const res = await axios.put(`${base_url}/cart/decrease/${productId}`,null,{headers:getAuthHeader(),});
        return res.data;
    } catch (error) {
        console.error("Error decreasing cart:", error);
        throw error;
    }
};

const inreaseCart = async (productId: string) => {
    try {
        // console.log("increased")
        const res = await axios.put(`${base_url}/cart/increase/${productId}`, null,{ headers:getAuthHeader(), });
        return res.data;
    } catch (error) {
        console.error("Error increasing cart:", error);
        throw error;
    }
};


const cartService = {
    addToCart,
    removeFromCart,
    clearCart,
    fetchFromCart,
    decreaseCart,
    inreaseCart
};

export default cartService;
