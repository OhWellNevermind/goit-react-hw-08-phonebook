import propTypes from 'prop-types';
import { TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { change } from 'redux/filter/slice';

export const SearchBar = () => {
  const dispatch = useDispatch();

  const onSearch = value => {
    dispatch(change(value));
  };
  return (
    <div>
      <label>
        <TextField
          variant="standard"
          label="Search by name"
          onChange={evt => {
            onSearch(evt.target.value);
          }}
          type="text"
        />
      </label>
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: propTypes.func,
};
