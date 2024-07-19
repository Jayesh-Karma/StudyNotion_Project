import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice";  
import profileReducer from "./Slices/profileSlice";
import cartReducer from "./Slices/cartSlice";
import courseSlice from "./Slices/courseSlice";
import viewCourseSlice from "./Slices/viewCourseSlice";

export const rootReducer = combineReducers({
    auth : authReducer,
    profile: profileReducer,
    cart: cartReducer,
    course:courseSlice,
    viewCourse:viewCourseSlice
})

