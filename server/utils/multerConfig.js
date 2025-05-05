const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create upload directories if they don't exist
const uploadDir = 'uploads';
const postersDir = path.join(uploadDir, 'posters');
const songsDir = path.join(uploadDir, 'songs');

if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
if (!fs.existsSync(postersDir)) fs.mkdirSync(postersDir);
if (!fs.existsSync(songsDir)) fs.mkdirSync(songsDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = file.fieldname === 'poster' ? postersDir : songsDir;
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes =
    file.fieldname === 'poster'
      ? ['image/jpeg', 'image/png', 'image/gif']
      : ['audio/mpeg', 'audio/wav'];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(
      new Error(
        `Only ${
          file.fieldname === 'poster'
            ? 'images (jpg, png, gif)'
            : 'audio files (mp3, wav)'
        } are allowed. You uploaded a file of type ${file.mimetype}`
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
