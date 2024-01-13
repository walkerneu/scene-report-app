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
    <Card sx={{ 
            width: 1200, 
            display: "flex", 
            flexDirection: "row", 
            backgroundColor: "#2e2e2e", 
            color: "antiquewhite",
            outline: "#e6855f solid 3px",  
            justifyContent: "space-between",
            gap: 2
            }} 
        onClick={imgClick}>
      <CardActionArea>
        <div className="event-item">
        <img
          width={150}
          src={userEvent.event_photo_url}
          alt={userEvent.title}
        />
         <div>
        <p>
        {new Date(userEvent.event_time).toLocaleDateString('en-us')}
        </p>
        <body>{userEvent.title}</body>
        </div>
        </div>
      </CardActionArea>
    </Card>
    )
}

export default EventItem