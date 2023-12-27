import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActions } from "@mui/material";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function EventPage(){

    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        dispatch({
          type: "SAGA/GET_CURRENT_EVENT",
          payload: id
        })
      }, [])
    const event = useSelector(store => store.currentEvent);
    const genres = useSelector(store => store.currentGenres);
    const userEvents = useSelector(store => store.userEvents);
    const isAttending = userEvents.includes(Number(id));
    const goBack = () => {
        history.goBack();
      };
    const attend = () => {
        dispatch({
            type: "SAGA/ATTEND_EVENT",
            payload: event.id
        })
    }
    const goToEdit = () => {
        history.push(`/event/edit/${id}`);
      };
    console.log("We got the event:", event)
    return (
        <div>
    <Card
      sx={{ maxWidth: 950 }}
      className="description-box"
    >
      <CardMedia
        component="img"
        image={event.event_photo_url}
        alt={event.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h3" component="div">
          {event.title}
        </Typography>
        <Typography variant="h6">
          {event.venue}
        </Typography>
        <Typography variant="h6">
          {event.location}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          {new Date(event.event_time).toLocaleString('en-us')}
        </Typography>
        <Typography variant="body">
          {event.description}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          Genres:
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {genres.map((genre) => (
            <span key={genre.id}> {genre.genre_name} /</span>
          ))}
        </Typography>
      </CardContent>
      <CardActions>
      { isAttending ?
        <Typography variant="body2">
            You are attending this event!
        </Typography>
        :
        <Button
          size="small"
          color="primary"
          onClick={attend}
          data-testid="toList"
        >
          Would you like to attend this event?
        </Button>}
        <Button
          size="small"
          color="primary"
          onClick={goBack}
          data-testid="toList"
        >
          BACK
        </Button>
        <Button size="small" color="primary" onClick={goToEdit}>
          EDIT
        </Button>
      </CardActions>
    </Card>
        </div>
    )
}

export default EventPage;