const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = './public/my-uploads';
// Ensure the directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("Saving to",uploadDir);
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    console.log("saving as",file.fieldname + '-' + Date.now() + path.extname(file.originalname));

  }
});

const upload = multer({ storage : storage });

module.exports = upload;
