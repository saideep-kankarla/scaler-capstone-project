import {Fragment} from 'react';
import {CssBaseline, Container} from '@mui/material';
import LoginForm from './components/LoginForm.jsx';

import './styles/App.scss';
 

export default function App() {
  return (
    <Fragment>
      <CssBaseline>
        <Container component="main" maxWidth="false">
          <LoginForm />
        </Container>
      </CssBaseline>
    </Fragment>
  );
}
