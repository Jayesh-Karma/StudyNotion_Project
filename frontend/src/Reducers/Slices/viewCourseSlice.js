import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    courseSectionData :[],
    courseEntireData:[],
    comletedLectures:[],
    totalNoofLectures: 0,
}

const viewCourseSlice = createSlice({
    name:"viewCourse",
    initialState:initialState,
    reducers:{
        setCourseSectionData : (state, action) =>{
            state.courseSectionData = action.payload
        },
        setCourseEntireData : (state, action) =>{
            state.courseEntireData = action.payload;
        },
        setCompletedLectures: (state, action) =>{
            state.comletedLectures = action.payload;
        },
        setTotalNoofLectures: (state, action) =>{
            state.totalNoofLectures = action.payload;
        },
        updateCompletedLecture: (state, action) =>{
            state.comletedLectures = [...state.comletedLectures, action.payload];
        }
    }
})

export const {
    setCourseSectionData, 
    setCourseEntireData, 
    setCompletedLectures, 
    setTotalNoofLectures, 
    updateCompletedLecture} = viewCourseSlice.actions;
export default viewCourseSlice.reducer;  