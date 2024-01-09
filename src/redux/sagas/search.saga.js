import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getSearch(action){
    try {
        const response = yield axios({
            method: 'GET',
            url: `/api/search/?query=${action.payload.query}&genre=${action.payload.genre}`
        })
        yield put ({
            type: 'SET_SEARCH_RESULTS',
            payload: response.data
        })
    } catch (error) {
        console.log('Error in Saga GET search:', error);
    }
}

function* getAllEvents(){
    try {
        const response = yield axios({
            method: "GET",
            url: "/api/search/all"
        })
        yield put ({
            type: 'SET_SEARCH_RESULTS',
            payload: response.data
        })
    } catch (error) {
        console.log('Error in Saga GET all search:', error);
    }
}

function* searchSaga() {
    yield takeLatest('SAGA/GET_SEARCH', getSearch);
    yield takeLatest('SAGA/GET_ALL_EVENTS', getAllEvents);
  }
  
  export default searchSaga;