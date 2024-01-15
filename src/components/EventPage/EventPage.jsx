import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActions, CardActionArea } from "@mui/material";
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
        attendanceFunction()
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
    let eventIdArray = [];
    userEvents.map((userEvent) => {
        eventIdArray.push(userEvent.id);
        console.log("user event id", userEvent.id)
    })
    const [attending, setAttending] = useState(eventIdArray.includes(Number(id)))
    const [commentText, setCommentText] = useState('');
    console.log("attending", attending)
    const attendanceFunction = () => {
      if(attending) {
        return (
        <>
        <Typography 
            sx={{ml: "8px"}}
            variant="body" 
            fontFamily="helsinki">
            You are attending this event!
        </Typography>
        <Button
        variant="outlined" color="secondary"
        onClick={removeEvent}
      >
        Remove from My Calendar
      </Button>
      </>
        )}
      else {
        return (
        <Button
          variant="outlined" color="secondary"
          onClick={attend}
        >
          Add to My Calendar
        </Button>
        )}
    }
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
    const removeEvent = () => {
        dispatch({
            type: "SAGA/REMOVE_EVENT",
            payload: {
                event: event.id,
                user: user.id}
        })
        setAttending(false);
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
    const goToGenre = (genreId) => {
        dispatch({
            type: 'SAGA/GET_SEARCH',
            payload: {
                query: '',
                genre: genreId,
                time: ''
            }
        })
        history.push('/searchResults')
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
                    sx={{mt: 3}}
                    variant="h6"
                    fontFamily="helsinki">
                    There are {attendees.length} people attending
                </Typography>
                <CardActionArea sx={{mt: 1}}>
                <Typography variant="h6" className="pointer" fontFamily="helsinki" onClick={goToAttendance}>
                Click here to see the list!
                </Typography>
                </CardActionArea>
                </>
            )
        }
        else if (attendees.length === 1){
            return (
                <>
                <Typography
                    sx={{mt: 3}}
                    variant="h6"
                    fontFamily="helsinki">
                    There is 1 person attending
                </Typography>
                <CardActionArea sx={{mt: 1}}>
                <Typography variant="h6" className="pointer" fontFamily="helsinki" onClick={goToAttendance}>
                Click here to see the list!
                </Typography>
                </CardActionArea>
                </>
            )
        }
        else {
            return (
                <Typography variant="h6" fontFamily="helsinki">
                    There is no one attending
                </Typography>
            )
        }
    }
    console.log("We got comments:", comments)
    return (
        <div>
    <Card
      sx={{ 
            width: 850, 
            fontFamily: "helsinki", 
            backgroundColor: "#2e2e2e", 
            color: "antiquewhite", 
            outline: "#e6855f solid 10px", 
            ml: 5 }}
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
        <Typography className='info-text' variant="h5" fontFamily="helsinki">
          Location:
        </Typography>
        <Typography variant="h5" fontFamily="helsinki">
        {event.venue}, {event.location}
        </Typography>
        <Typography className='info-text' variant="h5" fontFamily="helsinki">
          Time:
        </Typography>
        <Typography variant="h5" component="div" fontFamily="helsinki">
          {new Date(event.event_time).toLocaleString('en-us')}
          <p>There are {daysUntil} days until this event!</p>
        </Typography>
        <p>
        <CardActionArea>
        <Typography variant="h5" fontFamily="helsinki" className="pointer" onClick={goToCreator}>
        <span className='info-text'>Hosted by:</span> {host.username}
        </Typography>
        </CardActionArea>
        </p>
        <Typography className='info-text' variant="h5" fontFamily="helsinki">
          Description:
        </Typography>
        <Typography variant="h6" fontFamily="helsinki">
            <p>
          {event.description}
          </p>
        </Typography>
        <Typography sx={{mb: '5px'}}variant="h5" component="div" fontFamily="helsinki" className='genrebox' >
        <span className='info-text'>Genres:</span>
          {genres.map((genre) => (
            <CardActionArea sx={{pl: '12px', pr: '12px', mt: '5px'}} key={genre.id} className='genre-item'>
            <span
                onClick={() => goToGenre(genre.id)}
                >{genre.genre_name}</span>
            </CardActionArea>
          ))}
        </Typography>     
        {attendanceDisplay()}
      </CardContent>
      <CardActions>
      {attendanceFunction()}
        <Button
          variant="outlined" color="secondary"
          onClick={goBack}
        >
          BACK
        </Button>
        { user.id === event.creator_id ?
        <>
        <Button variant="outlined" color="secondary" onClick={goToEdit}>
          EDIT
        </Button>
        <Button variant="outlined" color="secondary" onClick={deleteEvent}>
          DELETE
        </Button>
        </>
        :
        ""
        }
      </CardActions>
    </Card>
    <Card sx={{
            width: 850, 
            backgroundColor: "#2e2e2e", 
            color: "antiquewhite", 
            outline: "#e6855f solid 10px", 
            ml: 5,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 8}}>
        <div className="comment-submit">
        <h3 className='comment-header'>Comments:</h3>
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
        <Button variant="outlined" color="secondary" onClick={addComment}>
          SUBMIT COMMENT
        </Button>
        </div>
        {comments && comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment}/>
        ))}
    </Card>
        </div>
    )
}

export default EventPage;