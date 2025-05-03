import { Fragment } from 'react';
import { CssBaseline, Container } from '@mui/material';
import Layout from './components/Layout.jsx';

import './styles/App.scss';

export default function App() {
  return (
    <Fragment>
      <CssBaseline>
        <Container className="mainvContainer" component="main" maxWidth="false">
          <Layout />
        </Container>
      </CssBaseline>
    </Fragment>
  );
}
