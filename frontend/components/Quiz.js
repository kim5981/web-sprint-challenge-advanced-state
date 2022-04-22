import React, { useEffect } from 'react'
import { connect } from "react-redux";

import * as actions from "../state/action-creators";
import { fetchQuiz, selectAnswer } from '../state/action-creators';

export function Quiz(props) {
  const { quiz, fetchQuiz, selectedAnswer, selectAnswer, postAnswer } = props;

  const selectHandler = id => {
    selectAnswer(id)
  } 

  // get data from api on load
  useEffect( () => {
    fetchQuiz()
  }, []);


  const onSubmit = evt => {
    evt.preventDefault()
    postAnswer()
  }

  return (
    <div id="wrapper">
      { quiz ? (
          <>
            <h2>{ quiz.question }</h2>

            <div id="quizAnswers">
              <div className={ `answer ${ selectedAnswer === quiz.answers[0]
                ? "selected"
                : null }`}
              >
                { quiz.answers[0].text }
                <button>
                { selectedAnswer === quiz.answers[0].answer_id ? "SELECTED" : "Select" }
                </button>
              </div>

              <div className="answer">
                An elephant
                <button>
                  Select
                </button>
              </div>
            </div>

            <button 
              id="submitAnswerBtn"
              disabled={ !selectAnswer }
              onClick={ onSubmit }
            >
            Submit answer
            </button>
          </>
        ) 
        : 'Loading next quiz...'
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    quiz: state.quiz
  }
}

export default connect(mapStateToProps, { fetchQuiz })(Quiz);
