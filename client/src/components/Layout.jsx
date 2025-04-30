import { Fragment } from 'react';
import { Box, Grid } from '@mui/material';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import MainArea from './MainArea.jsx';

export default function Layout() {
  return (
    <Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container>
          <Grid size={12}>
            <Header />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container>
          <Grid size={12}>
            <MainArea />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container>
          <Grid size={12}>
            <Footer />
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
}
