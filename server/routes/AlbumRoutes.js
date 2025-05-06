// routes/albumRoutes.js
const express = require('express');
const router = express.Router();
const albumController = require('../controllers/AlbumController');
const verifyToken = require('../middlewares/verifyJwt');

router.get('/testAlbum', (req, res) => {
  res.send('Welcome to Album API call!');
});
router.get('/getAll', albumController.getAllAlbums);
router.get('/premiumAlbums', verifyToken, albumController.getAllPremiumAlbums);
router.get('/:id', albumController.getAlbumById);

router.post('/create', verifyToken, albumController.createAlbum);
router.delete('/:id', verifyToken, albumController.deleteAlbum);

// router.put('/:id', albumController.updateAlbum);

module.exports = router;
