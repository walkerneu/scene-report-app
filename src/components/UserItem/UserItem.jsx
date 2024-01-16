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
    <Card sx={{ 
            maxWidth: 400,
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
          className="item-img"
          src={attendee.profile_picture}
          alt={attendee.username}
        />  
          <Typography gutterBottom variant="h5" component="div">
            {attendee.username}
          </Typography>
          </div>
      </CardActionArea>
    </Card>
    )
}

export default UserItem;