import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addNewEvent(action){
    try {
        const headers = {
            'content-type': 'multipart/form-data'
          }
        const response = yield axios({
            method: "POST",
            url: "/api/upload",
            headers: headers,
            data: action.payload.eventForm
        });
        yield action.payload.history.push(`/event/${response.data.id}`)
      } catch (error) {
        console.log('fetchAllGenres error:', error);
      }
}

function* uploadSaga() {
    yield takeLatest('SAGA/ADD_EVENT', addNewEvent);
  }
  
  export default uploadSaga;