import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, CardActions } from '@mui/material';
import { useHistory, useParams } from "react-router-dom";
import { Select } from "@mui/material";
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

function EditEvent() {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ 
        type: "SAGA/GET_CURRENT_EVENT",
        payload: id
     });
     dispatch({ 
        type: "SAGA/GET_GENRES",
     });
  }, [id]);

  const currentEvent = useSelector(store => store.currentEvent)
  const currentGenres = useSelector(store => store.currentGenres)
  const genres = useSelector((store) => store.genres);

  const [eventName, setEventName] = useState(currentEvent.title);
  const [selectedGenre, setSelectedGenre] = useState(currentGenres);
  const [eventBio, setEventBio] = useState(currentEvent.description);
  const [eventTime, setEventTime] = useState(currentEvent.event_time);
  const [venue, setVenue] = useState(currentEvent.venue);
  const [cityState, setCityState] = useState(currentEvent.location);
  const [eventPhoto, setEventPhoto] = useState('');
  const editForm = new FormData ();

  const cancelSubmission = () => {
    setEventName('');
    setEventBio('');
    setEventTime(null);
    setVenue('');
    setCityState('');
    setSelectedGenre([]);
    history.goBack();
  };

  const editEvent = () => {
    if(eventPhoto === ''){
        editForm.append("event_photo_url", currentEvent.event_photo_url)
    }
    else {
        editForm.append("image", eventPhoto)
    }
    editForm.append('title', eventName)
    editForm.append('description', eventBio)
    editForm.append('event_time', eventTime)
    editForm.append('venue', venue)
    editForm.append('location', cityState)
    dispatch({
    type: 'SAGA/EDIT_EVENT',
    payload: { 
        id,
        data: editForm
    }});
    setEventName('');
    setEventBio('');
    setEventTime(null);
    setVenue('');
    setCityState('');
    setSelectedGenre([]);
    history.push(`/event/${id}`)
  };
  return (
    <Card 
        sx={{ maxWidth: 800}} 
        data-testid="movieDetails"
        className="description-box">
      <Typography gutterBottom variant="h4" component="div" mt={5}>
        Edit Your Event:
      </Typography>
        <p>
      <Typography gutterBottom variant="overline" display="block">
        Event Title:
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
        Upload New Event Photo:
      </Typography>
      <TextField
            type="file" 
            className="form-control-file" 
            name="uploaded_file"
            onChange={(evt) => setEventPhoto(evt.target.files[0])} />
      </p>
      <p>
      <Typography gutterBottom variant="overline" display="block">
        Event Time:
      </Typography>
      <DateTimePicker
        label="Event Time"
        value={dayjs(eventTime)}
        onChange={setEventTime}
      />
      </p>
      <p>
      <Typography gutterBottom variant="overline" display="block">
        Event Description:
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
        Event Venue:
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
        City and State:
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
        value={selectedGenre.map((genre) => {
            let array = []
            array.push(genre.id)
            return array
        })}
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
      <Button variant="contained" color="success" onClick={editEvent}>
        Submit
      </Button>
      <Button variant="outlined" color="error" onClick={cancelSubmission}>
        Cancel
      </Button>
      </CardActions>
    </Card>
  );
}

export default EditEvent;