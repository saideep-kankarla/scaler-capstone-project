const Album = require('../models/Album');
const upload = require('../utils/multerConfig');

const uploadFiles = upload.fields([
  { name: 'poster', maxCount: 1 },
  { name: 'songs', maxCount: 10 },
]);
exports.createAlbum = async (req, res) => {
  try {
    await new Promise((resolve, reject) => {
      uploadFiles(req, res, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    const {
      name,
      language,
      composer,
      description,
      releaseYear,
      premium,
      songsDetails,
    } = req.body;

    if (
      !name ||
      !language ||
      !composer ||
      !description ||
      !releaseYear ||
      !songsDetails
    ) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (!req.files.poster || !req.files.poster.length) {
      return res.status(400).json({ message: 'Poster is required' });
    }

    if (!req.files.songs || !req.files.songs.length) {
      return res.status(400).json({ message: 'At least one song is required' });
    }

    const poster = req.files.poster[0].filename;
    const songsDetailsParsed = JSON.parse(songsDetails);

    if (req.files.songs.length !== songsDetailsParsed.length) {
      return res
        .status(400)
        .json({ message: 'Number of songs and song details do not match' });
    }

    const songs = req.files.songs.map((song, index) => ({
      title: songsDetailsParsed[index].title,
      duration: songsDetailsParsed[index].duration,
      singerName: songsDetailsParsed[index].singerName,
      mp3Path: song.filename,
    }));

    const album = new Album({
      name,
      language,
      composer,
      description,
      releaseYear,
      poster,
      songs,
      premium: premium === 'true',
    });

    await album.save();
    res.status(201).json(album);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.getAlbumById = async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);
    if (!album) {
      return res.status(404).json({ message: 'Album not found' });
    }
    res.status(200).json({ status: 200, message: 'Success', album });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateAlbum = async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);
    if (!album) {
      return res.status(404).json({ message: 'Album not found' });
    }

    await new Promise((resolve, reject) => {
      uploadFiles(req, res, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    const {
      name,
      language,
      composer,
      description,
      releaseYear,
      premium,
      singerName,
    } = req.body;
    if (req.files.poster) album.poster = req.files.poster[0].filename;
    if (req.files.songs) {
      album.songs = req.files.songs.map((song) => ({
        title: song.originalname.split('.')[0],
        duration: '00:00',
        singerName,
        mp3Path: song.filename,
      }));
    }

    album.name = name;
    album.language = language;
    album.composer = composer;
    album.description = description;
    album.releaseYear = releaseYear;
    album.premium = premium === 'true';

    await album.save();
    res.status(200).json(album);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteAlbum = async (req, res) => {
  try {
    await Album.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: 'Album deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getAllAlbums = async (req, res) => {
  try {
    const albums = await Album.find({ premium: false });
    res.status(200).json({ status: 200, message: 'Success', albums });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllPremiumAlbums = async (req, res) => {
  try {
    const albums = await Album.find({ premium: true });
    res.status(200).json({ status: 200, message: 'Success', albums });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
