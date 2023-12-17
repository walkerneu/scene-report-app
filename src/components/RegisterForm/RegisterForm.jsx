import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [socialMedia, setSocialMedia] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      {/* <div>
        <label htmlFor="bio">
          Add a Bio *Not Required*:
          <input
            type="text"
            name="bio"
            value={bio}
            onChange={(event) => setBio(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="social-media">
          Add a Link to a Social Media account *Not Required*:
          <input
            type="text"
            name="social-media"
            value={socialMedia}
            onChange={(event) => setSocialMedia(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="profile-picture">
          Upload a Profile Picture *Not Required*:
          <input
            type="file"
            name="profile-picture"
            onChange={(event) => setProfilePicture(event.target.files[0])}
          />
        </label>
      </div> */}
      <div>
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
    </form>
  );
}

export default RegisterForm;
