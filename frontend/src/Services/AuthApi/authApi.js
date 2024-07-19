import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { apiConnector } from "../apiConnector";
import { authApis } from "../apis";
// const dispatch = useDispatch();
import {setLoading, setToken} from "../../Reducers/Slices/authSlice"

import { setUser, setUserLoading } from "../../Reducers/Slices/profileSlice";


//auth api calling for frontend 
// send otp call
export function sendOtp(email, navigate){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try{
            console.log(email)
            if(email == ""){
                toast.error("Email not found")
                toast.dismiss(toastId)
                return;
            }
            const responce = await apiConnector("POST", authApis.SEND_OTP, {email});
            console.log(responce);
            toast.success("Otp sended successfully");
            navigate("/verify-email")
            
        }catch(error){
            console.log(error)
            toast.error(error.response.data.message)
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}


export function signup( firstname, lastname, email, accountType ,password, confirmPassword, otp, navigate){
    return async(dispatch) =>{
        setLoading(true);
        const toastid = toast.loading("Loading...");
    try{
        const responce = await apiConnector("POST", authApis.SIGN_UP_API, {
            firstname, lastname, email, accountType, password, confirmPassword, otp
        });
        console.log(responce);
        toast.success("Signup successfully")
        navigate("/login");
    }catch(error){
        console.log(error);
        toast.error("Server error try again later");
    }
    toast.dismiss(toastid);
    setLoading(false);
    }
}


// rontend caller to backend for login 
export function loginUser(email, password, navigate){
    return async(dispatch) =>{
        const toastid = toast.loading("Loading..")
        setUserLoading(true);
        
        try{
            const responce = await apiConnector("POST", authApis.LOGIN_API, {email, password});
            console.log(responce)
            if(!responce.data.success){
                return toast.error(responce.data.message);
            }

            dispatch(setToken(responce.data.token));
            const userImage = responce.data?.user?.img
            ? responce.data.user.img
            : `https://api.dicebear.com/5.x/initials/svg?seed=${responce.data.user.firstName} ${responce.data.user.lastName}`

            dispatch(setUser({...responce.data.user, img: userImage}))

            localStorage.setItem("token", JSON.stringify(responce.data.token))
            localStorage.setItem("user", JSON.stringify(responce.data.user))

            toast.success(responce.data.message);+
            navigate("/dashboard/my-profile");
        }catch(error){
            console.log(error);
            toast.error(error.response.data.message);
        }
        setUserLoading(false);
        toast.dismiss(toastid);
    }
}

export function logout(navigate){
    return async(dispatch) =>{
        
        dispatch(setToken(null))
        dispatch(setUser(null))
        // dispatch(resetCart())
        const res = localStorage.removeItem("token")
        console.log(res);
        localStorage.removeItem("user")
        toast.success("Logged Out")
        navigate("/")
    }
}


export function resetPasswordCall(email, setEmailSent){
    return async(dispatch)=>{
         dispatch(setLoading(true))
        const toastId = toast.loading("Loadingg...");
        try{
            
            const responce = await apiConnector("POST", authApis.RESET_PASS_TOKEN, {email});
            console.log(responce)
            if(!responce.data.success){
                return toast.error(responce.data.message);
            }
            toast.success(responce.data.message);
            setEmailSent(true);

        }catch(error){
            console.log("reset password error ", error.message);
            toast.error("Error in sending reset email");
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId);
    }
}


export function resetPassword(password, confirmPassword, token, navigate){
    return async(dispatch)=>{
        setLoading(true);
        const toastId = toast.loading("Loading..");
        try{
            const responce = await apiConnector("POST", authApis.RESET_PASS, {password, confirmPassword, token});
            toast.success(responce.data.message);
            navigate("/login")
        }catch(error){
            console.log(error);
            toast.error(error.response.data.message)

        }
        toast.dismiss(toastId);
        setLoading(false);
    }

}