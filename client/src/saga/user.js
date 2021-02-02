import axios from 'axios';
import { call, put, all, fork, takeLatest } from 'redux-saga/effects';
import { USER_SERVER } from '../Config';

import {
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
} from '../store/modules/user';

function signUpAPI(data) {
  return axios.post(`${USER_SERVER}/signup`, data);
}
function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.data);
    console.log(result);
    yield put({
      type: SIGN_UP_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.log('에러 :', err.response);
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data.error,
    });
  }
}

function loginAPI(data) {
  return axios.post(`${USER_SERVER}/login`, data);
}
function* login(action) {
  try {
    const result = yield call(loginAPI, action.data);
    console.log(result);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.log('에러 :', err.response);
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    });
  }
}
function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function* watchLogin() {
  yield takeLatest(LOG_IN_REQUEST, login);
}

export default function* userSaga() {
  yield all([fork(watchSignUp)]);
  yield all([fork(watchLogin)]);
}
