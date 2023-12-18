import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getCreatedEvent(){
    try {
        const response = yield axios({
            method: "GET",
            url: `/api/event/created`
        })
        yield put ({
            type: "SET_CURRENT_EVENT",
            payload: response.data
        })
    } catch (error) {
        console.log('Aw man, error in Saga get created event', error)
    }
}

function* eventsSaga() {
    yield takeLatest('SAGA/GET_CREATED_EVENT', getCreatedEvent);
  }
  
  export default eventsSaga;