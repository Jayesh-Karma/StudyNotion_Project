import { toast }  from "react-hot-toast";
import  { apiConnector } from "../apiConnector";
import { courseApis, profileUpdate }  from "../apis";

export const uploadImg = (profilePic, token) =>{
    return async() =>{
        const toastId = toast.loading("Loading");
        try{
            // const formData = new FormData();
            // formData.append('profilePic', profilePic);

            console.log( profilePic.selectedFile)
            const res = await apiConnector("PUT", profileUpdate.UPDATE_PROFILE, {profilePic: profilePic.selectedFile},  {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            });
            console.log(res);
            toast.success("Profile Updated Successfully")
            return res.data.data.img        
            
            
        }catch(error){
            console.log(error);
            toast.error(error);
        }
        toast.dismiss(toastId);
    }
}
//  get enrolled courses
export  function getUserEnrolledCourse (token){
    let result = [];
    return async() =>{

        const tId = toast.loading("Loading...");
        console.log("api reach")
        try{
            const res = await apiConnector(
                "GET", courseApis.GET_ENROLLED_COURSES, null, 
                {Authorization: `Bearer ${token}`} )
                
                console.log("Res", res.data)
                if(!res){
                    toast.error("Could not get enrolled course");
                }
                
                result =  res.data;

                
            }catch(error){
                console.log(error);
            toast.error("Login again")
        }
        toast.dismiss(tId);
        return result;
    }
    }