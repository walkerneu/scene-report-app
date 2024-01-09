import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Button, Select, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function SearchPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch({ type: "SAGA/GET_GENRES" });
  }, []);
  const genres = useSelector(store => store.genres);
  console.log(genres)
  const [searchQuery, setSearchQuery] = useState("");
  const [genreQuery, setGenreQuery] = useState("");
  const submitSearch = () => {
    dispatch({
      type: "SAGA/GET_SEARCH",
      payload: {
        query: searchQuery,
        genre: genreQuery}
    });
    history.push("/searchResults");
  };
  const searchAll = () => {
    dispatch({
      type: "SAGA/GET_ALL_EVENTS"
    });
    history.push("/searchResults");
  };
  return (
    <>
      <div className="search-container">
        <p>
          <Button
            variant="contained"
            color="secondary"
            onClick={searchAll}
          >
            View All Events
          </Button>
        </p>
        <div className="search-box">
          <Typography gutterBottom variant="overline" display="block" mt={3}>
            Search for Events by keyword:
          </Typography>
          <TextField
            label="Search by Title"
            type="search"
            onChange={(event) => setSearchQuery(event.target.value)}
            value={searchQuery}
          />
        </div>
        <div className="search-box">
          <Typography gutterBottom variant="overline" display="block">
            Search By Genre:
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
          <p>
          <Button
            variant="contained"
            color="secondary"
            onClick={submitSearch}
          >
            SEARCH
          </Button>
          </p>
        </div>
      </div>
    </>
  );
}

export default SearchPage;