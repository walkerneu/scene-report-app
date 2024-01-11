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
    <Card sx={{ maxWidth: 450, display: "flex", flexDirection: "row", alignContent: "center" }} onClick={imgClick}>
      <CardActionArea>
        <img
          width={150}
          justifyContent="left"
          src={userEvent.event_photo_url}
          alt={userEvent.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" fontFamily={"helsinki"} justifyContent={"right"}>
            {userEvent.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    )
}

export default EventItem