const { default: toast } = require("react-hot-toast");
const { courseApis, categories } = require("../apis");

exports.catalogData = async(categoryId) => {
    let result = [];
    const toastId = toast.loading("Loading...");
    try{
        const responce = await categories.GET_CATALOG_COURSES({categoryId: categoryId});
        console.log(responce);

    }
    catch(error){
        console.log("Error in geting catalog data ", error)
        toast.error("Something went wrong")

    }
    toast.dismiss(toastId);
    return result;
}