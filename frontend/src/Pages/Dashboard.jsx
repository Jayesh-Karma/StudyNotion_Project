import React from 'react'
import { useSelector } from 'react-redux'
import Sidebar from '../Components/Core/DashBoard/Sidebar';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {

    const {userLoading} = useSelector((state) => state.profile);
    const {loading :authloading} = useSelector((state) => state.auth);
    console.log(userLoading)

    if(userLoading || authloading ){
        return (
            <div className='h-[80vh] flex justify-center items-center'>
                Loading...
            </div>
                )
    }


  return (
    <div className=' relative flex w-full  min-h-[calc(100vh - 3.5rem)]'>
        <Sidebar />
      <div className=' h-[calc(100vh-3.5rem)] w-[80%]  overflow-auto'>
            <div className='text-white mx-auto w-11/12 max-w-[1000px] py-10'>
                <Outlet />
            </div>

      </div>
    </div>
  )
}

export default Dashboard
