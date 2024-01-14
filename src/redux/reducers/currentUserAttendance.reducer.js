const currentUserAttendance = (state = [], action) => {
    switch (action.type) {
      case 'SET_CURRENT_USER_ATTENDANCE':
        return action.payload;
      default:
        return state;
    }
  };

  export default currentUserAttendance;