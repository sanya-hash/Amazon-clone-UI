import axios from "axios"
import { base_url } from "../../../static/staticData";
import { CartItem } from "../cart/cartSlice";
import { getAuthHeader } from "../../../common/methods";


const getOrders = async () => {
    const parsedUserId: string | null = localStorage.getItem("userId");
        const userId = parsedUserId ? JSON.parse(parsedUserId) : null; 
    const res = await axios.get(`${base_url}/order/get/${userId}`,{headers:getAuthHeader()});
    // console.log(res.data);
    return res.data
}
const orders = async (id: string) => {
    const res = await axios.get(`${base_url}/product/orders/${id}`,{headers:getAuthHeader()})
    return res.data
}
const updateStatus = async (id: string, Status: string, index: number) => {
    const res = await axios.put(`${base_url}/users/updateorder/${id}`, { Status, index }, { headers:getAuthHeader() })
    return res.data
}
const createOrder = async (cartItems: CartItem[], cartTotalAmount: number, address: any) => {
    const Order = {
        shippingInfo: {
            name: address.name,
            mobile: address.mobile,
            address: address.address,
            state: address.state,
            pincode: address.zipcode
        },
        // paymentInfo: {
        //     razorPayOrderId: orderId,
        //     razorPayPaymentId: paymentId
        // },
        orderItemsDto: cartItems.map((cartItem) => ({
            product: cartItem.id,
            quantity: cartItem.cartQuantity,
            color: cartItem.color[0]?.title,
            orderStatus: "order placed"
        })),
        totalPrice: cartTotalAmount
    }
    // console.log("order",Order);
    const parsedUserId: string | null = localStorage.getItem("userId");
        const userId = parsedUserId ? JSON.parse(parsedUserId) : null; 

    const res = await axios.post(`${base_url}/order/create/${userId}`, Order, { headers: getAuthHeader() });
    return res.data
}


const orderService = {
    createOrder,
    getOrders,
    orders,
    updateStatus
}
export default orderService