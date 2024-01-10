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
      <h2>Search Results:</h2>
      <section className="events">
      {searchResults.map(result => {
          const eventTime = new Date (result.event_time);
          if (Math.round((eventTime.getTime() - now.getTime()) / msPerDay) >= 0){
          return (
            <EventItem key={result.id} userEvent={result} />
        )}      
    })}
      </section>
    </div>
  );
}

export default SearchResults;