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
function* getCurrentEvent(action){
    try {
        const response = yield axios({
            method: "GET",
            url: `/api/event/id/${action.payload}`
        })
        yield put ({
            type: "SET_CURRENT_EVENT",
            payload: response.data
        })
    } catch (error) {
        console.log('Shoot dang, error in Saga get event by id', error)
    }
}

function* eventsSaga() {
    yield takeLatest('SAGA/GET_CREATED_EVENT', getCreatedEvent);
    yield takeLatest('SAGA/GET_CURRENT_EVENT', getCurrentEvent);
  }
  
  export default eventsSaga;