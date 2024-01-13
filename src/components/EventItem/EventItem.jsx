import { useHistory } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

function EventItem ({ userEvent }){
    const history = useHistory();
    const imgClick = () => {
        history.push(`/event/${userEvent.id}`);
    }
    return (  
    <Card sx={{ width: 1200, display: "flex", flexDirection: "row", backgroundColor: "#2e2e2e"}} onClick={imgClick}>
      <CardActionArea>
        <div className="event-item">
        <img
          width={150}
          justifyContent="left"
          src={userEvent.event_photo_url}
          alt={userEvent.title}
        />
        <body>{userEvent.title}</body>
        </div>
      </CardActionArea>
    </Card>
    )
}

export default EventItem