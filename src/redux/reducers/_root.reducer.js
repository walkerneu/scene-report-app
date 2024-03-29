import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import genres from './genres.reducer';
import currentEvent from './currentEvent.reducer';
import userEvents from './userEvents.reducer';
import currentGenres from './currentGenres.reducer';
import searchResults from './searchResults';
import currentUser from './currentUser.reducer';
import eventAttendees from './eventAttendees.reducer';
import currentHost from './currentHost.reducer'
import currentUserEvents from './currentUserEvents.reducer';
import eventComments from './eventComments.reducer';
import currentQuery from './currentQuery.reducer';
import currentUserAttendance from './currentUserAttendance.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  genres,
  currentEvent,
  userEvents,
  currentGenres,
  searchResults,
  currentUser,
  eventAttendees,
  currentHost,
  currentUserEvents,
  eventComments,
  currentQuery,
  currentUserAttendance,

});

export default rootReducer;
