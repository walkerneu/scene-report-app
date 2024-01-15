import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getAllGenres(){
    try {
        const response = yield axios.get('/api/genres/all');
        yield put({
          type: 'SET_GENRES',
          payload: response.data
        });
      } catch (error) {
        console.log('getAllGenres error:', error);
      }
}

function* getGenresByEventId(action){
    try {
        const response = yield axios({
            method: 'GET',
            url: `/api/genres/event/${action.payload}`
        })
        yield put ({
            type: 'SET_CURRENT_GENRES',
            payload: response.data
        })
    } catch (error) {
        console.log('error in Saga GET genres by ID', error)
    }
}

function* addGenreTags(action){
    
}

function* genresSaga() {
    yield takeLatest('SAGA/GET_GENRES', getAllGenres);
    yield takeLatest('SAGA/GET_CURRENT_GENRES', getGenresByEventId)
  }
  
  export default genresSaga;