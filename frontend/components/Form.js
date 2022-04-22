import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Form(props) {

  const { inputChange, form, postQuiz } = props

  const onChange = evt => {
    const { value, id } = evt.target
    inputChange(id, value); 
  }

  const onSubmit = evt => {
    evt.preventDefault()
    postQuiz(form)
  }

  const disabledBtnHandler = () => {
      if (
        form.newQuestion.trim().length > 0 &&
      form.newTrueAnswer.trim().length > 0 &&
      form.newFalseAnswer.trim().length > 0
      ) {
        return ""
      }
      return "disabled"
  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input 
        maxLength={50} 
        onChange={onChange}
        id="newQuestion" 
        placeholder="Enter question"
      />
      <input 
        maxLength={50}
        onChange={onChange} 
        id="newTrueAnswer" 
        placeholder="Enter true answer" 
      />
      <input
        maxLength={50}
        onChange={onChange}
        id="newFalseAnswer"
        placeholder="Enter false answer"
      />
      <button
        id="submitNewQuizBtn"
        disabled={ disabledBtnHandler() }
      >
      Submit new quiz
      </button>
    </form>
  )
}

export default connect(st => st, actionCreators)(Form)
