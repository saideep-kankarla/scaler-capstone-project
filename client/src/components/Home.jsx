import React from 'react';
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

function Home() {
  return (
    <div style={{ padding: '20px', maxWidth: '80%', margin: '0 auto' }}>
      <div>
        <Typography gutterBottom variant="h4">
          <b>Albums for you</b>
        </Typography>
        <div>
          <Stack
            direction="row"
            spacing={5}
            useFlexGap
            sx={{ flexWrap: 'wrap' }}
          >
            <Card className="albumCardCss">
              <CardActionArea>
                <CardMedia sx={{ height: 264 }} image={devara} title="Devara" />
                <CardContent>
                  <Typography gutterBottom variant="subtitle1">
                    <b>Devara</b> <br /> Composer - Anirudh
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card className="albumCardCss">
              <CardMedia sx={{ height: 264 }} image={animal} title="Animal" />
              <CardContent>
                <Typography gutterBottom variant="subtitle1">
                  <b>Animal</b> <br /> Composer - Harshavardhan
                </Typography>
              </CardContent>
            </Card>
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
    </div>
  );
}

export default Home;
