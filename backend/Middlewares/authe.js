const jwt = require('jsonwebtoken');

exports.auth = async (req, res, next)=>{
    try {
        const token = req.cookies.token || req.header("Authorization").replace("Bearer ", "");  
        console.log(token)
        console.log("Token Data",req.body)
        // if token is missing , then return responce
        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Token not found"
            })
        }
        
            const decode = await jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;  

        
        next();
    
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "aerror occured in auth",
            error:error.message
        })
    }
}

// isStudent middleware 
exports.isStudent = async (req, res, next) => {
    try {
        if (req.user.role !== 'Student') {
            res.status(400).json({
                success: false,
                message: "This is a protected route for student only",
            })
        }


        next();

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Error occured in is Student auth",
            error
        })
    }
}
// isInstructor middleware 
exports.isInstructor = async (req, res, next) => {
    try {
        if (req.user.role !== 'Instructor') {
            return res.status(400).json({
                success: false,
                message: "This is a protected route for Instructor only",
            })
        }


        next();

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Error occured in is Instructor auth",
            error
        })
    }
}
// isAdmin middleware 
exports.isAdmin = async (req, res, next) => {
    try {
        if (req.user.role !== 'Admin') {
            res.status(400).json({
                success: false,
                message: "This is a protected route for Admin only",
            })
        }


        next();

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Error occured in is Admin auth",
            error
        })
    }
}