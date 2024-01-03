const createdId = (state = '', action) => {
    switch (action.type) {
      case 'SET_CREATED_ID':
        return action.payload;
      default:
        return state;
    }
  };

  export default createdId;