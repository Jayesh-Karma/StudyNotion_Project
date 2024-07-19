const baseurl = "http://localhost:4000/v1/"
// const baseurl = process.env.REACT_APP_BASE_KEY;

export const studentApi  = {
    COURSE_PAYMENT_API : `${baseurl}payment/capture-Payment`,
    COURSE_VERIFY_API :   `${baseurl}payment/verifySignature`,
    PAYMENT_MAIL_API :   `${baseurl}payment/sendPaymentMail`

}


export const categories = {
    GET_CATEGORIES: `${baseurl}course-category-rating/get-category`,
    // both 2 and 3 rd api will do same work but 3rd one has 3 output courses and addwd most selling courses
    SELECTED_CATEGORY_COURSES:`${baseurl}course-category-rating/selected-category-courses`,
   
    GET_CATALOG_COURSES: `${baseurl}course/categorized-courses`

};

export const authApis = {
    SIGN_UP_API:`${baseurl}userAuth/create-account`,
    LOGIN_API:`${baseurl}userAuth/login`,
    SEND_OTP:`${baseurl}userAuth/sendotp`,
    RESET_PASS_TOKEN : `${baseurl}userAuth/resetPassword`,
    RESET_PASS: `${baseurl}userAuth/update-password`,
    INSTRUCTOR_DASHBOARD: `${baseurl}userAuth/instructorDashboard`
}

export const contactUs = {
    CONTACT_US: `${baseurl}contactus/contact`
}

export const profileUpdate = {
    UPDATE_PROFILE: `${baseurl}userAuth/update-img`
}

export const courseApis = {
    GET_ENROLLED_COURSES : `${baseurl}userAuth/get-enrolled-courses`,
    GET_ALL_COURSES: `${baseurl}course/all-courses`,
    GET_COURSE_DETAIL: `${baseurl}course/getDetails`,
    GET_COURSE_DETAIL_FOR_INSTRUCTOR : `${baseurl}course/getDetailsForInstructor`,
    GET_STUDENT_COURSE:`${baseurl}course/getDetailsForStudent`,
    EDIT_COURSE:`${baseurl}course/edit-course`,
    DELETE_COURSE: `${baseurl}course/delete-course`,

    CREATE_COURSE:`${baseurl}course/create-course`,
    CREATE_SECTION:`${baseurl}course/create-section`,
    CREATE_SUBSECTION:`${baseurl}course/create-subsection`,
    
    UPDATE_SECTION:`${baseurl}course/update-section`,
    UPDATE_SUBSECTION:`${baseurl}course/update-subsection`,

    DELETE_SECTION :`${baseurl}course/delete-section`,
    DELETE_SUBSECTION :`${baseurl}course/delete-subsection`,

    GET_INSTRUCTOR_COURSES: `${baseurl}course/get-instructor-courses`,
    LECTURE_COMPLETION_API:`${baseurl}course/completed-lectures`
    

}

export const ratingEndpoint = {
    CREATE_RATING : `${baseurl}course-category-rating/createRating`,
    GET_ALL_RATINGS:`${baseurl}course-category-rating/getAllRatings`,
}