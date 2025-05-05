// routes/albumRoutes.js
const express = require('express');
const router = express.Router();
const albumController = require('../controllers/albumController');

router.post('/create', albumController.createAlbum);
router.get('/getAll', albumController.getAllAlbums);
router.get('/:id', albumController.getAlbumById);
router.put('/:id', albumController.updateAlbum);
router.delete('/:id', albumController.deleteAlbum);

module.exports = router;
