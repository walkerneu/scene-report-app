const currentGenres = (state = [], action) => {
    switch (action.type) {
      case 'SET_CURRENT_GENRES':
        return action.payload;
      default:
        return state;
    }
  };

  export default currentGenres;