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
  const currentQuery = useSelector(store => store.currentQuery)
  const [searchQuery, setSearchQuery] = useState(currentQuery.query);
  const [genreQuery, setGenreQuery] = useState(Number(currentQuery.genre));
  const [timeQuery, setTimeQuery] = useState(null);
  useEffect(() => {
    dispatch({ type: "SAGA/GET_GENRES" });
    setTimeQuery(currentQuery.time);
  }, []);
  const genres = useSelector(store => store.genres);
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
  console.log("current query:", currentQuery)
    return (
        <div className="filter-bar">
            <div className="filter-input">
            <Typography gutterBottom variant="overline" display="block" mt={3}>
            Filter by keyword:
          </Typography>
          <TextField
            label="Enter Text"
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
            <MenuItem>-</MenuItem>
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
        label="Click calendar to select"
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