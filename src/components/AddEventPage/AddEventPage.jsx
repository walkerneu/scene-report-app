import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, CardActions } from '@mui/material';
import { useHistory } from "react-router-dom";
import { Select } from "@mui/material";
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { DateTimePicker } from '@mui/x-date-pickers';

function AddEventPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "SAGA/GET_GENRES" });
  }, []);
  const genres = useSelector((store) => store.genres);
  const [eventName, setEventName] = useState('');
  const [imgUpload, setImgUpload] = useState('');
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [eventBio, setEventBio] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [venue, setVenue] = useState('');
  const [cityState, setCityState] = useState('');
  const eventForm = new FormData ();
  const cancelSubmission = () => {
    setImgUpload('');
    setEventName('');
    setEventBio('');
    setEventTime(null);
    setVenue('');
    setCityState('');
    setSelectedGenre([]);
    history.goBack();
  };
  const addEvent = async () => {
    eventForm.append("image", imgUpload);
    eventForm.append("eventName", eventName);
    eventForm.append("description", eventBio);
    eventForm.append("event_time", eventTime);
    eventForm.append("venue", venue);
    eventForm.append("location", cityState);
    eventForm.append("genre_id", selectedGenre);
    dispatch({
    type: 'SAGA/ADD_EVENT',
    payload: { eventForm: eventForm,
                history: history
    }});
    setImgUpload('');
    setEventName('');
    setEventBio('');
    setEventTime('');
    setVenue('');
    setCityState('');
    setSelectedGenre([]);
  };
  console.log("event time:", eventTime)
  return (
    <Card 
        sx={{ maxWidth: 800}} 
        data-testid="movieDetails"
        className="description-box">
      <Typography gutterBottom variant="h4" component="div" mt={5}>
        Add A New Event!
      </Typography>
        <p>
      <Typography gutterBottom variant="overline" display="block">
        Enter Event Title:
      </Typography>
      <TextField
        id="filled-multiline-flexible"
        label="Event Title"
        placeholder="Event Title"
        multiline
        maxRows={2}
        variant="filled"
        value={eventName}
        onChange={(event) => setEventName(event.target.value)}
      />
      </p>
      <p>
      <Typography gutterBottom variant="overline" display="block">
        Upload Event Image:
      </Typography>
      <TextField
            type="file" 
            className="form-control-file" 
            name="uploaded_file"
            onChange={(evt) => setImgUpload(evt.target.files[0])} />
      </p>
      <p>
      <Typography gutterBottom variant="overline" display="block">
        Enter Event Time:
      </Typography>
      <DateTimePicker
        label="Event Time"
        value={eventTime}
        onChange={setEventTime}
      />
      </p>
      <p>
      <Typography gutterBottom variant="overline" display="block">
        Enter Event Description:
      </Typography>
      <TextField
        label="Event Description"
        multiline
        rows={5}
        variant="filled"
        value={eventBio}
        onChange={(event) => setEventBio(event.target.value)}
      />
      </p>
      <p>
      <Typography gutterBottom variant="overline" display="block">
        Enter Event Venue:
      </Typography>
      <TextField
        label="Event Venue"
        multiline
        rows={1}
        variant="filled"
        value={venue}
        onChange={(event) => setVenue(event.target.value)}
      />
      </p>
      <p>
      <Typography gutterBottom variant="overline" display="block">
        Enter City and State:
      </Typography>
      <TextField
        label="Event City/State"
        multiline
        rows={1}
        variant="filled"
        value={cityState}
        onChange={(event) => setCityState(event.target.value)}
      />
      </p>
      <p>
      <Typography gutterBottom variant="overline" display="block">
        Select All Relevant Genres:
      </Typography>
      <Select
        multiple
        helperText="Please select event genres"
        value={selectedGenre}
        label="genre"
        onChange={(event) => setSelectedGenre(event.target.value)}
      >
        {genres.map((genre) => (
          <MenuItem key={genre.id} value={genre.id}>
            {genre.genre_name}
          </MenuItem>
        ))}
      </Select>
      </p>
      <CardActions>
      <Button variant="contained" color="success" onClick={addEvent}>
        Submit
      </Button>
      <Button variant="outlined" color="error" onClick={cancelSubmission}>
        Cancel
      </Button>
      </CardActions>
    </Card>
  );
}

export default AddEventPage;