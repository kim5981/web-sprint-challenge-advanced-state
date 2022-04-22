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
    dispatch(setQuiz(false));
    axios.get(`http://localhost:9000/api/quiz/next`)
      .then(res => {
        dispatch(setQuiz(res.data))
      })
      .catch(err => {
        dispatch(setMessage(err.res.data.message))
      })
  }
}


    export function postAnswer(quiz_id, answer_id) {
      return function (dispatch) {
        axios
          .post("http://localhost:9000/api/quiz/answer", { quiz_id, answer_id })
          .then((res) => {
            dispatch({ type: types.SET_SELECTED_ANSWER, payload: null });
            dispatch(setMessage(res.data.message));
            dispatch(fetchQuiz());
          })
          .catch((err) => {
            dispatch(setMessage(err.response.data.message));
          })
    }
  }


export function postQuiz(question, correct, incorrect) {
  return function (dispatch) {
    axios.post("http://localhost:9000/api/quiz/new", {
      question_text: question,
        true_answer_text: correct,
        false_answer_text: incorrect,
    })
    .then(res => {
      dispatch(setMessage(`Question: ${res.data.question}`))
      dispatch(resetForm()) // invoke w/i dispatch
    })
    .catch( err => {
      console.error(err)
      dispatch(setMessage(err.response.data.message))
    })
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
