import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import SmallEventItem from "../SmallEventItem/SmallEventItem";

function UserProfile() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch({
      type: "SAGA/GET_CURRENT_USER",
      payload: id,
    });
  }, [id]);
  const user = useSelector((store) => store.user);
  const currentUser = useSelector((store) => store.currentUser);
  const userEvents = useSelector((store) => store.currentUserEvents);
  const userAttendance = useSelector((store) => store.currentUserAttendance);
  const now = new Date();
  const goBack = () => {
    history.goBack();
  };
  const goToEdit = () => {
    history.push(`/user/edit/${id}`);
  };
  return (
    <div>
      {currentUser && currentUser.id === user.id ? (
        <>
          <Button
            sx={{ml: 5}}
            variant="outlined" color="secondary" onClick={goToEdit}>
            Would you like to edit your profile?
          </Button>
        </>
      ) : (
        ""
      )}
      <Button
        sx={{ml: 5}}
        variant="outlined"
        color="secondary"
        onClick={goBack}
      >
        BACK
      </Button>
      <Card
        sx={{
          maxWidth: 850,
          display: "flex",
          fontFamily: "helsinki",
          backgroundColor: "#2e2e2e",
          color: "antiquewhite",
          outline: "#e6855f solid 10px",
          ml: 5,
          mt: 4,
        }}
      >
        <img
          className="profile-pic"
          src={currentUser && currentUser.profile_picture}
          alt={currentUser && currentUser.username}
         
        />

        <CardContent>
          <Typography
            gutterBottom
            variant="h3"
            component="div"
            fontFamily={"helsinki"}
          >
            {currentUser && currentUser.username}
          </Typography>
          <Typography className='info-text' variant="h6">Bio:</Typography>
          <p>
            <Typography variant="h5">
              {currentUser && currentUser.bio}
            </Typography>
          </p>
          <Typography gutterBottom variant="h6" component="div">
            <a
              className="test"
              href={currentUser && currentUser.social_media_link}
            >
              Social Media Link
            </a>
          </Typography>
        </CardContent>
      </Card>
      {userEvents.length > 0 ? (
        <>
          <h3 className="profile-text">
            {currentUser && currentUser.username} is hosting these upcoming
            events:
          </h3>
          <Card
            sx={{
              maxWidth: 850,
              display: "flex",
              flexFlow: "wrap",
              gap: 2,
              backgroundColor: "#2e2e2e",
              color: "antiquewhite",
              outline: "#e6855f solid 10px",
              ml: 5,
            }}
          >
            {userEvents.map((userEvent) => {
              const eventTime = new Date(userEvent.event_time);
              if (eventTime.getTime() > now.getTime()) {
                return (
                  <SmallEventItem key={userEvent.id} userEvent={userEvent} />
                );
              }
            })}
          </Card>
        </>
      ) : (
        ""
      )}
      {userAttendance.length > 0 ? (
        <>
          <h3 className="profile-text">
            {currentUser && currentUser.username} is attending these upcoming
            events:
          </h3>
          <Card
            sx={{
              maxWidth: 850,
              display: "flex",
              flexFlow: "wrap",
              gap: 2,
              backgroundColor: "#2e2e2e",
              color: "antiquewhite",
              outline: "#e6855f solid 10px",
              ml: 5,
            }}
          >
            {userAttendance.map((userEvent) => {
              return (
                <SmallEventItem key={userEvent.id} userEvent={userEvent} />
              );
            })}
          </Card>
        </>
      ) : (
        ""
      )}
      {userEvents.length > 0 ? (
        <>
          <h3 className="profile-text">
            {currentUser && currentUser.username} hosted these past events:
          </h3>
          <Card
            sx={{
              maxWidth: 850,
              display: "flex",
              flexFlow: "wrap",
              gap: 2,
              backgroundColor: "#2e2e2e",
              color: "antiquewhite",
              outline: "#e6855f solid 10px",
              ml: 5,
            }}
          >
            {userEvents.map((userEvent) => {
              const eventTime = new Date(userEvent.event_time);
              if (eventTime.getTime() < now.getTime()) {
                return (
                  <SmallEventItem key={userEvent.id} userEvent={userEvent} />
                );
              }
            })}
          </Card>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default UserProfile;
