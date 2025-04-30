import {Fragment} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import './styles/App.scss';
 

export default function App() {
  return (
    <Fragment>
      <CssBaseline>
        <Container maxWidth="false">
          <Box sx={{ bgcolor: '#cfe8fc', width:'100%', height: '100vh' }} />
        </Container>
      </CssBaseline>
    </Fragment>
  );
}
