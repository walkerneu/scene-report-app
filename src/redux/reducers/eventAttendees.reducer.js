const eventAttendees = (state = [], action) => {
    switch (action.type) {
      case 'SET_ATTENDEES':
        return action.payload;
      default:
        return state;
    }
  };

  export default eventAttendees;