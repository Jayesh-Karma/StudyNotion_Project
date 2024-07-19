import toast from "react-hot-toast";
import {studentApi} from "../apis.js"
import { apiConnector } from "../apiConnector";
import { setPaymentLoading } from "../../Reducers/Slices/courseSlice.jsx";
import { resetCart } from "../../Reducers/Slices/cartSlice.js";
import logo from "../../assets/Logo/Logo-Small-Dark.png"
// require("dotenv").config();


function scripLoad(src){
    return new Promise((resolve) =>{
        const script = document.createElement("script");
        script.src = src;
        script.onload = () =>{
            resolve(true);
        }
        script.onerror = () =>{
            resolve(false);
        }
        document.body.appendChild(script);
    })
}


export async function buycourse (token, courses,userDetails, navigate, dispatch){
    const toastId = toast.loading("Loading....")
    try{
        // load script
        const res = await scripLoad("https://checkout.razorpay.com/v1/checkout.js");
        console.log(res)
        if(!res){
            toast.error("Payment Failed");
            return;
        }

        // calll capture payment
        const orderResponce = await apiConnector("POST", studentApi.COURSE_PAYMENT_API, 
            {courses},
            {
                Authorization: `Bearer ${token}`
            })
            console.log(orderResponce)

            if(!orderResponce.data.success){
                throw new Error(orderResponce.data.message);
            }
            
            
            console.log(orderResponce.data.success)
            console.log(orderResponce.data.message)

        // create options
        const options = {
            "key": "rzp_test_uLRXiidI4bsROR", // Enter the Key ID generated from the Dashboard
            "amount":`${ orderResponce.data.message.amount} Rs`, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency":  orderResponce.data.message.currency,
            "name": "Study Junction", //your business name
            "description": "Course Payment",
            "image": logo,
            "order_id":  orderResponce.data.message.id,
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": `${userDetails.firstname}`, 
                "email": userDetails.email,
            },
            "notes": {
                "address": "Sangam Nagar, Indore"
            },
            "theme": {
                "color": "#3399cc"
            },
            handler: function(responce){
                console.log("Responce of payment", responce)
                sendPaymentEmail(responce, orderResponce.data.message.amount, token)
                verifyPayment({...responce, courses}, token, navigate, dispatch)
            }
        }

        const razorpay = new window.Razorpay(options);
        razorpay.open();
        razorpay.on("payment failed",(responce) => {
            toast.error("Payment Failed try again later")
            console.log(responce.error  )
        })

    }
    catch(error){
        toast.error(error.response.data.message)
        console.log(error)
    }
    toast.dismiss(toastId);
}




async function sendPaymentEmail(responce, amount, token ){
    try{
        console.log("Sending mail")
        const res = await apiConnector("POST", studentApi.PAYMENT_MAIL_API, {
            orderId: responce.razorpay_order_id,
            paymentId: responce.razorpay_payment_id,
            amount:amount
        },{
            Authorization: `Bearer ${token}`
        })
        console.log(res)    
    }
    catch(error){
        console.log("Payment email error", error)
    }
}

async function verifyPayment(bodyData, token, navigate, dispatch ){
    const toastId = toast.loading("Verifing payment");
    dispatch(setPaymentLoading(true));
    try{
        const responce = await apiConnector("POST", studentApi.COURSE_VERIFY_API, bodyData,{
            Authorization: `Bearer ${token}`,
        })
        console.log(responce)
        if(!responce.data.success){
            throw new Error(responce.data.message);
        }

        navigate("/dashboard/enrolled-courses")
        dispatch(resetCart());
        toast.success("Payment Successfull, You are added to the course ");
    }
    catch(error){
        console.log("Payment verify  error", error);
        toast.error("Payment Verification failed");
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));

}