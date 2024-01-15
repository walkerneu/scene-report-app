import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';
import EventItem from '../EventItem/EventItem';

function SearchResults() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "SAGA/GET_GENRES" })
  }, []);
  const user = useSelector((store) => store.user);
  const searchResults = useSelector(store => store.searchResults);
  const currentQuery = useSelector(store => store.currentQuery);
  const genres = useSelector(store => store.genres);
  console.log("results:", searchResults)
  const now = new Date ();
  const msPerDay = 24 * 60 * 60 * 1000;
  console.log("Current Query is:", currentQuery)
  const queryDisplay = () => {
    return (
        <>
        <h2>
            Showing results 
            {currentQuery.query !== '' ?
                <span> matching "{currentQuery.query}"</span>
            :
            ''}
            {genres.map((genre) => {
                if (genre.id === currentQuery.genre){
                    return (
                        <span key={genre.id}> tagged as {genre.genre_name}</span>
                    )
                }
            })}
            {currentQuery.time !== '' ?
                <span> occuring on {currentQuery.time}</span>
            :
            ''}
        </h2>
        </>
    )
  }
  return (
    <div className="container">
      {queryDisplay()}
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