import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import EventItem from '../EventItem/EventItem';
import { useEffect } from 'react';
import { useHistory } from "react-router-dom";

function UserPage() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch({
      type: "SAGA/GET_USER_EVENTS",
      payload: user.id
    })
  }, [])
  const userEvents = useSelector(store => store.userEvents);
  const now = new Date ();
  const msPerDay = 24 * 60 * 60 * 1000;
  const goToSearch = () => {
    dispatch({
      type: "SAGA/GET_ALL_EVENTS"
    });
    history.push("/searchResults");
  }

  const homeDisplay = () => {
    if (userEvents && userEvents.length === 0){
      return (
        <>
        <h3>You don't have any events on your calendar!</h3>
        <h3 onClick={goToSearch} className='pointer test'>Click here to discover events!</h3>
        </>
      )
    }
    else {
      return (
        <>
        <h3>Your Events This Week:</h3>
      <section className="events">
      {userEvents.map(userEvent => {
        const eventTime = new Date (userEvent.event_time);
        if (Math.round((eventTime.getTime() - now.getTime()) / msPerDay) <= 7){    
          return (
          <EventItem key={userEvent.id} userEvent={userEvent} />
      )}
  })}
      </section>
      <h3>Your Events This Month:</h3>
      <section className="events">
      {userEvents.map(userEvent => {
        const eventTime = new Date (userEvent.event_time);
        if (Math.round((eventTime.getTime() - now.getTime()) / msPerDay) <= 30 && Math.round((eventTime.getTime() - now.getTime()) / msPerDay) > 7){    
          return (
          <EventItem key={userEvent.id} userEvent={userEvent} />
      )}
  })}
      </section>
      <h3>Your Future Events:</h3>
      <section className="events">
      {userEvents.map(userEvent => {
        const eventTime = new Date (userEvent.event_time);
        if (Math.round((eventTime.getTime() - now.getTime()) / msPerDay) > 30){    
          return (
          <EventItem key={userEvent.id} userEvent={userEvent} />
      )}
  })}
      </section>
        </>
      )
    }
  }
  
  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      {homeDisplay()}
    </div>
  );
}

export default UserPage;
