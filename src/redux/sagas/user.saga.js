import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/user', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: response.data });
    yield put({
      type: 'SAGA/GET_USER_EVENTS',
      payload: response.data.id
    })
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* getCurrentUser(action){
  try {
    const response = yield axios({
        method: "GET",
        url: `/api/user/id/${action.payload}`
    })
    yield put ({
        type: "SET_CURRENT_USER",
        payload: response.data[0]
    })
} catch (error) {
    console.log('Shoot dang, error in Saga get user by id', error)
}  
}
function* getCurrentHost(action){
  try {
    const response = yield axios({
        method: "GET",
        url: `/api/user/id/${action.payload}`
    })
    yield put ({
        type: "SET_HOST",
        payload: response.data[0]
    })
} catch (error) {
    console.log('Shoot dang, error in Saga get host', error)
}  
}

function* updateUserProfile(action){
  try {
    const headers = {
      'content-type': 'multipart/form-data'
    }
    const response = yield axios({
      method: "PUT",
      url: `/api/user/update`,
      data: action.payload
    })
    yield put ({
      type: 'FETCH_USER'
    })
  } catch (error) {
    console.log('Grum! The Saga updateUserProfile failed', error)
  }
}

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeLatest('SAGA/GET_CURRENT_USER', getCurrentUser);
  yield takeLatest('SAGA/UPDATE_PROFILE', updateUserProfile);
  yield takeLatest('SAGA/GET_HOST', getCurrentHost);
}

export default userSaga;
