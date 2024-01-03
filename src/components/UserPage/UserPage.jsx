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
  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <section className="events">
      {userEvents.map(userEvent => (
        <EventItem key={userEvent.event_id} userEvent={userEvent} />
      ))}
      </section>
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
