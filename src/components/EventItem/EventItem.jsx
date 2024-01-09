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
    <Card sx={{ maxWidth: 183 }} onClick={imgClick}>
      <CardActionArea>
        <CardMedia
          component="img"
          className="movie-media"
          image={userEvent.event_photo_url}
          alt={userEvent.title}
          data-testid="toDetails"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {userEvent.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    )
}

export default EventItem