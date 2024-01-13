import { useHistory } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

function CommentItem ({comment}){
    const history = useHistory();
    const userClick = () => {
        history.push(`/user/${comment.user_id}`);
    }
    return (  
    <Card sx={{ maxWidth: 800 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom fontFamily="helsinki" variant="body" component="div" onClick={userClick}>
            {comment.username} posted at {new Date(comment.created_at).toLocaleString('en-us')}:
          </Typography>
          <Typography variant="h6" fontFamily="helsinki">
          <p>
          {comment.comment}
          </p>
        </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    )
}

export default CommentItem;