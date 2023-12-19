import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

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
function* attendEvent(action){
    try {
        const response = yield axios({
            method: "POST",
            url: `/api/event/attend/${action.payload}`
        })
    } catch (error) {
        console.log('Heckin heck, error in Saga attend event', error)
    }
}
function* getUsersEvents(action){
    try {
        const response = yield axios({
            method: "GET",
            url: `/api/event/user/${action.payload}`
        })
        yield put({
            type: 'SET_USER_EVENTS',
            payload: response.data
        })
    } catch (error) {
        console.log('Daggummit, error in Saga get user events', error)
    }
}

function* eventsSaga() {
    yield takeLatest('SAGA/GET_CURRENT_EVENT', getCurrentEvent);
    yield takeLatest('SAGA/ATTEND_EVENT', attendEvent);
    yield takeLatest('SAGA/GET_USER_EVENTS', getUsersEvents);
  }
  
  export default eventsSaga;