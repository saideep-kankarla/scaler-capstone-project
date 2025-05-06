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
        const response = await axios.get(`${apiBaseUrl}/api/albums/getAll`);
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
          <b>Top Albums</b>
        </Typography>
        <div>
          <Stack
            direction="row"
            spacing={5}
            useFlexGap
            sx={{ flexWrap: 'wrap' }}
          >
            {data.map((row) => (
              <Link key={row._id} to={'/album/' + row._id}>
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
                        <b>{row.name}</b> <br /> Composer &bull; {row.composer}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Link>
            ))}
          </Stack>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
