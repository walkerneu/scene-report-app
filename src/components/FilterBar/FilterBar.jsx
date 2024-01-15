import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Button, Select, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { DatePicker } from '@mui/x-date-pickers';
import Card from '@mui/material/Card';

function FilterBar(){
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch({ type: "SAGA/GET_GENRES" });
  }, []);
  const currentQuery = useSelector(store => store.currentQuery)
  const genres = useSelector(store => store.genres);
  const [searchQuery, setSearchQuery] = useState(currentQuery.query);
  const [genreQuery, setGenreQuery] = useState(currentQuery.genre);
  const [timeQuery, setTimeQuery] = useState(currentQuery.time);
  if (timeQuery === ''){
    setTimeQuery(null);
  }
  const submitSearch = () => {
    let time = ''
    if (timeQuery !== null){
        time = new Date(timeQuery).toLocaleDateString()
    } 
    dispatch({
      type: "SAGA/GET_SEARCH",
      payload: {
        query: searchQuery,
        genre: genreQuery,
        time: time}
    });
  };
    return (
        <div className="filter-bar">
            <div className="filter-input">
            <Typography gutterBottom variant="overline" display="block" mt={3}>
            Filter by keyword:
          </Typography>
          <TextField
            label="Search by Title"
            type="search"
            onChange={(event) => setSearchQuery(event.target.value)}
            value={searchQuery}
          />
          </div>
          <div className="filter-input">
          <Typography gutterBottom variant="overline" display="block">
            Filter By Genre:
          </Typography>
          <Select
            helperText="Please select a genre"
            value={genreQuery}
            label="genre"
            onChange={(event) => setGenreQuery(event.target.value)}
          >
            {genres.map((genre) => (
              <MenuItem key={genre.id} value={genre.id}>
                {genre.genre_name}
              </MenuItem>
            ))}
          </Select>
          </div>
          <div className="filter-input">
      <Typography gutterBottom variant="overline" display="block">
        Filter by Date:
      </Typography>
      <DatePicker
        label="Event Time"
        value={timeQuery}
        onChange={setTimeQuery}
      />
      </div>
      <div className="filter-button">
          <Button
            variant="contained"
            color="secondary"
            onClick={submitSearch}
            sx={{mt: 3}}
          >
            FILTER
          </Button>
          </div>
        </div>
    )
}

export default FilterBar;