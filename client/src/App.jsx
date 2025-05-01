import { Fragment } from 'react';
import { CssBaseline, Container } from '@mui/material';
import Layout from './components/Layout.jsx';

import './styles/App.scss';

export default function App() {
  return (
    <Fragment>
      <Container component="main" maxWidth="false">
        <Layout />
      </Container>
    </Fragment>
  );
}
