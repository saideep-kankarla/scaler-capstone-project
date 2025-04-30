import React from 'react';
import { Card, CardContent, CardMedia, Typography, Stack } from '@mui/material';
import devara from '../assets/thumbs/devara1.jpg';
import animal from '../assets/thumbs/animal1.jpg';
import hanuman from '../assets/thumbs/hanuman.jpg';
import og from '../assets/thumbs/og.jpg';
import kgf from '../assets/thumbs/kgf1.jpg';
import salaar from '../assets/thumbs/salaar.jpg';
import kick from '../assets/thumbs/kick.jpg';

function Home() {
  return (
    <div style={{ padding: '20px' }}>
      <div>
        <h2>Albums for you</h2>
        <div>
          <Stack
            direction="row"
            spacing={2}
            useFlexGap
            sx={{ flexWrap: 'wrap' }}
          >
            <Card className="albumCardCss">
              <CardMedia sx={{ height: 264 }} image={devara} title="Devara" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Devara
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  A village chief's son secretly continues his father's mission
                  to end smuggling, while pretending to be weak and maintaining
                  the illusion that his father is still alive.
                </Typography>
              </CardContent>
            </Card>
            <Card className="albumCardCss">
              <CardMedia sx={{ height: 264 }} image={animal} title="Animal" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Animal
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  The son of a wealthy, powerful industrialist returns to India
                  and undergoes a remarkable transformation as he becomes
                  consumed by a quest for vengeance against those threatening
                  his father's life.
                </Typography>
              </CardContent>
            </Card>
            <Card className="albumCardCss">
              <CardMedia sx={{ height: 264 }} image={hanuman} title="Hanuman" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Hanuman
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  In the tranquil village of Anjanadri, a petty thief stumbles
                  upon Hanuman-like abilities. With the impending threats, he
                  rises to become the hero they need.
                </Typography>
              </CardContent>
            </Card>
            <Card className="albumCardCss">
              <CardMedia sx={{ height: 264 }} image={salaar} title="Salaar" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Salaar
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Just when the prince of Khansaar is about to rise to the
                  throne, a plan of overthrowing him is exercised and only one
                  man can help him retrieve power.
                </Typography>
              </CardContent>
            </Card>
            <Card className="albumCardCss">
              <CardMedia sx={{ height: 264 }} image={og} title="OG" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  OG
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  OG (also known as They Call Him OG) is an upcoming Indian
                  Telugu-language gangster action thriller film written and
                  directed by Sujeeth and produced by D. V. V. Danayya of DVV
                  Entertainment
                </Typography>
              </CardContent>
            </Card>
            <Card className="albumCardCss">
              <CardMedia sx={{ height: 264 }} image={kick} title="Kick" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Kick
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  A village chief's son secretly continues his father's mission
                  to end smuggling, while pretending to be weak and maintaining
                  the illusion that his father is still alive.
                </Typography>
              </CardContent>
            </Card>
            <Card className="albumCardCss">
              <CardMedia sx={{ height: 264 }} image={kgf} title="KGF" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  KGF
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  A village chief's son secretly continues his father's mission
                  to end smuggling, while pretending to be weak and maintaining
                  the illusion that his father is still alive.
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
