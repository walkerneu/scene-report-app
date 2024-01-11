import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActions, Box } from "@mui/material";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { center } from '@cloudinary/url-gen/qualifiers/textAlignment';

function UserProfile(){

    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        dispatch({
          type: "SAGA/GET_CURRENT_USER",
          payload: id
        })
      }, [id])
    const user = useSelector(store => store.user)
    const currentUser = useSelector((store) => store.currentUser);
    const goBack = () => {
        history.goBack();
      };
    const goToEdit = () => {
        history.push(`/user/edit/${id}`);
      };
      console.log("current user:", currentUser);
    return (
        <div>
    <Card
      sx={{ maxWidth: 850, display: 'flex', alignContent: "center" }}
      className="description-box"
    >
      <img
        src={currentUser && currentUser.profile_picture}
        alt={currentUser && currentUser.username}
        width={300}
      />
      
      <CardContent>
        <Typography gutterBottom variant="h3" component="div" fontFamily={"helsinki"}>
          {currentUser && currentUser.username}
        </Typography>
        <Typography variant="body">
          Bio:
        </Typography>
        <p>
        <Typography variant="body">
          {currentUser && currentUser.bio}
        </Typography>
        </p>
        <Typography gutterBottom variant="h6" component="div">
          <a href={currentUser && currentUser.social_media_link}>Social Media Link</a>
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={goBack}
          data-testid="toList"
        >
          BACK
        </Button>
        { currentUser && currentUser.id === user.id ?
        <>
        <Button size="small" color="primary" onClick={goToEdit}>
          EDIT
        </Button>
        </>
        :
        ""
        }
      </CardActions>
    </Card>
        </div>
    )
}

export default UserProfile;