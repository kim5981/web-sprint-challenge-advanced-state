import React, { useEffect } from 'react'
import { connect } from "react-redux";

import * as actions from "../state/action-creators";


export function Quiz(props) {
  const { quiz, fetchQuiz, selectedAnswer, selectAnswer, postAnswer } = props;

  useEffect( () => {
    fetchQuiz()
   }, []);

  const selectHandler = (answer_id) => {
    selectAnswer(answer_id)
  } 

  const onSubmit = evt => {
    evt.preventDefault()
    postAnswer(
      {
        quiz_id: quiz.quiz_id,
        answer_id: selectedAnswer,
      }
    );
  }

  return (
    <div id="wrapper">
      { quiz ? (
          <>
            <h2>{ quiz.question }</h2>

            <div id="quizAnswers">


              <div className={ `${ 
                selectedAnswer === quiz.answers[0].answer_id
                ? "selected answer"
                : "answer" 
                }`}
              >

                { quiz.answers[0].text }

                <button onClick={ () => selectHandler(quiz.answers[0].answer_id) }>
                  { selectedAnswer === quiz.answers[0].answer_id 
                  ? "SELECTED" 
                  : "Select" }
                </button>
              </div>

            
              <div className={ `${ 
                selectedAnswer === quiz.answers[1].answer_id
                ? "selected answer"
                : "answer" 
                }`}
              >
              
                { quiz.answers[1].text }

                <button onClick={ () => selectHandler(quiz.answers[1].answer_id) }>
                  { selectedAnswer === quiz.answers[1].answer_id 
                  ? "SELECTED" 
                  : "Select" }
                </button>
              </div>
            </div>

            <button 
              id="submitAnswerBtn"
              disabled={ !selectedAnswer }
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


export default connect(s => s, actions)(Quiz);
