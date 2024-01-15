import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';
import EventItem from '../EventItem/EventItem';
import FilterBar from '../FilterBar/FilterBar';

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
    if (searchResults.length === 0){
        return (
            <>
        <h2>
            No results 
            {currentQuery.query !== '' ?
                <span> matching "{currentQuery.query}"</span>
            :
            ''}
            {genres.map((genre) => {
                if (genre.id === currentQuery.genre){
                    return (
                        <span key={genre.id}> tagged as "{genre.genre_name}"</span>
                    )
                }
            })}
            {currentQuery.time !== null ?
                <span> occuring on {currentQuery.time}</span>
            :
            ''}
        </h2>
        </>
        )
    }
    else {
    return (
        <>
        <h2>
            Showing all events 
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
            {currentQuery.time !== null ?
                <span> occuring on {currentQuery.time}</span>
            :
            ''}
        </h2>
        <FilterBar />
        </>
    )
    }
  }
  return (
    <div className="container">
      {queryDisplay()}
      { searchResults.length === 0 ?
      ""
      :
      <>
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
      </>
    }
    </div>
  );
}

export default SearchResults;