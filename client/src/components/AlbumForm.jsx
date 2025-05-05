import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  TextField,
  InputLabel,
  IconButton,
  Grid,
} from '@mui/material';
import { AddCircleOutline, CloudUpload } from '@mui/icons-material';

export default function AlbumForm() {
  const [fields, setFields] = useState([{ text: '', file: null }]);

  const handleAddField = () => {
    setFields([...fields, { text: '', file: null }]);
  };

  const handleInputChange = (index, event) => {
    const newFields = [...fields];
    if (event.target.type === 'file') {
      newFields[index].file = event.target.files[0];
    } else {
      newFields[index].text = event.target.value;
    }
    setFields(newFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    fields.forEach((field, index) => {
      formData.append(`fields[${index}][text]`, field.text);
      if (field.file) {
        formData.append(`fields[${index}][file]`, field.file);
      }
    });

    try {
      const response = await axios.post(
        'http://localhost:5000/api/upload',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        },
      );
      alert('Form submitted successfully!');
      console.log(response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <h1
        style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}
      >
        Dynamic Form with File Upload
      </h1>
      <form onSubmit={handleSubmit}>
        {fields.map((field, index) => (
          <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="text"
                placeholder="Enter text"
                value={field.text}
                onChange={(e) => handleInputChange(index, e)}
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <input
                type="file"
                id="file-upload"
                style={{ display: 'none' }}
                onChange={(e) => handleInputChange(index, e)}
              />
              <label htmlFor="file-upload">
                <Button
                  variant="contained"
                  component="span"
                  startIcon={<CloudUpload />}
                >
                  Upload File
                </Button>
              </label>
            </Grid>
          </Grid>
        ))}
        <IconButton color="primary" onClick={handleAddField}>
          <AddCircleOutline fontSize="large" />
        </IconButton>
        <Button type="submit" variant="contained" color="success">
          Submit
        </Button>
      </form>
    </Box>
  );
}
