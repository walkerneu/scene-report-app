import {useSelector} from 'react-redux';
import EventItem from '../EventItem/EventItem';

function SearchResults() {
  const user = useSelector((store) => store.user);
  const searchResults = useSelector(store => store.searchResults);
  console.log("results:", searchResults)
  const now = new Date ();
  const msPerDay = 24 * 60 * 60 * 1000; 
  return (
    <div className="container">
      <h3>Events This Week:</h3>
      <section className="events">
      {searchResults.map(userEvent => {
        const eventTime = new Date (userEvent.event_time);
        if (Math.round((eventTime.getTime() - now.getTime()) / msPerDay) <= 7){    
          return (
          <EventItem key={userEvent.id} userEvent={userEvent} />
      )}
  })}
      </section>
      <h3>Events This Month:</h3>
      <section className="events">
      {searchResults.map(userEvent => {
        const eventTime = new Date (userEvent.event_time);
        if (Math.round((eventTime.getTime() - now.getTime()) / msPerDay) <= 30 && Math.round((eventTime.getTime() - now.getTime()) / msPerDay) > 7){    
          return (
          <EventItem key={userEvent.id} userEvent={userEvent} />
      )}
  })}
      </section>
      <h3>Future Events:</h3>
      <section className="events">
      {searchResults.map(userEvent => {
        const eventTime = new Date (userEvent.event_time);
        if (Math.round((eventTime.getTime() - now.getTime()) / msPerDay) > 30){    
          return (
          <EventItem key={userEvent.id} userEvent={userEvent} />
      )}
  })}
      </section>
    </div>
  );
}

export default SearchResults;