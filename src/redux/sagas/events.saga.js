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
            payload: response.data[0]
        })
        yield put ({
            type: "SAGA/GET_CURRENT_GENRES",
            payload: action.payload
        })
        yield put ({
            type: "SAGA/GET_ATTENDEES",
            payload: action.payload
        })
    } catch (error) {
        console.log('Shoot dang, error in Saga get event by id', error)
    }
}
function* attendEvent(action){
    try {
        const response = yield axios({
            method: "POST",
            url: `/api/event/attend/${action.payload.event}`
        })
        yield put ({
            type: "SAGA/GET_CURRENT_EVENT",
            payload: action.payload.event
        })
        yield put ({
            type: "SAGA/GET_USER_EVENTS",
            payload: action.payload.user
        })
    } catch (error) {
        console.log('Heckin heck, error in Saga attend event', error)
    }
}
function* deleteEvent(action){
    try {
        const response = yield axios({
            method: "DELETE",
            url: `/api/event/delete/${action.payload}`
        })
    } catch (error) {
        console.log('Gon git! Error in Saga delete event', error)
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

function* getCurrentUserEvents(action){
    try {
        const response = yield axios({
            method: "GET",
            url: `/api/event/user/all/${action.payload}`
        })
        yield put({
            type: 'SET_CURRENT_USER_EVENTS',
            payload: response.data
        })
    } catch (error) {
        console.log('Dog gawnit, error in Saga get current user events', error)
    }
}

function* editEvent(action){
    try {
        const headers = {
            'content-type': 'multipart/form-data'
          }
        const response = yield axios ({
            method: "PUT",
            url: `api/upload/edit/${action.payload.id}`,
            headers: headers,
            data: action.payload.data
        })
    } catch (error) {
        console.log('ARRGGHH, error in Saga edit event', error)
    }
}

function* getAttendees(action){
    try {
        const response = yield axios ({
            method: "GET",
            url: `api/event/attendees/${action.payload}`
        })
        yield put ({
            type: "SET_ATTENDEES",
            payload: response.data
        })
    } catch (error) {
        console.log('Flubber Toes! error in Saga get attendees', error)
    }
}

function* eventsSaga() {
    yield takeLatest('SAGA/GET_CURRENT_EVENT', getCurrentEvent);
    yield takeLatest('SAGA/ATTEND_EVENT', attendEvent);
    yield takeLatest('SAGA/GET_USER_EVENTS', getUsersEvents);
    yield takeLatest('SAGA/DELETE_EVENT', deleteEvent);
    yield takeLatest('SAGA/EDIT_EVENT', editEvent);
    yield takeLatest('SAGA/GET_ATTENDEES', getAttendees);
    yield takeLatest('SAGA/GET_CURRENT_USER_EVENTS', getCurrentUserEvents);
  }
  
  export default eventsSaga;