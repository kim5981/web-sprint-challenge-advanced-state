import * as types from "./action-types"
import axios from "axios";

// ❗ You don't need to add extra action creators to achieve MVP


export function moveClockwise(input) {
  return { type: types.MOVE_CLOCKWISE, payload: input }
 }

export function moveCounterClockwise(input) { 
  return { type: types.MOVE_COUNTERCLOCKWISE, payload: input }
}

export function selectAnswer(id) {
  return { type: types.SET_SELECTED_ANSWER, payload: id }
 }

export function setMessage(msg) { 
  return { type: types.SET_INFO_MESSAGE, payload: msg }
}

export function setQuiz(ask) {
  return { type: types.SET_QUIZ_INTO_STATE, payload: ask }
 }

export function inputChange(values) {
  return { type: types.INPUT_CHANGE, payload: values }
 }

export function resetForm() {
  return { type: types.RESET_FORM }
 }

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
    axios.get(`http://localhost:9000/api/quiz/next`)
      .then(res => {
        dispatch(setQuiz( res.data ))
      })
      .catch(err => {
        console.error(err)
      })
  }
}
export function postAnswer() {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  }
}
export function postQuiz() {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
