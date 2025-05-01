import { Fragment } from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Stack,
} from '@mui/material';

import devara from '../assets/thumbs/devara1.jpg';
import animal from '../assets/thumbs/animal1.jpg';
import hanuman from '../assets/thumbs/hanuman.jpg';
import og from '../assets/thumbs/og.jpg';
import kgf from '../assets/thumbs/kgf1.jpg';
import salaar from '../assets/thumbs/salaar.jpg';
import kick from '../assets/thumbs/kick.jpg';
import { Link } from 'react-router-dom';

function Home() {
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
            <Link to="/album/1">
              <Card className="albumCardCss">
                <CardActionArea>
                  <CardMedia
                    component="img"
                    sx={{ height: 264 }}
                    image={devara}
                    alt="Devara"
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="subtitle1"
                      component="div"
                    >
                      <b>Devara</b> <br /> Composer &bull; Anirudh
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
            <Link to="/album/2">
              <Card className="albumCardCss">
                <CardMedia sx={{ height: 264 }} image={animal} title="Animal" />
                <CardContent>
                  <Typography gutterBottom variant="subtitle1">
                    <b>Animal</b> <br /> Composer - Harshavardhan
                  </Typography>
                </CardContent>
              </Card>
            </Link>
            <Card className="albumCardCss">
              <CardMedia sx={{ height: 264 }} image={hanuman} title="Hanuman" />
              <CardContent>
                <Typography gutterBottom variant="subtitle1" component="div">
                  <b>Hanuman</b> <br /> Composer - Harshavardhan
                </Typography>
              </CardContent>
            </Card>
            <Card className="albumCardCss">
              <CardMedia sx={{ height: 264 }} image={salaar} title="Salaar" />
              <CardContent>
                <Typography gutterBottom variant="subtitle1" component="div">
                  <b>Salaar</b> <br /> Composer - Ravi Basur
                </Typography>
              </CardContent>
            </Card>
            <Card className="albumCardCss">
              <CardMedia sx={{ height: 264 }} image={og} title="OG" />
              <CardContent>
                <Typography gutterBottom variant="subtitle1" component="div">
                  <b>OG</b> <br /> Composer - Thaman
                </Typography>
              </CardContent>
            </Card>
            <Card className="albumCardCss">
              <CardMedia sx={{ height: 264 }} image={kick} title="Kick" />
              <CardContent>
                <Typography gutterBottom variant="subtitle1" component="div">
                  <b>Kick</b> <br /> Composer - Thaman
                </Typography>
              </CardContent>
            </Card>
            <Card className="albumCardCss">
              <CardMedia sx={{ height: 264 }} image={kgf} title="KGF" />
              <CardContent>
                <Typography gutterBottom variant="subtitle1" component="div">
                  <b>KGF</b> <br /> Composer - Ravi Basur
                </Typography>
              </CardContent>
            </Card>
          </Stack>
        </div>
      </div>
    </Fragment>
  );
}

export default Home;
