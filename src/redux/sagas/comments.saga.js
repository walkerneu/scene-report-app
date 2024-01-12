import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addComment(action){
    try {
        const response = yield axios({
            method: "POST",
            url: `/api/comments`,
            data: {
                event: action.payload.event,
                comment: action.payload.comment}
        })
        yield put({
            type: "SAGA/GET_COMMENTS",
            payload: action.payload.event
        })
    } catch (error) {
        console.log("Error in Saga add comment", error);
    }
}
function* getComments(action){
    try {
        const response = yield axios({
            method: "GET",
            url: `api/comments/all/${action.payload}`
        })
        yield put({
            type: "SET_COMMENTS",
            payload: response.data
        })
    } catch (error) {
        console.log("Error in Saga get comments", error);
    }
}


function* commentsSaga() {
   yield takeLatest ('SAGA/ADD_COMMENT', addComment);
   yield takeLatest ('SAGA/GET_COMMENTS', getComments);
  }
  
  export default commentsSaga;