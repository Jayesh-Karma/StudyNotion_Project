const cloudinary = require('cloudinary').v2;

exports.uploadImgToCloud = async function ( imgFile, folder, height, quality){
   
    const options = {folder};
    if(height){
        options.height = height;
    }
    if(quality){
        options.quality = quality;
    }
    options.resource_type = "auto";

    return await cloudinary.uploader.upload(imgFile.tempFilePath, options);
}

//delete things from cloudinaryr
exports.deleteAssetFromCloud = async function( public_id, resource){
    return await cloudinary.uploader.destroy(public_id, {resource_type:resource});
}
