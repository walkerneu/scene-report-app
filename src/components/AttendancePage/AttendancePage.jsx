import {useSelector} from 'react-redux';
import UserItem from '../UserItem/UserItem';

function AttendancePage() {
  const user = useSelector((store) => store.user);
  const attendees = useSelector(store => store.eventAttendees)
  return (
    <div className="container">
      <h2>People Attending This Event:</h2>
      <section className="events">
      {attendees.map(attendee => (
        <UserItem key={attendee.id} attendee={attendee} />
      ))}
      </section>
    </div>
  );
}

export default AttendancePage;