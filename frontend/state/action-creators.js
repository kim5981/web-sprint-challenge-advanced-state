import * as types from "./action-types"
import axios from "axios";

// ❗ You don't need to add extra action creators to achieve MVP


export function moveClockwise(value) {
  return { type: types.MOVE_CLOCKWISE, payload: value }
 }

export function moveCounterClockwise() { 
  return { type: types.MOVE_COUNTERCLOCKWISE }
}

export function selectAnswer(answer_id) {
  return { type: types.SET_SELECTED_ANSWER, payload: answer_id }
 }

export function setMessage(msg) { 
  return { type: types.SET_INFO_MESSAGE, payload: msg }
}

export function setQuiz(question) {
  return { type: types.SET_QUIZ_INTO_STATE, payload: question }
 }

export function inputChange(values) {
  return { type: types.INPUT_CHANGE, payload: values }
 }

export function resetForm() {
  return { type: types.RESET_FORM }
 }

// ❗ Async action creators
// First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
// On successful GET:
// - Dispatch an action to send the obtained quiz to its state

export function fetchQuiz() {
  return function (dispatch) {
    axios.get(`http://localhost:9000/api/quiz/next`)
      .then(res => {
        dispatch(setQuiz(res.data))
      })
      .catch(err => {
        dispatch(setMessage(err.res.data.message))
      })
  }
}


    export function postAnswer({ quiz_id, answer_id }) {
      return function (dispatch) {
        axios
          .post("http://localhost:9000/api/quiz/answer", { quiz_id, answer_id })
          .then(res => {
            dispatch(selectAnswer(null));
            dispatch(setMessage(res.data.message));
            dispatch(setQuiz(null));
            dispatch(fetchQuiz());
          })
          .catch((err) => {
            console.error(err)
          })
    }
  }


export function postQuiz({ question_text, true_answer_text, false_answer_text }) {
  return function (dispatch) {
    axios.post("http://localhost:9000/api/quiz/new", {
        question_text,
        true_answer_text,
        false_answer_text
    })
    .then(res => {
      dispatch(setMessage(`Congrats: "${res.data.question}" is a great question!`))
      dispatch(resetForm())
    })
    .catch( err => {
      console.error(err)
    })
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
