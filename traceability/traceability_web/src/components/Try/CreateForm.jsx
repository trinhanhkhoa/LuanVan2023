import * as React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const filter = createFilterOptions();

export default function FreeSoloCreateOptionDialog() {
  const [value, setValue] = React.useState(null);
  const [open, toggleOpen] = React.useState(false);
  const [name, setName] = React.useState("");

  const handleClose = () => {
    setDialogValue({name: ""});
    toggleOpen(false);
  };

  const [dialogValue, setDialogValue] = React.useState({name: ""});

  const handleSubmit = (event) => {
    event.preventDefault();
    setValue({name: dialogValue.name});
    handleClose();
  };

  return (
    <React.Fragment>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              toggleOpen(true);
              setDialogValue({name: (newValue)});
            });
          } else if (newValue && newValue.inputValue) {
            toggleOpen(true);
            setDialogValue({name: (newValue.inputValue)});
          } else {
            setValue(newValue);
          }
          console.log(newValue);
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== '') {
            filtered.push({
              inputValue: params.inputValue,
              name: `Add "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        id="free-solo-dialog-demo"
        options={top100Films}
        getOptionLabel={(option) => {
          // e.g value selected with enter, right from the input
          if (typeof option === 'string') {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.name;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(props, option) => <li {...props}>{option.name}</li>}
        sx={{ width: 300 }}
        freeSolo
        renderInput={(params) => <TextField {...params} label="Free solo dialog" />}
      />
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add a new film</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Did you miss any film in our list? Please, add it!
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={dialogValue.name}
              onChange={(event) =>
                setDialogValue({
                  ...dialogValue,
                  name :(event.target.value)
                })
              }
              label="title"
              type="text"
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}

const top100Films = [
  { name:  'The Shawshank Redemption'},
  { name:  'The Godfather'},
  { name:  'The Godfather: Part II'},
  { name:  'The Dark Knight'},
  { name:  '12 Angry Men'},
  { name:  "Schindler's List"},
  { name:  'Pulp Fiction'},
  { name: 'The Lord of the Rings: The Return of the King' },
  { name:  'The Good, the Bad and the Ugly'},
  { name:  'Fight Club'},
  { name: 'The Lord of the Rings: The Fellowship of the Ring' }
];