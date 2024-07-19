import React, { useRef, useState } from 'react'

import useOnClickOutside from '../../hooks/useOpenClose'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineCaretDown } from 'react-icons/ai';
import { VscDashboard, VscSignOut } from 'react-icons/vsc';
import { logout } from '../../Services/AuthApi/authApi';

const DropDown = () => {
    const {user} = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useOnClickOutside(ref, ()=> setOpen(false));    


    if(!user){
        return null;
    }

    
  return (
    <button className='' onClick={() => setOpen(true)}>
        <div className=' relative flex flex-row justify-between gap-1 items-center    '>
            <img className='aspect-square w-[30px] rounded-full object-cover' src={user?.img} alt={user.firstname} />
            <AiOutlineCaretDown className='text-sm text-richblack-100' />  
        </div>
        { open && (
            <div>
            <div onClick={(e) => e.stopPropagation()} className='absolute lg:top-16 lg:right-28 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-80' ref={ref}>
            <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
              <VscDashboard className="text-lg" />
              Dashboard
            </div>
          </Link>
          <div
            onClick={() => {
              dispatch(logout(navigate))
              setOpen(false)
            }}
            className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
          >
            <VscSignOut className="text-lg" />
            Logout
          </div>
          </div>
                
        </div>
        )
        }
    </button>
  )
}

export default DropDown
