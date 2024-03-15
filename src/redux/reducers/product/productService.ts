import axios from "axios";
import { Filters, base_url } from "../../../static/staticData";
// import api from "../../api";


const getProducts = async (data: Filters) => {
    const params = new URLSearchParams();

    for (const key of Object.keys(data)) {
        const value = data[key as keyof Filters];

        if (value !== null && value !== undefined) {
            if (Array.isArray(value)) {
                if (value.length > 0) {
                    // params.append(key, value.map(v => v.toString()).join('|'));
                    params.append(key, value.join(','));
                }
            } else if (value !== '' && value !== 0) {
                if (key === 'minPrice') {
                    params.append(`price[gte]`, String(value))
                } else if (key === 'maxPrice') {
                    params.append(`price[lte]`, String(value))

                } else {
                    params.append(key, String(value));
                }
            }
        }
    }
    const res = await axios.get(`${base_url}/product?${params.toString()} `)
    // console.log(`${base_url}/product?${params.toString()} `);
    return res.data
}
const getProduct = async (id: string) => {
    const res = await axios.get(`${base_url}/product/${id}`)
    // console.log("res",res.data);
    return res.data
}
const Wishlist = async (prodId: string) => {
    const userIdData: string | null = localStorage.getItem("userId");
    const userId = userIdData ? JSON.parse(userIdData) : null; 
    const res = await axios.post(`${base_url}/users/wishlist`, { prodId,userId }, { withCredentials: true })
    return res.data
}

//delete wishlist
const removeWishlist = async (prodId: string) => {
    const userIdData: string | null = localStorage.getItem("userId");
    const userId = userIdData ? JSON.parse(userIdData) : null; 
    const res = await axios.put(`${base_url}/users/wishlist/remove`,{prodId,userId}, { withCredentials: true })
    window.location.reload();
    return res.data
}


const GetWishlist = async () => {
    const parsedUserId: string | null = localStorage.getItem("userId");
    const  userId= parsedUserId ? JSON.parse(parsedUserId) : null; 
    const res = await axios.get(`${base_url}/users/wishlist/${userId}`, { withCredentials: true })
    // console.log("productservice get",res);
    return res.data
}

const review = async ({ star, prodId, comment, title }: { star: string, prodId: string, comment?: string, title: string }) => {
    const res = await axios.post(`${base_url}/product/rating`, { star, prodId, comment, title }, { withCredentials: true })
    return res.data
}
const deletereview = async (id: string) => {
    const res = await axios.delete(`${base_url}/product/rating/${id}`, { withCredentials: true })
    return res.data
}
const productService = {
    getProducts,
    getProduct,
    Wishlist,
    GetWishlist,
    review,
    deletereview,
    removeWishlist
}

export default productService