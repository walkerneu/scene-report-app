import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, CardActions } from "@mui/material";
import { useHistory, useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

function EditProfile() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio);
  const [socialMediaLink, setSocialMediaLink] = useState(user.social_media_link);
  const [profilePicture, setProfilePicture] = useState('')
  const profileForm = new FormData ();
  
  const cancelSubmission = () => {
    history.goBack();
  };
  const updateProfile = () => {
    if(profilePicture === ''){
        profileForm.append("profile_picture", user.profile_picture)
    }
    else {
        profileForm.append("image", profilePicture)
    }
    profileForm.append("username", username)
    profileForm.append("bio", bio)
    profileForm.append("social_media_link", socialMediaLink)
    dispatch({
      type: "SAGA/UPDATE_PROFILE",
      payload: profileForm
    });
    history.push(`/user/${user.id}`);
  };
  return (
    <Card
      sx={{ maxWidth: 600, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      data-testid="movieDetails"
      className="description-box"
    >
      <Typography gutterBottom variant="h4" component="div" mt={5}>
        Edit You Profile!
      </Typography>
      <p>
        <Typography gutterBottom variant="overline" display="block">
          Edit Username:
        </Typography>
        <TextField
          id="filled-multiline-flexible"
          label="username"
          placeholder="username"
          multiline
          maxRows={4}
          variant="filled"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </p>
      <p>
        <Typography gutterBottom variant="overline" display="block">
          Edit Bio:
        </Typography>
        <TextField
          id="filled-multiline-static"
          label="Your Bio"
          multiline
          rows={6}
          variant="filled"
          value={bio}
          onChange={(event) => setBio(event.target.value)}
        />
      </p>
      <p>
        <Typography gutterBottom variant="overline" display="block">
          Edit Social Media Link:
        </Typography>
        <TextField
          id="filled-multiline-static"
          label="Social Media Link"
          multiline
          rows={2}
          variant="filled"
          value={socialMediaLink}
          onChange={(event) => setSocialMediaLink(event.target.value)}
        />
      </p>
      <p>
      <Typography gutterBottom variant="overline" display="block">
        Upload New Profile Picture:
      </Typography>
      <TextField
            type="file" 
            className="form-control-file" 
            name="uploaded_file"
            onChange={(evt) => setProfilePicture(evt.target.files[0])} />
      </p>
      <CardActions>
        <Button variant="contained" color="success" onClick={updateProfile}>
          Submit
        </Button>
        <Button variant="outlined" color="error" onClick={cancelSubmission}>
          Cancel
        </Button>
      </CardActions>
    </Card>
  );
}

export default EditProfile;