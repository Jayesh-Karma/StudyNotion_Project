import React from 'react'
import { useNavigate } from 'react-router-dom'
import ModelBtn from '../../Common/ModelBtn';
import { VscEdit } from 'react-icons/vsc';
import { useSelector } from 'react-redux';

const MyProfile = () => {
    const {user} = useSelector((state) => state.profile);
    const {userLoading} = useSelector((state) => state.profile);
    const navigate = useNavigate();
// console.log(user)

    
 
    return (
    <div className='text-white flex flex-col  justify-center gap-y-5'>
        <h1 className=' text-3xl font-semibold '>My Profile</h1>

        {/*  section 1 */}
        <div className=' flex flex-row justify-between items-center  gap-y-2 p-3 rounded-xl bg-richblack-800 border border-richblack-300'>
            <div>
                <img src={user?.img} alt="" className=' aspect-square w-[78px] rounded-full' />

                <div>
                    <p className=' text-xl font-semibold'>{user?.firstname + " " + user?.lastname}</p>
                    <p className=' text-richblack-400'>{user?.email}</p>
                </div>

            </div>
                <div className=''>
                    <ModelBtn
                    text={"Edit"}
                    onclick={()=> navigate("/dashboard/setting")}
                    // icon={{present:true, value:<VscEdit/>}}
                     />
                </div>
        </div>  

        {/*  section 2 */}
        <div className='flex flex-row justify-between items-center p-3 rounded-xl bg-richblack-800 border border-richblack-300'>
            <div>
                <p className='text-2xl font-semibold'   >About</p>
                <p > Bio: <span className=' text-richblack-400'>{user?.additonalDetail?.about ?? "Write Something about yourself"}</span> </p>
                <p>Account Types of user : <span className=' text-richblack-400'>{user?.accountType}</span> </p>
            </div>

            <div>
                    <ModelBtn
                    text={"Edit"}
                    onclick={()=> navigate("/dashboard/setting")}
                    // icon={{present:true, value:<VscEdit/>}}
                     />
            </div>
        </div>

        {/*  section 3 */}
        <div className=' p-3 rounded-xl bg-richblack-800 border border-richblack-300 w-[100%]'>
            <div className='flex flex-row justify-between items-center '>
                <p>Personal Details</p>
                
                <ModelBtn
                    text={"Edit"}
                    onclick={()=> navigate("/dashboard/setting")}
                    // icon={{present:true, value:<VscEdit/>}}
                     />
                
            </div>
            <div className=' grid grid-cols-2 mt-3'>
                <div>
                    <p>First Name</p>
                    <p className=' text-richblack-500'>{user?.firstname}</p>
                </div> 
                <div>
                    <p>Last Name</p>
                    <p className='text-richblack-500'>{user?.lastname}</p>
                </div> 
                <div>
                    <p>Email</p>
                    <p className=' text-richblack-500'>{user?.email}</p>
                </div> 
                <div>
                    <p>Phone Number</p>
                    <p className=' text-richblack-500'>{user?.additonalDetail?.phone== null ?  "Add your phone number" : user?.additonalDetail?.phone}</p>
                </div> 
                <div>
                    <p>Gener</p>
                    <p className=' text-richblack-500'>{user?.additonalDetail?.gender == null ? " Add your Gender ": user.additonalDetail.gender}</p>
                </div> 
                <div>
                    <p>Date of Birth</p>
                    <p className=' text-richblack-500'>{user?.additonalDetail?.dob == null ? "Add your Birth of Date": user.additonalDetail.dob}</p>
                </div> 
            </div>
        </div>
    </div>
  )
}

export default MyProfile
