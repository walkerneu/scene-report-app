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
      }, [id])
    const user = useSelector((store) => store.user);
    const event = useSelector(store => store.currentEvent);
    const genres = useSelector(store => store.currentGenres);
    const userEvents = useSelector(store => store.userEvents);
    const attendees = useSelector(store => store.eventAttendees)
    let eventIdArray = [];
      for (let userEvent of userEvents) {
        eventIdArray.push(userEvent.event_id);
      }
    const isAttending = eventIdArray.includes(Number(id));
    const goBack = () => {
        history.goBack();
      };
    const attend = () => {
        dispatch({
            type: "SAGA/ATTEND_EVENT",
            payload: event.id
        })
        history.replace(`/event/${id}`)
    }
    const goToEdit = () => {
        history.push(`/event/edit/${id}`);
      };
      const goToAttendance = () => {
        history.push(`/attendance`);
      };
    const deleteEvent = () => {
        dispatch({
            type: 'SAGA/DELETE_EVENT',
            payload: event.id
        })
        history.push('/');
    }
    const attendanceDisplay = () => {
        if (attendees.length > 1){
            return (
                <Typography 
                    variant="body2"
                    onClick={goToAttendance}>
                    There are {attendees.length} people attending this event!
                </Typography>
            )
        }
        else if (attendees.length === 1){
            return (
                <Typography 
                    variant="body2"
                    onClick={goToAttendance}>
                    There is 1 person attending this event!
                </Typography>
            )
        }
        else {
            return (
                <Typography variant="body2">
                    There are no people attending this event!
                </Typography>
            )
        }
    }
    console.log("We got attendees:", attendees)
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
        {attendanceDisplay()}
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
        { user.id === event.creator_id ?
        <>
        <Button size="small" color="primary" onClick={goToEdit}>
          EDIT
        </Button>
        <Button size="small" color="primary" onClick={deleteEvent}>
          DELETE
        </Button>
        </>
        :
        ""
        }
      </CardActions>
    </Card>
        </div>
    )
}

export default EventPage;