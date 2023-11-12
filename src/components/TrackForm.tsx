import React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { Box, InputLabel } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

const categories = ['circuit', 'drift', 'touge', 'kart', 'rally', 'street'];
const trackTypes = ['loop', 'street', 'a to b'];

export interface TrackFormProps {
  formValues: {
    name: string;
    location: string;
    category: string;
    link: string;
    credit: string;
    version: Number;
    type: string;
    description: string;
    img: File | null;
  };
  handleTextFieldChange: React.ChangeEventHandler<HTMLInputElement>;
  handleSelectChange: (event: SelectChangeEvent) => void;
  handleUploadChange: React.ChangeEventHandler<HTMLInputElement>;
}

function TrackForm(props: TrackFormProps) {
  const {
    formValues,
    handleTextFieldChange,
    handleSelectChange,
    handleUploadChange,
  } = props;

  return (
    <Grid container spacing={3} alignItems="center">
      <Grid xs={12} md={6} item>
        <TextField
          fullWidth
          id="name-input"
          name="name"
          label="Track Name"
          type="text"
          value={formValues.name}
          onChange={handleTextFieldChange}
          required
        />
      </Grid>
      <Grid xs={12} md={6} item>
        <TextField
          fullWidth
          id="location-input"
          name="location"
          label="Location"
          type="text"
          value={formValues.location}
          onChange={handleTextFieldChange}
        />
      </Grid>
      <Grid xs={12} md={4} item>
        <TextField
          fullWidth
          id="credit-input"
          name="credit"
          label="Credit/Author"
          type="text"
          value={formValues.credit}
          onChange={handleTextFieldChange}
          required
        />
      </Grid>
      <Grid xs={12} md={4} item>
        <TextField
          fullWidth
          id="link-input"
          name="link"
          label="Download Link"
          type="text"
          value={formValues.link}
          onChange={handleTextFieldChange}
          required
        />
      </Grid>
      <Grid xs={12} md={4} item>
        <TextField
          fullWidth
          id="version-input"
          name="version"
          label="Version"
          type="number"
          value={formValues.version}
          onChange={handleTextFieldChange}
        />
      </Grid>
      <Grid xs={12} item>
        <TextField
          fullWidth
          id="description-input"
          name="description"
          label="Description"
          type="text"
          value={formValues.description}
          onChange={handleTextFieldChange}
          multiline
          minRows={2}
          maxRows={5}
          required
        />
      </Grid>
      <Grid xs={12} sm={6} item>
        <Box
          sx={{
            display: 'flex',
            justifyContent: { xs: 'center', sm: 'end' },
          }}
        >
          <FormControl required sx={{ minWidth: '130px' }}>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category-select"
              name="category"
              value={formValues.category}
              onChange={handleSelectChange}
              label="category"
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Grid>

      <Grid xs={12} sm={6} item>
        <Box
          sx={{
            display: 'flex',
            justifyContent: { xs: 'center', sm: 'start' },
          }}
        >
          <FormControl required sx={{ minWidth: '130px' }}>
            <InputLabel id="type-label">Type</InputLabel>
            <Select
              labelId="type-label"
              id="type-select"
              name="type"
              value={formValues.type}
              onChange={handleSelectChange}
              label="type"
            >
              {trackTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Grid>

      <Grid xs={12} item>
        <Box
          sx={{
            width: '195px',
          }}
        >
          <FormLabel sx={{ mb: 1 }} component="div">
            Select Track Image:
          </FormLabel>
          <input
            onChange={handleUploadChange}
            type="file"
            name="image"
            accept="image/*"
            required
          />
        </Box>
      </Grid>
      <Grid component="div" xs={12} item display="flex" justifyContent="center">
        <Button size="large" variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Grid>
    </Grid>
  );
}

export default TrackForm;
