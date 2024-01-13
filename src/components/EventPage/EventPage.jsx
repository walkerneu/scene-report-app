import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActions } from "@mui/material";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import CommentItem from '../CommentItem/CommentItem';
import TextField from "@mui/material/TextField";

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
    const event = useSelector(store => store.currentEvent);
    useEffect(() => {
        dispatch({
          type: "SAGA/GET_HOST",
          payload: event.creator_id
        })
      }, [event])
    const host = useSelector(store => store.currentHost)
    const user = useSelector((store) => store.user);
    const genres = useSelector(store => store.currentGenres);
    const userEvents = useSelector(store => store.userEvents);
    const attendees = useSelector(store => store.eventAttendees);
    const comments = useSelector(store => store.eventComments)
    const now = new Date ();
    const eventTime = new Date (event.event_time);
    const msPerDay = 24 * 60 * 60 * 1000; 
    const daysUntil = Math.round((eventTime.getTime() - now.getTime()) / msPerDay)
    console.log("Here's the difference:", daysUntil)
    console.log("here's the host:", host)
    let eventIdArray = [];
      for (let userEvent of userEvents) {
        eventIdArray.push(userEvent.id);
      }
    const [attending, setAttending] = useState(eventIdArray.includes(Number(id)))
    const [commentText, setCommentText] = useState('');
    const goBack = () => {
        history.goBack();
      };
    const attend = () => {
        dispatch({
            type: "SAGA/ATTEND_EVENT",
            payload: {
                event: event.id,
                user: user.id}
        })
        setAttending(true);
    }
    const goToEdit = () => {
        history.push(`/event/edit/${id}`);
      };
    const goToAttendance = () => {
        history.push(`/attendance`);
      };
    const goToCreator = () => {
        history.push(`/user/${host.id}`);
      };
    const deleteEvent = () => {
        dispatch({
            type: 'SAGA/DELETE_EVENT',
            payload: event.id
        })
        history.push('/');
    }
    const addComment = () => {
        dispatch({
            type: 'SAGA/ADD_COMMENT',
            payload: {
                event: event.id,
                user: user.id,
                comment: commentText}
        })
        setCommentText('');
    }
    const attendanceDisplay = () => {
        if (attendees.length > 1){
            return (
                <>
                <Typography 
                    variant="body2"
                    fontFamily="helsinki"
                    className="pointer"
                    onClick={goToAttendance}>
                    There are {attendees.length} people attending this event!
                </Typography>
                <Typography variant="body2" className="pointer" fontFamily="helsinki" onClick={goToAttendance}>
                Click here to see the list!
                </Typography>
                </>
            )
        }
        else if (attendees.length === 1){
            return (
                <>
                <Typography 
                    variant="body2"
                    fontFamily="helsinki"
                    className="pointer"
                    onClick={goToAttendance}>
                    There is 1 person attending this event!
                </Typography>
                <Typography variant="body2" className="pointer" fontFamily="helsinki" onClick={goToAttendance}>
                Click here to see the list!
                </Typography>
                </>
            )
        }
        else {
            return (
                <Typography variant="body2" fontFamily="helsinki">
                    There are no people attending this event!
                </Typography>
            )
        }
    }
    console.log("We got comments:", comments)
    return (
        <div>
    <Card
      sx={{ width: 950, fontFamily: "helsinki" }}
      className="description-box"
    >
      <img
        className='event-img'
        src={event.event_photo_url}
        alt={event.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h3" component="div" fontFamily="helsinki">
          {event.title}
        </Typography>
        <Typography variant="h6" fontFamily="helsinki">
          Location:
        </Typography>
        <Typography variant="h6" fontFamily="helsinki">
        {event.venue}, {event.location}
        </Typography>
        <Typography variant="h6" component="div" fontFamily="helsinki">
          {new Date(event.event_time).toLocaleString('en-us')}
          <p>There are {daysUntil} days until this event!</p>
        </Typography>
        <p>
        <Typography variant="body" fontFamily="helsinki" className="pointer" onClick={goToCreator}>
        This event is hosted by: {host.username}
        </Typography>
        </p>
        <Typography variant="body">
          Event Description:
          <p>
          {event.description}
          </p>
        </Typography>
        <Typography variant="h6" component="div" fontFamily="helsinki">
          Genres:
          {genres.map((genre) => (
            <span key={genre.id}> {genre.genre_name} /</span>
          ))}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          
        </Typography>
        {attendanceDisplay()}
      </CardContent>
      <CardActions>
      { attending ?
        <Typography variant="body2" fontFamily="helsinki">
            You are attending this event!
        </Typography>
        :
        <Button
          size="small"
          color="primary"
          onClick={attend}
        >
          Would you like to attend this event?
        </Button>
        }
        <Button
          size="small"
          color="primary"
          onClick={goBack}
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
    <h3>Comments:</h3>
    <Card>
        <Typography gutterBottom variant="overline" display="block">
        Add a Comment:
        </Typography>
        <TextField
            label="Comment"
            multiline
            width={500}
            rows={3}
            variant="filled"
            value={commentText}
            onChange={(event) => setCommentText(event.target.value)}
        />
        <Button size="small" color="primary" onClick={addComment}>
          ADD COMMENT
        </Button>
        {comments && comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment}/>
        ))}
    </Card>
        </div>
    )
}

export default EventPage;