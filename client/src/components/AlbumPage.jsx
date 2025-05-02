import { Fragment, useRef, useState } from 'react';
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

import devara from '../assets/thumbs/devara1.jpg';

import song1 from '../assets/mp3/hakee-333940.mp3';
import song2 from '../assets/mp3/town-10169.mp3';

const AlbumPage = () => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef(null);

  const handlePlayPause = (id, songName, mp3FilePath) => {
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
      // Play new song
      setCurrentSong({
        id,
        songName,
        mp3FilePath,
      });
      setIsPlaying(true);
    }
  };

  const songData = [
    {
      id: 1,
      songName: 'Fear Song',
      singers: 'Anirudh Ravichandran',
      duration: '3:45',
      mp3FilePath: song1,
    },
    {
      id: 2,
      songName: 'Chuttamalle',
      singers: 'Shilpa Rao',
      duration: '4:10',
      mp3FilePath: song2,
    },
    {
      id: 3,
      songName: 'Daavudi',
      singers: 'Nakash Aziz,Akasa',
      duration: '2:50',
      mp3FilePath: song1,
    },
    {
      id: 4,
      songName: 'Ayudha pooja',
      singers: 'Kaala Bhairava',
      duration: '2:50',
      mp3FilePath: song1,
    },
  ];

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid className="albumContainer" container>
          <Grid className="album-info-container" size={5}>
            <Typography align="center" gutterBottom variant="subtitle1">
              <b>Anirudh Ravichandran</b>
            </Typography>
            <Card className="albumCardCss withPlayer">
              <CardActionArea>
                <CardMedia
                  component="img"
                  sx={{ height: 264 }}
                  image={devara}
                  alt="Devara"
                />
              </CardActionArea>
              {currentSong && (
                <AudioPlayer
                  ref={playerRef}
                  autoPlay={isPlaying}
                  src={currentSong.mp3FilePath}
                  color="#cfcfcf"
                  sliderColor="#94b9ff"
                  backgroundColor="#2c2828"
                />
              )}
            </Card>
            <Typography align="center" gutterBottom variant="h5">
              <b>Devara - Telugu (Original Motion Picture Soundtrack)</b>
            </Typography>

            <Typography align="center" gutterBottom variant="subtitle1">
              4 Songs &bull; 15:00 &bull; 2024
            </Typography>
            <Typography align="center" gutterBottom variant="subtitle2">
              A village chief's son secretly continues his father's mission to
              end smuggling, while pretending to be weak and maintaining the
              illusion that his father is still alive.
            </Typography>
          </Grid>
          <Grid className="album-songs-container" size={7}>
            <Box>
              {songData.map((song, index) => (
                <Grid
                  container
                  key={song.id}
                  sx={{
                    padding: 2,
                    borderBottom: '1px solid #2f2f2f',
                    alignItems: 'center',
                    justifyContent: 'space-between',
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
                    <Typography gutterBottom>{song.songName}</Typography>
                    <Typography variant="caption">{song.singers}</Typography>
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
                      key={song.id}
                      onClick={() =>
                        handlePlayPause(
                          song.id,
                          song.songName,
                          song.mp3FilePath,
                        )
                      }
                    />
                  </Grid>
                </Grid>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default AlbumPage;
