import { Button, Stack, Typography, Paper, Divider } from '@mui/material';
import { useAuth } from '../hooks/AuthProvider';
import { useNavigate } from 'react-router-dom';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
const ProfilePage = () => {
  const navigate = useNavigate();

  const auth = useAuth();

  console.log('sasa', auth?.user);

  if (auth?.user === null) {
    navigate('/login');
  }

  return (
    <>
      {auth && auth?.user ? (
        <div>
          <Stack direction="row">
            <Paper variant="elevation" elevation={24} className="profileBox">
              <Typography color="textPrimary" gutterBottom variant="h5">
                Account Details Of {auth?.user?.name}
              </Typography>
              <Divider />

              <Typography gutterBottom variant="subtitle1">
                <p>Full Name : {auth?.user?.name}</p>
                <p>Primary E-mail : {auth?.user?.email}</p>
                <p>Contact Number : {auth?.user?.phone}</p>
                <p>Member Since : {auth?.user?.createdAt}</p>
                <p>
                  Premium Membership :{' '}
                  {String(auth?.user?.premiumSubscribed).toLocaleUpperCase()}
                  <br />
                  <br />
                  <Button
                    variant="contained"
                    color="success"
                    size="large"
                    endIcon={<WorkspacePremiumIcon />}
                  >
                    Get Premium Membership
                  </Button>
                </p>
              </Typography>
            </Paper>
          </Stack>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default ProfilePage;
