import { Fragment } from 'react';
import { CssBaseline, Container } from '@mui/material';
import Layout from './components/Layout.jsx';
import AuthProvider from './hooks/AuthProvider.js';

import './styles/App.scss';

export default function App() {
  return (
    <Fragment>
      <CssBaseline>
        <AuthProvider>
          <Container component="main" maxWidth="false">
            <Layout />
          </Container>
        </AuthProvider>
      </CssBaseline>
    </Fragment>
  );
}
