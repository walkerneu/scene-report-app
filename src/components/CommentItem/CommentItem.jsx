import { useHistory} from "react-router-dom";
import { useSelector, useDispatch  } from "react-redux";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Button } from '@mui/material';

function CommentItem ({comment}){
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(store => store.user)
    const userClick = () => {
        history.push(`/user/${comment.user_id}`);
    }
    const deleteComment = () => {
        dispatch({
            type: "SAGA/DELETE_COMMENT",
            payload: comment.id
        })
    }
    return (  
    <Card sx={{ 
            maxWidth: 800, 
            backgroundColor: "#2e2e2e", 
            color: "antiquewhite", 
            outline: "#e6855f solid 5px",
            ml: 3,
            mb: 2}}>
        <CardContent>
        <div className="comment-item-top">
        <CardActionArea>
          <Typography gutterBottom fontFamily="helsinki" variant="body" component="div" onClick={userClick}>
            {comment.username} posted at {new Date(comment.created_at).toLocaleString('en-us')}:
          </Typography>
          </CardActionArea>
          { user.id === comment.user_id ?
            <>
            <Button 
                variant="outlined" 
                color="secondary"
                size="small"
                onClick={deleteComment}>
            DELETE
            </Button>
            </>
            :
            ""
            }
            </div>
          <Typography variant="h6" fontFamily="helsinki">
          <p>
          {comment.comment}
          </p>
        </Typography>
        </CardContent>
    </Card>
    )
}

export default CommentItem;