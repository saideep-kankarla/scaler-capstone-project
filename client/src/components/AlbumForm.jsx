import { Fragment, useState } from 'react';
import {
  Box,
  Grid,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthProvider';
import axios from '../utils/axios-config';

const AlbumForm = () => {
  // check for logged in user for protected routes
  const navigate = useNavigate();
  const auth = useAuth();
  if (auth?.user === null) {
    navigate('/login');
  }

  const [name, setName] = useState('');
  const [language, setLanguage] = useState('');
  const [composer, setComposer] = useState('');
  const [description, setDescription] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [premium, setPremium] = useState(false);
  const [poster, setPoster] = useState(null);
  const [songs, setSongs] = useState([
    { title: '', duration: '00:00', singerName: '', mp3File: null },
  ]);
  const [message, setMessage] = useState('');

  const apiBaseUrl =
    import.meta.env.VITE_NODE_API_URL ||
    import.meta.env.VITE_NODE_API_URL_LOCAL;

  const handlePosterChange = (e) => {
    setPoster(e.target.files[0]);
  };

  const handleSongChange = (e, index) => {
    const { name, value } = e.target;
    const newSongs = [...songs];
    newSongs[index][name] = value;
    setSongs(newSongs);
  };

  const handleSongFileChange = (e, index) => {
    const newSongs = [...songs];
    newSongs[index].mp3File = e.target.files[0];
    setSongs(newSongs);
  };

  const addMoreSong = () => {
    setSongs([
      ...songs,
      { title: '', duration: '00:00', singerName: '', mp3File: null },
    ]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('language', language);
    formData.append('composer', composer);
    formData.append('description', description);
    formData.append('releaseYear', releaseYear);
    formData.append('premium', premium);
    formData.append('poster', poster);
    formData.append(
      'songsDetails',
      JSON.stringify(
        songs.map((song) => ({
          title: song.title,
          duration: song.duration,
          singerName: song.singerName,
        })),
      ),
    );

    songs.forEach((song) => {
      formData.append('songs', song.mp3File);
    });

    try {
      const response = await axios.post(
        `${apiBaseUrl}/api/albums/create`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      setMessage('Album created successfully!');
      console.log(response.data);
    } catch (error) {
      setMessage('Error creating album!');
      console.error(error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'white', color: 'black' }}>
      <Grid className="albumCreateContainer" sx={{ padding: 2 }} container>
        <Grid size={12} item xs={12}>
          <Typography variant="h4" gutterBottom>
            Create Album
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={5} size={12}>
              <Grid item size={4}>
                <TextField
                  required
                  id="name"
                  name="name"
                  label="Album Name"
                  variant="standard"
                  margin="normal"
                  fullWidth
                  helperText="Please enter a Album Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item size={4}>
                <TextField
                  required
                  id="language"
                  name="language"
                  label="Language"
                  variant="standard"
                  margin="normal"
                  fullWidth
                  helperText="Please select a language"
                  autoComplete="family-name"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                />
              </Grid>
              <Grid item size={4}>
                <TextField
                  required
                  id="composer"
                  name="composer"
                  label="Composer"
                  variant="standard"
                  margin="normal"
                  fullWidth
                  helperText="Please enter composer name"
                  value={composer}
                  onChange={(e) => setComposer(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid container spacing={5} size={12}>
              <Grid item size={4}>
                <TextField
                  required
                  id="releaseYear"
                  name="releaseYear"
                  label="Release Year"
                  variant="standard"
                  margin="normal"
                  fullWidth
                  helperText="Please enter release year"
                  value={releaseYear}
                  onChange={(e) => setReleaseYear(e.target.value)}
                />
              </Grid>
              <Grid item size={8} xs={12} sx={{ marginBottom: 2 }}>
                <TextField
                  required
                  id="description"
                  name="description"
                  label="Description"
                  margin="normal"
                  fullWidth
                  helperText="Please enter Album description year"
                  multiline
                  rows={4}
                  autoComplete="given-name"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid container size={12} sx={{ marginBottom: 2 }}>
              <Grid size={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={premium}
                      onChange={(e) => setPremium(e.target.checked)}
                      name="premium"
                    />
                  }
                  label="Is this Premium Album?"
                />
              </Grid>
              <Grid size={3}>
                <Typography variant="body1">Poster:</Typography>
                <input
                  accept="image/*"
                  id="poster"
                  type="file"
                  onChange={handlePosterChange}
                />
              </Grid>
            </Grid>
            <Divider sx={{ marginTop: 5, marginBottom: 5 }} />

            <Typography variant="h4" gutterBottom>
              Add Song(s)
              <Button
                variant="contained"
                sx={{ marginLeft: 15 }}
                onClick={addMoreSong}
              >
                Add More
              </Button>
            </Typography>

            {songs.map((song, index) => (
              <Fragment key={index}>
                <Grid item xs={12} sx={{ marginBottom: 2 }}>
                  <Typography variant="h6">Song {index + 1}:</Typography>
                  <Grid container spacing={5} size={12}>
                    <Grid item size={3}>
                      <TextField
                        required
                        id={`title-${index}`}
                        name="title"
                        label="Track Name"
                        variant="standard"
                        margin="normal"
                        fullWidth
                        helperText="Please enter Track Name"
                        value={song.title}
                        onChange={(e) => handleSongChange(e, index)}
                      />
                    </Grid>
                    <Grid item size={3}>
                      <TextField
                        required
                        id={`singerName-${index}`}
                        name="singerName"
                        label="Singer Name"
                        variant="standard"
                        margin="normal"
                        fullWidth
                        helperText="Please enter Singer Name"
                        value={song.singerName}
                        onChange={(e) => handleSongChange(e, index)}
                      />
                    </Grid>
                    <Grid item size={3}>
                      <TextField
                        required
                        id={`duration-${index}`}
                        name="duration"
                        label="Duration in (MM:SS)"
                        variant="standard"
                        margin="normal"
                        fullWidth
                        helperText="Please enter Track Duration"
                        value={song.duration}
                        onChange={(e) => handleSongChange(e, index)}
                      />
                    </Grid>
                    <Grid item size={3}>
                      <Typography variant="body1">Song File:</Typography>
                      <input
                        accept="audio/*"
                        id={`mp3File-${index}`}
                        type="file"
                        onChange={(e) => handleSongFileChange(e, index)}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Fragment>
            ))}

            <Grid item xs={12} sx={{ marginTop: 5, marginBottom: 2 }}>
              <Button type="submit" variant="contained">
                Create Album
              </Button>
            </Grid>
          </form>
          {message && <Typography variant="body1">{message}</Typography>}
        </Grid>
      </Grid>
    </Box>
  );
};

export default AlbumForm;
