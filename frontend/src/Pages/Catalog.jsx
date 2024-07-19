import React, { useEffect, useState } from 'react'
import CourseSlider from '../Components/Core/CatalogPage/CourseSlider'
import Footer from '../Components/Common/Footer'
import { useParams } from 'react-router-dom'
import { categories, courseApis } from '../Services/apis'
import { apiConnector } from '../Services/apiConnector'
import CourseCard from '../Components/Core/CatalogPage/CourseCard'

const Catalog = () => {

    const {categoryName } = useParams();
    const [catalogData, setCatalogData] = useState(null);
    const [categoryId, setCategoryId] = useState("");


    useEffect(()=>{
        const fetchData = async() =>{
            const res = await apiConnector("GET", categories.GET_CATEGORIES);
            const category_Id = res.data.allTags.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === categoryName)[0]._id
            setCategoryId(category_Id);
        }
        fetchData();
    },[categoryName])


    useEffect(()=> {
        const getDetails = async() => {
            const getCategoryDetail = await apiConnector("POST", categories.SELECTED_CATEGORY_COURSES, {categoryId:categoryId})
            console.log(getCategoryDetail)
            setCatalogData(getCategoryDetail.data.data)
        }
        getDetails()
    }, [categoryId])


  return (
    <div className=' text-white'>
        
        {/* upper section  */}
        
        <div className=' bg-richblack-700 w-full lg:h-64 h-32 flex justify-center items-center '>
        
        <div className=' w-10/12 flex flex-col justify-center items-start gap-y-4 '>
            <p className=' text-richblack-300'>{`Home/ Category/ `} <span className=' text-yellow-200'> {catalogData?.selectedCategory?.name}</span></p>
            <p className=' text-3xl'>{catalogData?.selectedCategory?.name}</p>
            <p className=' text-richblack-200'> {catalogData?.selectedCategory?.description}</p>
        </div>

        </div>
    

        {/*  middle section */}
        <div className=' w-full flex flex-col justify-center items-center gap-y-10 mt-10'>
            {/*  middle setion - 1  */}
            <div className=' w-10/12'>
                <div className=' text-4xl font-bold text-richblack-50'>
                    Courses Get you Started
                </div>
                <div className=' flex gap-x-3 text-richblack-200'>
                    <p>Most Popular</p>
                    <p>New</p>
                </div>
                <CourseSlider Courses={catalogData?.selectedCategory?.course} />
            </div>

            {/* middle section - 2  */}
            <div className=' w-10/12'>
                <p className=' text-4xl text-richblack-50 font-bold'>Top Courses</p>
                <CourseSlider Courses={catalogData?.differentCategory?.course} />
            </div>

            {/*  section -3 */}
            <div className=' w-full flex flex-col justify-start items-center gap-y-10 mt-10 mb-10'>
                <p className=' text-start text-4xl font-bold'>Frequently Broughted Course</p>
                <div className=' w-10/12 grid grid-cols-2 gap-6 '>
                    {
                        catalogData?.mostSellingCourses?.slice(0,4)
                        .map((course,idx) => ( <CourseCard key={idx} course={course} Height={"h-[350px]"} />))
                    }
                </div>
            </div>
        </div>

        <Footer />  
    </div>
  )
}

export default Catalog
