import React from 'react'
import * as Icons from 'react-icons/vsc'
import { useDispatch } from 'react-redux';
import { NavLink, matchPath, useLocation } from 'react-router-dom';

const SidebarLinks = ({value}) => {

    const Icon = Icons[value.icon];
    const location = useLocation();
    const dispatch = useDispatch();

    // location pathname matcher fucntion
    const matchRoute = (route) =>{
        return matchPath({path:route}, location.pathname);
    }




  return (
    <NavLink to={value.path} 
    className={`relative px-8 py-2 text-sm
    ${matchRoute(value.path) ? " bg-yellow-200 font-bold ":" bg-transparent font-medium"}`}
    // activeClassName=" bg-yellow-500"
    >

    <span className={` absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-500 ${matchRoute( value.path)? " opacity-100":" opacity-0"} `}>
    </span>

    <div className='flex flex-row items-center gap-x-2'>
        <Icon className="text-lg" />
        <span>{value.name}</span>
    </div>

    </NavLink>
  )
}

export default SidebarLinks
