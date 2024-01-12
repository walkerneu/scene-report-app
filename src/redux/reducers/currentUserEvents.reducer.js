const currentUserEvents = (state = [], action) => {
    switch (action.type) {
      case 'SET_CURRENT_USER_EVENTS':
        return action.payload;
      default:
        return state;
    }
  };

  export default currentUserEvents;