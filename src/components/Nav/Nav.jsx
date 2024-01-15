import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector, useDispatch } from 'react-redux';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";

function Nav() {
  const user = useSelector((store) => store.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (num) => {
    setAnchorEl(null);
    if (num === 1) {
      history.push("/");
    } else if (num === 2) {
      history.push("/event/add");
    } else if (num === 3) {
      history.push("/search");
    } else if (num === 4) {
      dispatch({
        type: "SAGA/GET_ALL_EVENTS"
      });
      history.push("/searchResults");
    } else if (num === 5) {
      history.push("/about");
    } else if (num === 6) {
      history.push("/login");
    } else if (num === 7) {
      history.push(`/user/${user.id}`);
    } else if (num === 8) {
      dispatch({ type: 'LOGOUT' })
      history.push('/user')
    }
  };

  return (
    <div className="nav">
      <Box sx={{ display: "flex", backgroundColor: "#e6855f", width: "100%"  }}>
 
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="black"
            aria-label="menu"
            sx={{ mr: 2 }}
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={() => handleClose(1)}>Home</MenuItem>
            <MenuItem onClick={() => handleClose(3)}>Search</MenuItem>
            <MenuItem onClick={() => handleClose(4)}>Browse Events</MenuItem>
            <MenuItem onClick={() => handleClose(5)}>About</MenuItem>
            {/* If no user is logged in, show these links */}
             {!user.id && (
               // If there's no user, show login/registration links
               <div>
               <MenuItem onClick={() => handleClose(6)}>Login / Register</MenuItem>
              </div>
            )}
            {/* If a user is logged in, show these links */}
            {user.id && (
              <div>
              <MenuItem onClick={() => handleClose(2)}>Add an Event</MenuItem>
              <MenuItem onClick={() => handleClose(7)}>My Profile</MenuItem>
              <MenuItem onClick={() => handleClose(8)}>Logout</MenuItem>
              </div>
            )}
          </Menu>
          <Link to="/home">
          <div className='nav-box'>
          <Typography 
            variant="h4" 
            fontFamily="blockbuster"
            fontSize={50}
            color={'black'} 
            sx={{ ml: 5, mr: 5, mt: 4, mb: 4 }}>
            Scene Report
          </Typography>
          <Typography 
            variant="h6" 
            fontFamily="blockbuster"
            color={'black'}
            fontSize={30}
            sx={{ ml: 5, mr: 5 }}>
            Events from Your Community
          </Typography>
          </div>
          </Link>
        </Toolbar>
    
    </Box>
    </div>
  );
}

export default Nav;
