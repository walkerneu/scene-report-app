import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function AddEventPage (){

  const [eventName, setEventName] = useState('');
  const [imgUpload, setImgUpload] = useState('');
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [eventBio, setEventBio] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [venue, setVenue] = useState('');
  const [cityState, setCityState] = useState('');
  const eventForm = new FormData ();
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch({
      type: "SAGA/GET_GENRES"
    })
  }, [])
  const genres = useSelector(store => store.genres)
  const currentEvent = useSelector(store => store.currentEvent)

  const addEvent = (event) => {
    event.preventDefault();
    eventForm.append("image", imgUpload);
    eventForm.append("eventName", eventName);
    eventForm.append("description", eventBio);
    eventForm.append("event_time", eventTime);
    eventForm.append("venue", venue);
    eventForm.append("location", cityState);
    eventForm.append("genre_id", selectedGenre);
    dispatch({
      type: 'SAGA/ADD_EVENT',
      payload: eventForm
    });
    setImgUpload('');
    setEventName('');
    setEventBio('');
    setEventTime('');
    setVenue('');
    setCityState('');
    setSelectedGenre('');
    history.push('/event/created');
  };

    return (
    <div>
    <p>Lets try to add an event!</p>
      <form className="formPanel" onSubmit={addEvent}>
      <div>
        <label>
          Event Name:
          <input
            type="text"
            name="eventname"
            value={eventName}
            required
            onChange={(event) => setEventName(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Event Image:
          <input
            type="file"
            name="event-image"
            onChange={(event) => setImgUpload(event.target.files[0])}
          />
        </label>
        </div>
        <div>
        <label>
          Event Time:
          <input
            type="datetime-local"
            name="eventtime"
            value={eventTime}
            required
            onChange={(event) => setEventTime(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Event Description:
          <input
            type="text"
            name="description"
            value={eventBio}
            onChange={(event) => setEventBio(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Venue:
          <input
            type="text"
            name="venue"
            value={venue}
            onChange={(event) => setVenue(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          City/State:
          <input
            type="text"
            name="citystate"
            value={cityState}
            required
            onChange={(event) => setCityState(event.target.value)}
          />
        </label>
      </div>
        <div>
        <label>
          Genre:
        <select multiple onChange={(event) => setSelectedGenre(event.target.value)}>
          {genres.map((genre) => (
            <option value={genre.id}>{genre.genre_name}</option>
          ))}
        </select>
        </label>
        </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Add Event" />
      </div>
    </form>
    </div>
    )
}

export default AddEventPage;