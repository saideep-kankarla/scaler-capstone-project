import { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  Box,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  Typography,
} from '@mui/material';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import { AudioPlayer } from 'react-audio-play';
import axios from '../utils/axios-config';

const AlbumPage = () => {
  let params = useParams();

  const [data, setData] = useState([]);
  const [sData, setsData] = useState([]);
  const [currentActiveSong, setCurrentActiveSong] = useState(1);
  const apiBaseUrl =
    import.meta.env.VITE_NODE_API_URL ||
    import.meta.env.VITE_NODE_API_URL_LOCAL;

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiBaseUrl}/api/albums/${params.id}`,
        );
        setData(response.data.album);

        const songData = (await response.data.album.songs) || [];

        const updatedSongs = await songData.map((song) => ({
          ...song,
          mp3Path: `${apiBaseUrl}/mp3/${song.mp3Path}`,
        }));

        setsData(updatedSongs);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const [currentSong, setCurrentSong] = useState({
    id: 1,
    songName: null,
    mp3FilePath: null,
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef(null);

  const handlePlayPause = (id, songName, mp3FilePath) => {
    console.log('xaxax', mp3FilePath, sData);

    if (currentSong && currentSong.id === id) {
      // Toggle play/pause
      setIsPlaying(!isPlaying);
      if (playerRef.current) {
        if (!isPlaying) {
          playerRef.current?.play();
        } else {
          playerRef.current?.pause();
        }
      }
    } else {
      setCurrentActiveSong(id);

      // Play new song
      setCurrentSong({
        id,
        songName,
        mp3FilePath,
      });
      setIsPlaying(true);
    }
  };

  const calculateTotalMinutes = () => {
    let totalSeconds = 0;
    sData.forEach((item) => {
      const [minutes, seconds] = item.duration.split(':').map(Number);
      totalSeconds += minutes * 60 + seconds;
    });
    const totalMinutes = totalSeconds / 60;
    return totalMinutes;
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid className="albumContainer" size={12} container>
          <Grid className="album-info-container" size={5}>
            <Typography align="center" gutterBottom variant="subtitle1">
              <b>{data.composer}</b>
            </Typography>
            <Card className="albumCardCss withPlayer">
              <CardActionArea>
                <CardMedia
                  component="img"
                  sx={{ height: 264 }}
                  image={apiBaseUrl + '/posters/' + data.poster}
                  alt={data.name}
                />
              </CardActionArea>
            </Card>
            <Typography align="center" gutterBottom variant="h5">
              <b>
                {data.name} - {data.language} (Original Motion Picture
                Soundtrack)
              </b>
            </Typography>

            <Typography align="center" gutterBottom variant="subtitle1">
              {sData.length} Songs &bull; {calculateTotalMinutes().toFixed(2)}
              Minutes &bull; {data.releaseYear}
            </Typography>
            <Typography align="center" gutterBottom variant="subtitle2">
              {data.description}
            </Typography>
          </Grid>
          <Grid className="album-songs-container" size={7}>
            <Box>
              {sData.map((song, index) => (
                <Grid
                  container
                  key={song._id}
                  sx={{
                    padding: 2,
                    borderBottom: '1px solid #2f2f2f',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor:
                      currentActiveSong === song._id
                        ? 'rgba(58, 56, 56, 0.5)'
                        : 'transparent', // Add active class logic here
                  }}
                >
                  <Grid item xs={1} sx={{ textAlign: 'left' }}>
                    <Typography>{index + 1}</Typography>
                  </Grid>
                  <Grid
                    item
                    xs={3}
                    sx={{
                      textAlign: 'left',
                      paddingLeft: 2,
                      minWidth: '500px',
                      maxWidth: '100%',
                    }}
                  >
                    <Typography gutterBottom>{song.title}</Typography>
                    <Typography variant="caption">{song.singerName}</Typography>
                  </Grid>
                  <Grid
                    item
                    xs={3}
                    sx={{
                      textAlign: 'left',
                      paddingLeft: 2,
                      minWidth: '50px',
                      maxWidth: '50px',
                    }}
                  >
                    <Typography>{song.duration}</Typography>
                  </Grid>
                  <Grid
                    item
                    xs={1}
                    sx={{
                      paddingLeft: 2,
                      textAlign: 'right',
                      minWidth: '50px',
                      maxWidth: '50px',
                      cursor: 'pointer',
                    }}
                  >
                    <PlayCircleFilledWhiteIcon
                      sx={{ fontSize: 40 }}
                      key={song._id}
                      onClick={() =>
                        handlePlayPause(song._id, song.songName, song.mp3Path)
                      }
                    />
                  </Grid>
                </Grid>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container size={12}>
          <Grid className="playerContainer" size={12}>
            {currentSong && (
              <AudioPlayer
                className="playerBox"
                ref={playerRef}
                autoPlay={isPlaying}
                src={currentSong.mp3FilePath}
                color="#cfcfcf"
                sliderColor="#94b9ff"
                backgroundColor="#2c2828"
              />
            )}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default AlbumPage;
