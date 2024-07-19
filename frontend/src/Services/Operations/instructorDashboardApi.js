import toast from "react-hot-toast"
import { apiConnector } from "../apiConnector";
import { authApis } from "../apis";

export async function getInstructorData(token){
    const toastId = toast.loading("Loading....");
    let result = [];
    try{
        const response = await apiConnector("GET", authApis.INSTRUCTOR_DASHBOARD, null, {
      Authorization: `Bearer ${token}`,
    })

    console.log(response.data.courses);
    result = response?.data?.courses;


    }
    catch(error){
        console.log("Error Occurred in instructor dashboard", error)
        toast.error("Couldn't get Instructor Data");
    }
    toast.dismiss(toastId);
    return result;
}