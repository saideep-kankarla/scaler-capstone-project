import { Fragment, useEffect, useState } from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Stack,
} from '@mui/material';

import { Link } from 'react-router-dom';
import axios from '../utils/axios-config';

const Home = () => {
  const [data, setData] = useState([]);
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
      <div>
        <Typography gutterBottom variant="h4">
          <b>Premium Albums</b>
        </Typography>
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
                        <Typography
                          gutterBottom
                          variant="subtitle1"
                          component="div"
                        >
                          <b>{row.name}</b> <br /> Composer &bull;{' '}
                          {row.composer}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Link>
              ))
            ) : (
              <h2>No Premium Albums at the moment.</h2>
            )}
          </Stack>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
