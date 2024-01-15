import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Button, Select, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { DatePicker } from '@mui/x-date-pickers';
import Card from '@mui/material/Card';

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
  const [timeQuery, setTimeQuery] = useState(null);
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
    history.push("/searchResults");
  };
  const searchAll = () => {
    dispatch({
      type: "SAGA/GET_ALL_EVENTS"
    });
    history.push("/searchResults");
  };
  console.log("Time Query:", timeQuery)
  return (
    <>
      <Card 
        sx={{ 
            maxWidth: 800,
            backgroundColor: "#2e2e2e", 
            color: "antiquewhite", 
            outline: "#e6855f solid 10px",
            ml: 10,
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center'
            }}>
          <Typography gutterBottom variant="h4" component="div" mt={5} fontFamily={"helsinki"}>
            Search for Events!
          </Typography>
          <Typography gutterBottom variant="h7" component="div" fontFamily={"helsinki"}>
            Use any or all criteria, or click "Show All Events" to view all upcoming events
          </Typography>
          <Typography gutterBottom variant="overline" display="block" mt={3}>
            Search by keyword:
          </Typography>
          <TextField
            label="Search by Title"
            type="search"
            onChange={(event) => setSearchQuery(event.target.value)}
            value={searchQuery}
          />
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
      <Typography gutterBottom variant="overline" display="block">
        Search by Date:
      </Typography>
      <DatePicker
        label="Event Time"
        value={timeQuery}
        onChange={setTimeQuery}
      />
      </p>
          <p>
          <Button
            variant="contained"
            color="secondary"
            onClick={submitSearch}
            sx={{mt: 3}}
          >
            SEARCH
          </Button>
          </p>
          <p>
          <Button
            variant="contained"
            color="secondary"
            onClick={searchAll}
            sx={{mt: 6}}
          >
            Show All Events
          </Button>
        </p>
      </Card>
    </>
  );
}

export default SearchPage;