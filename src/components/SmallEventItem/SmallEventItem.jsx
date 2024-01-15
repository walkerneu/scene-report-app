import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import { useHistory } from "react-router-dom";

function SmallEventItem({ userEvent }) {
  const history = useHistory();
  const goToEvent = (eventId) => {
    history.push(`/event/${eventId}`);
    };
  return (
    <Card
      sx={{
        maxWidth: 100,
        backgroundColor: "#2e2e2e",
        color: "antiquewhite",
        maxHeight: 200,
        margin: "10px",
        outline: "darkgrey solid 3px"
      }}
      onClick={() => goToEvent(userEvent.id)}
      className="pointer"
    >
      <CardActionArea>
        <div className="small-item">
        <img
          className="small-img"
          src={userEvent.event_photo_url}
          alt={userEvent.title}
        />
        <h4>{userEvent.title}</h4>
        </div>
      </CardActionArea>
    </Card>
  );
}

export default SmallEventItem;
