import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActions, Box } from "@mui/material";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { center } from '@cloudinary/url-gen/qualifiers/textAlignment';

function UserProfile(){

    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        dispatch({
          type: "SAGA/GET_CURRENT_USER",
          payload: id
        })
      }, [id])
    const user = useSelector(store => store.user)
    const currentUser = useSelector((store) => store.currentUser);
    const userEvents = useSelector(store => store.currentUserEvents);
    const userAttendance = useSelector(store => store.currentUserAttendance);
    const now = new Date ();
    const goBack = () => {
        history.goBack();
      };
    const goToEdit = () => {
        history.push(`/user/edit/${id}`);
      };
      console.log("current user events:", userEvents);
    const goToEvent = (eventId) => {
        history.push(`/event/${eventId}`)
    }
    console.log("attendance:", userAttendance);
    return (
        <div>
        <Button
          size="small"
          color="primary"
          onClick={goBack}
          data-testid="toList"
        >
          BACK
        </Button>
        { currentUser && currentUser.id === user.id ?
        <>
        <Button size="small" color="primary" onClick={goToEdit}>
          Would you like to edit your profile?
        </Button>
        </>
        :
        ""
        }
    <Card
      sx={{ maxWidth: 850, display: 'flex', backgroundColor: "#2e2e2e", color: "antiquewhite"}}
      className="description-box"
    >
      <img
        src={currentUser && currentUser.profile_picture}
        alt={currentUser && currentUser.username}
        width={300}
      />
      
      <CardContent>
        <Typography gutterBottom variant="h3" component="div" fontFamily={"helsinki"}>
          {currentUser && currentUser.username}
        </Typography>
        <Typography variant="body">
          Bio:
        </Typography>
        <p>
        <Typography variant="body">
          {currentUser && currentUser.bio}
        </Typography>
        </p>
        <Typography gutterBottom variant="h6" component="div">
          <a href={currentUser && currentUser.social_media_link}>Social Media Link</a>
        </Typography>
      </CardContent>
    </Card>
    { userEvents.length > 0 ?
    <>
    <h3>{currentUser && currentUser.username} is hosting these upcoming events:</h3>
    <Card
      sx={{ maxWidth: 850, display: 'flex', flexFlow: "wrap", gap: 2, backgroundColor: "#2e2e2e", color: "antiquewhite"}}
    >
        {userEvents.map(userEvent => {
            const eventTime = new Date (userEvent.event_time);
            if (eventTime.getTime() > now.getTime()){
                return (
                    <Card sx={{maxWidth: 100, backgroundColor: "#2e2e2e", color: "antiquewhite"}} onClick={() => goToEvent(userEvent.id)} className="pointer">
                    <img
                    src={userEvent.event_photo_url}
                    alt={userEvent.title}
                    width={300}
                    />
                    <h4>{userEvent.title}</h4>
                    </Card>
                )
            }
        })}
    </Card>
    </>
    :
    ""
    }
    { userAttendance.length > 0 ?
    <>
    <h3>{currentUser && currentUser.username} is attending these upcoming events:</h3>
    <Card
      sx={{ maxWidth: 850, display: 'flex', flexFlow: "wrap", gap: 2, backgroundColor: "#2e2e2e", color: "antiquewhite"}}
    >
        {userAttendance.map(userEvent => {
                return (
                    <Card sx={{maxWidth: 100, backgroundColor: "#2e2e2e", color: "antiquewhite"}} onClick={() => goToEvent(userEvent.id)} className="pointer">
                    <img
                    src={userEvent.event_photo_url}
                    alt={userEvent.title}
                    width={300}
                    />
                    <h4>{userEvent.title}</h4>
                    </Card>
                )
        })}
    </Card>
    </>
    :
    ""
    }
    { userEvents.length > 0 ?
    <>
    <h3>{currentUser && currentUser.username} hosted these past events:</h3>
    <Card
      sx={{ maxWidth: 850, display: 'flex', flexFlow: "wrap", gap: 2, backgroundColor: "#2e2e2e", color: "antiquewhite"}}
    >
        {userEvents.map(userEvent => {
            const eventTime = new Date (userEvent.event_time);
            if (eventTime.getTime() < now.getTime()){
                return (
                    <Card sx={{maxWidth: 100, backgroundColor: "#2e2e2e", color: "antiquewhite"}} onClick={() => goToEvent(userEvent.id)} className="pointer">
                    <img
                    src={userEvent.event_photo_url}
                    alt={userEvent.title}
                    width={300}
                    />
                    <h4>{userEvent.title}</h4>
                    </Card>
                )
            }
        })}
    </Card>
    </>
    :
    ""
    }
    </div>
    )
}

export default UserProfile;