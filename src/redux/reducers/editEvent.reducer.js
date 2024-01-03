const editEvent = (state = {}, action) => {
    if (action.type === 'SET_EVENT_TO_EDIT') {
      return action.payload
    } else if (action.type === 'EDIT_EVENT') {
        const editedProperty = action.payload.property
        const newValue = action.payload.newValue
        return {...state, [editedProperty]: newValue}
      }
    return state;
}

export default editEvent;