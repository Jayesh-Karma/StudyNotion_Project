const express = require("express");
const app = express();

const user = require("./Routes/loginSignupRoutes");
const course = require("./Routes/courseRoutes");
const rating_Category = require("./Routes/category&ratingRoutes");
const payment = require("./Routes/paymentRoutes")
const contactUs = require("./Routes/contactUsRoute");

const cookieParser = require("cookie-parser");
const cors = require("cors")
const fileUpload = require('express-fileupload');
const morgan = require("morgan");
require("dotenv").config();

//express builtin middlewares
app.use(express.json());
app.use(cookieParser());
    app.use(fileUpload({
        useTempFiles:true,
        tempFileDir:'/tmp/'}))
// app.use(multer())
app.use(cors())

//morgon use
app.use(morgan('dev'));

//database connection 
require("./Config/dbConnect").dbConnect();

// cloudinary connection 
require("./Config/cloudConnect").cloudify();

app.get("/", (req,res) =>{ 
    res.send("Yess your server is running up")
})

app.use("/v1/userAuth", user)
app.use("/v1/course", course)
app.use("/v1/course-category-rating", rating_Category)
app.use("/v1/payment", payment)
app.use("/v1/contactus", contactUs)


app.listen(process.env.PORT, ()=>{
    console.log("Server started successfully at", process.env.PORT);
})
