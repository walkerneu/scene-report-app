import {useSelector} from 'react-redux';
import EventItem from '../EventItem/EventItem';

function SearchResults() {
  const user = useSelector((store) => store.user);
  const searchResults = useSelector(store => store.searchResults);
  return (
    <div className="container">
      <h2>Search Results:</h2>
      <section className="events">
      {searchResults.map(result => (
        <EventItem key={result.event_id} userEvent={result} />
      ))}
      </section>
      <LogOutButton className="btn" />
    </div>
  );
}

export default SearchResults;