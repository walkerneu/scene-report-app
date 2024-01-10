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
        console.log("Here's the difference in months:", (eventTime.getMonth() - now.getMonth()))
        console.log("Here's the months:", eventTime.getMonth(), now.getMonth())
        if (Math.round(eventTime.getTime() - now.getTime()) >= 0){
            
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
