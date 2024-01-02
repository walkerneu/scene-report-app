import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import EventItem from '../EventItem/EventItem';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
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
