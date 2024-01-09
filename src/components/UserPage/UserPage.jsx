import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import EventItem from '../EventItem/EventItem';
import { useEffect } from 'react';

function UserPage() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: "SAGA/GET_USER_EVENTS",
      payload: user.id
    })
  }, [])
  const userEvents = useSelector(store => store.userEvents);
  const now = new Date ();
  const msPerDay = 24 * 60 * 60 * 1000; 
  
  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <section className="events">
      {userEvents.map(userEvent => {
        const eventTime = new Date (userEvent.event_time);
        if (Math.round((eventTime.getTime() - now.getTime()) / msPerDay) >= 0){
        return (
        <EventItem key={userEvent.id} userEvent={userEvent} />
      )}
  })}
      </section>
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
