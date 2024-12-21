// const multer = require("multer");
// const path = require("path");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, '../../data'))
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname)
//   }
// });

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 10000000 }, // 10MB file size limit
// });

// module.exports.multerUpload = async (request, response) => {
//   upload.single('file')(request, response, (err) => {
//     if (err) {
//       console.error(err);
//       return response.status(500).send('Error uploading file');
//     }

//     console.log('Request body:', request.body);
    
//     if (!request.file) {
//       return response.status(400).send('No file uploaded');
//     }

//     console.log('File details:', request.file);
//     console.log('File uploaded successfully');
//     let relativePath = "/data/" + request.file.filename;
//     response.status(200).json({
//       message: 'File uploaded successfully',
//       filePath: relativePath,
//       body: request.body
//     });
//   });
// };

const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const fs = require('fs');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure multer for temporary storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  }
});

// API endpoint
module.exports.uploadImage = async (req, res) => {
  try {
    // Handle the file upload
    upload.single('image')(req, res, async (err) => {
      if (err) {
        console.error('Upload error:', err);
        return res.status(400).json({
          success: false,
          error: err.message
        });
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          error: 'No image file provided'
        });
      }

      try {
        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'uploads',
          resource_type: 'auto'
        });

        // Clean up - remove temp file
        fs.unlinkSync(req.file.path);
        
        // Return success response
        res.status(200).json({
          success: true,
          imageUrl: result.secure_url,
          publicId: result.public_id,
          details: {
            format: result.format,
            width: result.width,
            height: result.height,
            size: result.bytes
          }
        });
      } catch (cloudinaryError) {
        // Clean up temp file in case of cloudinary upload failure
        if (req.file) {
          fs.unlinkSync(req.file.path);
        }
        console.error('Cloudinary error:', cloudinaryError);
        res.status(500).json({
          success: false,
          error: 'Error uploading to cloud storage'
        });
      }
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error occurred'
    });
  }
};

// Delete image endpoint
module.exports.deleteImage = async (req, res) => {
  try {
    const { publicId } = req.body;
    
    if (!publicId) {
      return res.status(400).json({
        success: false,
        error: 'No public_id provided'
      });
    }

    const result = await cloudinary.uploader.destroy(publicId);
    
    res.status(200).json({
      success: true,
      result: result
    });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({
      success: false,
      error: 'Error deleting image'
    });
  }
};