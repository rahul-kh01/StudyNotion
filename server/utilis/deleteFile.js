const  cloudinary  = require('cloudinary').v2
require('dotenv').config()


exports.deleteFromCloudinary = (file, folder, type ) => {
  const options = { folder };
  options.resource_type = `${type}`
  const asset = `${folder}/${file.split("/").at(-1).split('.').at(0)}`.toString()
  cloudinary.uploader.destroy(asset, options)
};
