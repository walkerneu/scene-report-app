const currentHost = (state = {}, action) => {
    switch (action.type) {
      case 'SET_HOST':
        return action.payload;
      default:
        return state;
    }
  };

  export default currentHost;