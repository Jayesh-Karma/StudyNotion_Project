import React, { useEffect, useState } from 'react'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { Link, matchPath } from 'react-router-dom'
import {NavbarLinks} from "../../data/navbar-links"
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { BiCart } from 'react-icons/bi'
import { apiConnector } from '../../Services/apiConnector'
import {categories} from '../../Services/apis'
import { FaAngleDown, FaChevronCircleDown } from 'react-icons/fa'
import DropDown from './DropDown'
const Navbar = () => {
    const location = useLocation()
    
    // use selectors for selection of state using redux
    const {token} = useSelector((state)=> state.auth);
    const {user} = useSelector((state) => state.profile);
    const {totalItems} = useSelector((state) => state.cart);
    
    // mactch pathname for active links 
    function matchRoute(route){
        return matchPath({path:route}, location.pathname);
    }
    
    //api calling 
    const[sublinks, setSublinks] = useState([]);
    const getSublinks = async() =>{
        try{
            // console.log("Reachi  ng")
            const result = await apiConnector('GET', categories.GET_CATEGORIES);
            // console.log(result.data.allTags);
            setSublinks(result.data.allTags)
        }catch(error){
            console.log(error)
            console.log(error.message)
        }
    }
    console.log(sublinks)
    useEffect(()=> {
        getSublinks()
    },[])
    
    
    
    return (
        <div className='h-14 flex items-center justify-center border border-b-richblack-700 bg-[#000C23]'>
      <div className='w-11/12 max-w-maxContent flex flex-row items-center justify-between'>

{/*  logo img */}
        <Link to="/">
                <img src={logo} alt="logo" width={160} height={42} loading='lazy' />                
        </Link>

{/* nav links */}
        <nav>
            <ul className='flex gap-x-6 text-richblack-25'>
                {
                    NavbarLinks.map((item, idx) =>(
                     <li key={idx}>
                        {
                            item.title === "Catalog" ? (<div className='group'>

                            <div className='  relative flex items-center gap-2 group'>
                               <p>{item.title}</p>
                               <FaChevronCircleDown />
                                
                            </div>
                                <div className=' invisible absolute  flex flex-col rounded-md bg-richblack-5 
                             translate-y-5 -translate-x-[10%] transition-all duration-200 group-hover:visible w-[20%] p-3  z-10'>
                                    {
                                        sublinks.length ? (

                                        sublinks.map((items,idx) =>(
                                           <Link key={idx} to={`/catalog/${items.name.split(" ").join("-").toLowerCase()}`}>
                                           <p  className=' p-2 text-richblack-800 hover:bg-richblack-100 hover:rounded-m'>{items.name}</p>
                                           </Link> 
                                        ))
                                         ):(
                                            <></>
                                        )
                                    }

                                </div>
                                <div className=' translate-x-16 mt-3 absolute invisible  w-5 h-5 rotate-45 bg-richblack-5 group-hover:visible transition-all duration-200'></div>
                            
                            </div>
                            ) :
                               
                             (<Link to={item.path}> 
                             <p className={`${matchRoute(item.path)? " text-yellow-25" : " text-richblack-25"}`}>
                                {item.title}
                            </p>
                            </Link>)
                        }
                       </li>
                    ))
                }

            </ul>
        </nav>

        {/*  login , signup, dashboard */}
        <div className='flex gap-x-5'>
            {
                user && user?.accountType !== 'Instructor' && (
                    <Link to="/dashboard/totalitems" className='bg-white lg:rounded-full lg:relative lg:text-2xl p-1'>
                        <BiCart />
                    </Link>
                )
            }
            {
                token === null && (
                    <Link to="/login">
                        <button className='p-2 text-richblack-5  bg-richblack-800 border border-richblack-600 rounded-lg'>
                            Login
                        </button>
                    </Link>
                )
            }
            {
                token === null && (
                    <Link to="/signup">
                        <button className='p-2 text-richblack-5  bg-richblack-800 border border-richblack-600 rounded-lg'>
                            Sign Up
                        </button>
                    </Link>
                )
            }
            {
                token !== null &&  <DropDown />
            }
        </div>
      </div>
    </div>
  )
}

export default Navbar
