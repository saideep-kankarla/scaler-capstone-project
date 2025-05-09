import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Button,
  Paper,
  Snackbar,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthProvider';

import axios from '../utils/axios-config';

export default function UsersTable() {
  // check for logged in user for protected routes
  const navigate = useNavigate();
  const auth = useAuth();
  if (auth?.user === null) {
    navigate('/login');
  }

  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const apiBaseUrl =
    import.meta.env.VITE_NODE_API_URL ||
    import.meta.env.VITE_NODE_API_URL_LOCAL;

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/api/users/allUsers`);
        setData(response.data.users);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // Handle checkbox toggle
  const handleCheckboxChange = (id) => {
    setSelected((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((item) => item !== id)
        : [...prevSelected, id],
    );
  };

  // Handle delete action
  const handleDelete = async () => {
    try {
      // Simulate API call for deletion
      await Promise.all(
        selected.map((id) =>
          axios.delete(`${apiBaseUrl}/api/users/deleteUser/${id}`),
        ),
      );
      setData((prevData) =>
        prevData.filter((item) => !selected.includes(item._id)),
      );
      setSelected([]);
      setSnackbar({
        open: true,
        message: 'Records deleted successfully!',
        severity: 'success',
      });
    } catch (error) {
      console.error('Error deleting records:', error);
      setSnackbar({
        open: true,
        message: 'Failed to delete records.',
        severity: 'error',
      });
    }
  };

  // Close snackbar
  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: '', severity: 'success' });
  };

  return (
    <Paper>
      <TableContainer className="tableContainer">
        <Table>
          <TableHead>
            <TableRow className="">
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selected.length > 0 && selected.length < data.length
                  }
                  checked={data.length > 0 && selected.length === data.length}
                  onChange={(e) =>
                    setSelected(
                      e.target.checked ? data.map((item) => item._id) : [],
                    )
                  }
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>E-mail</TableCell>
              <TableCell>Is Premium Member</TableCell>
              <TableCell>Member Since</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row._id}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selected.includes(row._id)}
                    onChange={() => handleCheckboxChange(row._id)}
                  />
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.premiumSubscribed ? 'Yes' : 'No'}</TableCell>
                <TableCell>{row.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleDelete}
        disabled={selected.length === 0}
        style={{ margin: '16px' }}
      >
        Delete Selected
      </Button>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
}
