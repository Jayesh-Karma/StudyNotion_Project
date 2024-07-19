import React, { useState } from 'react'
import {sidebarLinks } from '../../../data/dashboard-links';
import { useDispatch, useSelector } from 'react-redux';
import SidebarLinks from './SidebarLinks';
import { VscSettingsGear, VscSignOut } from 'react-icons/vsc';
import { logout } from '../../../Services/AuthApi/authApi';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../Common/ConfirmationModal';



const Sidebar = () => {
  console.log(sidebarLinks)
  const {user, loading:profileLoading} = useSelector((state) => state.profile);
  const {loading:authLoading} = useSelector((state) => state.auth);

  const [confimationModal, setConfirmationModal] = useState(null);
  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  if(profileLoading || authLoading){
    return (
      <div>
        Loading ......
      </div>
    )
  }

 
  return (
    <div className=' flex flex-col border border-r-[1px] border-r-richblack-700 h-[calc(100vh-3.5rem)] w-[20%] bg-richblack-800 py-10'>
      
      <div className='flex flex-col text-white'>
        {
          sidebarLinks.map((value, idx) =>{
            if(value.type && value.type !== user.accountType) return null;
            return <SidebarLinks value={value} key={value.id} />            
        } )}

      </div>

      <div className='mx-auto mb-6 mt-6 h-[1px] w-10/12 bg-richblack-400'></div>

        {/* // setings and other routes */}
        <div className=' flex flex-col text-white'>
        <SidebarLinks value={{
              
              name: "Settings",
              path: "/dashboard/setting",
              icon: "VscSettingsGear",
            }} />

          <button
          
          onClick={ () => setConfirmationModal({
            text1:"Are You Sure ?",
            text2:"You will be logged out from your account",
            btn1Text:"Logout",
            btn2Text:"Cancel",
            btnHandler1: ()=> dispatch(logout(navigate)),
            btnHandler2:() => setConfirmationModal(null)
          })}
          >
          <div className='flex flex-row gap-x-2  px-8 py-2'>
            <VscSignOut />
            <span>Logout</span>
          </div>

          </button>
        </div>

          {confimationModal &&   <ConfirmationModal modalData={confimationModal} />}

    </div>
  )
}

export default Sidebar
