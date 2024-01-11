import { useHistory } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

function UserItem ({ attendee }){
    const history = useHistory();
    const imgClick = () => {
        history.push(`/user/${attendee.id}`);
    }
    return (  
    <Card sx={{ maxWidth: 183 }} onClick={imgClick}>
      <CardActionArea>
        <CardMedia
          component="img"
          image={attendee.profile_picture}
          alt={attendee.username}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {attendee.username}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    )
}

export default UserItem;