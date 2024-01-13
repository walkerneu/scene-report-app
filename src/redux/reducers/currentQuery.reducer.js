const currentQuery = (state = {query: '', genre: ''}, action) => {
    switch (action.type) {
      case 'SET_CURRENT_QUERY':
        return action.payload;
      default:
        return state;
    }
  };

  export default currentQuery;