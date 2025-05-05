const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath =
      file.fieldname === 'poster' ? 'uploads/posters' : 'uploads/songs';
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes =
    file.fieldname === 'poster' ? ['image/jpeg', 'image/png'] : ['audio/mpeg'];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(
      new Error(
        `Only ${
          file.fieldname === 'poster' ? 'images' : 'mp3 files'
        } are allowed`
      )
    );
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 50 }, // 50 MB
});

module.exports = upload;
