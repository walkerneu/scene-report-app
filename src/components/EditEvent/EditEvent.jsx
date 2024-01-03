import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, CardActions } from "@mui/material";
import { useHistory, useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

function EditPage() {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ 
        type: "SAGA/GET_CURRENT_EVENT",
        payload: id
    });
  }, []);
  const currentEvent = useSelector((store) => store.currentEvent);
  const [eventInput, setEventInput] = useState({
    title: currentEvent.title,
    description: currentEvent.description,
    event_photo_url: currentEvent.event_photo_url,
    event_time: currentEvent.event_time,
    venue: currentEvent.venue,
    location: currentEvent.location,
  });
  const handleMovieSubmit = (event, num) => {
    if (num === 1) {
      setMovieInput({ ...movieInput, title: event.target.value });
    } else {
      setMovieInput({ ...movieInput, description: event.target.value });
    }
  };
  const cancelSubmission = () => {
    setMovieInput({
      title: currentMovie.title,
      description: currentMovie.description,
    });
    history.goBack();
  };
  const updateMovie = () => {
    dispatch({
      type: "SAGA/UPDATE_EVENT",
      payload: { id: id, data: movieInput },
    });
    history.push(`/description/${id}`);
  };
  return (
    <Card
      sx={{ maxWidth: 600, height: 600 }}
      data-testid="movieDetails"
      className="description-box"
    >
      <Typography gutterBottom variant="h4" component="div" mt={5}>
        Edit {currentMovie.title}!
      </Typography>
      <p>
        <Typography gutterBottom variant="overline" display="block">
          Edit Movie Title:
        </Typography>
        <TextField
          id="filled-multiline-flexible"
          label="Movie Title"
          placeholder="Movie Title"
          multiline
          maxRows={4}
          variant="filled"
          value={movieInput.title}
          onChange={() => handleMovieSubmit(event, 1)}
        />
      </p>
      <p>
        <Typography gutterBottom variant="overline" display="block">
          Edit Movie Description:
        </Typography>
        <TextField
          id="filled-multiline-static"
          label="Movie Description"
          multiline
          rows={6}
          variant="filled"
          value={movieInput.description}
          onChange={() => handleMovieSubmit(event, 2)}
        />
      </p>
      <CardActions>
        <Button variant="contained" color="success" onClick={updateMovie}>
          Submit
        </Button>
        <Button variant="outlined" color="error" onClick={cancelSubmission}>
          Cancel
        </Button>
      </CardActions>
    </Card>
  );
}

export default EditPage;