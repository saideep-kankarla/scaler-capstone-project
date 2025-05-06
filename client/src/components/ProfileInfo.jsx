import { Button, Divider, Typography } from '@mui/material';
import { useAuth } from '../hooks/AuthProvider';
import { useNavigate } from 'react-router-dom';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

const ProfileInfo = () => {
  // check for logged in user for protected routes
  const navigate = useNavigate();
  const auth = useAuth();
  if (auth?.user === null) {
    navigate('/login');
  }

  return (
    <div>
      <Typography color="textPrimary" gutterBottom variant="h6">
        Profile Info Of {auth?.user?.name}
      </Typography>
      <Divider />
      <Typography gutterBottom variant="subtitle1">
        <p>Full Name : {auth?.user?.name}</p>
        <p>Primary E-mail : {auth?.user?.email}</p>
        <p>Contact Number : {auth?.user?.phone}</p>
        <p>Member Since : {auth?.user?.createdAt}</p>
        <p>
          Premium Membership :
          {String(auth?.user?.premiumSubscribed).toLocaleUpperCase()}
          <br />
          <br />
          {!auth?.user?.premiumSubscribed ? (
            <Button
              variant="contained"
              color="success"
              size="large"
              endIcon={<WorkspacePremiumIcon />}
            >
              Get Premium Membership
            </Button>
          ) : (
            ''
          )}
        </p>
      </Typography>
    </div>
  );
};

export default ProfileInfo;
