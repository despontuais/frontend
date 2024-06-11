// src/pages/button.tsx
import React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import AlarmIcon from '@mui/icons-material/Alarm';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import LoadingButton from '@mui/lab/LoadingButton';

const ButtonPage = () => {
  const handleButtonClick = () => {
    alert('Button clicked');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Button Variants</h1>
      <Button variant="text" className="mr-2 mb-2">Text</Button>
      <Button variant="contained" className="mr-2 mb-2">Contained</Button>
      <Button variant="outlined" className="mr-2 mb-2">Outlined</Button>

      <h2 className="text-xl font-semibold mt-4 mb-2">Text Button</h2>
      <Button>Primary</Button>
      <Button disabled className="ml-2">Disabled</Button>
      <Button href="#text-buttons" className="ml-2">Link</Button>

      <h2 className="text-xl font-semibold mt-4 mb-2">Contained Button</h2>
      <Button variant="contained">Contained</Button>
      <Button variant="contained" disabled className="ml-2">Disabled</Button>
      <Button variant="contained" href="#contained-buttons" className="ml-2">Link</Button>
      <Button variant="contained" disableElevation className="ml-2">Disable elevation</Button>

      <h2 className="text-xl font-semibold mt-4 mb-2">Outlined Button</h2>
      <Button variant="outlined">Primary</Button>
      <Button variant="outlined" disabled className="ml-2">Disabled</Button>
      <Button variant="outlined" href="#outlined-buttons" className="ml-2">Link</Button>

      <h2 className="text-xl font-semibold mt-4 mb-2">Handling Clicks</h2>
      <Button onClick={handleButtonClick}>Click me</Button>

      <h2 className="text-xl font-semibold mt-4 mb-2">Color Variants</h2>
      <Button color="secondary">Secondary</Button>
      <Button variant="contained" color="success" className="ml-2">Success</Button>
      <Button variant="outlined" color="error" className="ml-2">Error</Button>

      <h2 className="text-xl font-semibold mt-4 mb-2">Buttons with Icons</h2>
      <Button variant="outlined" startIcon={<DeleteIcon />}>
        Delete
      </Button>
      <Button variant="contained" endIcon={<SendIcon />} className="ml-2">
        Send
      </Button>

      <h2 className="text-xl font-semibold mt-4 mb-2">Icon Button</h2>
      <IconButton aria-label="delete">
        <DeleteIcon />
      </IconButton>
      <IconButton aria-label="delete" disabled color="primary" className="ml-2">
        <DeleteIcon />
      </IconButton>
      <IconButton color="secondary" aria-label="add an alarm" className="ml-2">
        <AlarmIcon />
      </IconButton>
      <IconButton color="primary" aria-label="add to shopping cart" className="ml-2">
        <AddShoppingCartIcon />
      </IconButton>

      <h2 className="text-xl font-semibold mt-4 mb-2">Loading Button</h2>
      <LoadingButton loading variant="outlined">
        Submit
      </LoadingButton>
      <LoadingButton loading loadingIndicator="Loading…" variant="outlined" className="ml-2">
        Fetch data
      </LoadingButton>
      <LoadingButton
        loading
        loadingPosition="start"
        startIcon={<SendIcon />}
        variant="outlined"
        className="ml-2"
      >
        Save
      </LoadingButton>
    </div>
  );
};

export default ButtonPage;
