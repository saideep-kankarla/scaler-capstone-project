import { Fragment, useEffect, useState } from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Stack,
} from '@mui/material';
import { useAuth } from '../hooks/AuthProvider';
import { Link } from 'react-router-dom';
import axios from '../utils/axios-config';

const Home = () => {
  const [data, setData] = useState([]);
  const auth = useAuth();

  const apiBaseUrl = import.meta.env.VITE_NODE_API_URL;

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiBaseUrl}/api/albums/premiumAlbums`,
        );
        setData(response.data.albums);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <Fragment>
      <div className="albumsContainer">
        <Typography gutterBottom variant="h4">
          <b>Premium Albums</b>
        </Typography>
        {auth?.user?.premiumSubscribed === true ? (
          <div>
            <Stack
              direction="row"
              spacing={5}
              useFlexGap
              sx={{ flexWrap: 'wrap' }}
            >
              {data && data.length > 0 ? (
                data.map((row) => (
                  <Link to={'/album/' + row._id} key={row._id}>
                    <Card className="albumCardCss">
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          sx={{ height: 264 }}
                          image={apiBaseUrl + '/posters/' + row.poster}
                          alt={row.name}
                        />

                        <CardContent>
                          <Typography gutterBottom variant="subtitle1">
                            <b>{row.name}</b>
                            <p>
                              Composer &bull;&nbsp;
                              {row.composer}
                            </p>
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Link>
                ))
              ) : (
                <Typography gutterBottom variant="h6">
                  Stay tuned, we will be back with top quality premium content.
                  content.
                </Typography>
              )}
            </Stack>
          </div>
        ) : (
          <Typography gutterBottom variant="h6">
            Please get premium membership to access top quality premium content.
            <Link to="/profile"> Get Premium Membership.</Link>
          </Typography>
        )}
      </div>
    </Fragment>
  );
};

export default Home;
