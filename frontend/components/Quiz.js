import React, { useEffect } from 'react'
import { connect } from "react-redux";

import { fetchQuiz, selectAnswer, postAnswer } from "../state/action-creators";


function Quiz(props) {
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
    postAnswer({
      quiz_id: quiz.quiz_id,
      answer_id: selectedAnswer,
    })
  }

  return (
    <div id="wrapper">
      { quiz ? (
          <>
            <h2>{ quiz.question }</h2>

            <div id="quizAnswers">

              { /*answer 1*/}
              <div className={ `${ selectedAnswer === quiz.answers[0].answer_id
                ? "selected answer"
                : "answer" }`}
              >
                { quiz.answers[0].text }
                <button onClick={ () => selectHandler(quiz.answers[0].answer_id) }>
                { selectedAnswer === quiz.answers[0].answer_id 
                ? "SELECTED" 
                : "Select" }
                </button>
              </div>

              { /*answer 2*/}
              <div className={ `${ selectedAnswer === quiz.answers[1].answer_id
                ? "selected answer"
                : "answer" }`}>
              
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
    quiz: state.quiz,
    selectedAnswer: state.selectedAnswer
  }
}

export default connect(mapStateToProps, { fetchQuiz, selectAnswer, postAnswer })(Quiz);
