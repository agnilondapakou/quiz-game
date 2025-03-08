import React, { useRef, useState } from 'react'
import './QuizComponent.css'
import { quizData } from '../../assets/data.js'

const QuizComponent = () => {

    let [index, setIndex] = useState(0);
    let [question, setQuestion] = useState(quizData[index]);
    let [lock, setLock] = useState(false);
    let [score, setScore] = useState(0);
    let [result, steResult] = useState(false);
    
    let option1 = useRef(null);
    let option2 = useRef(null);
    let option3 = useRef(null);
    let option4 = useRef(null);

    let options = [option1, option2, option3, option4];
    

    const checkAnswer = (e, answer) => {
        if (lock === false) {
            if (question.answer === answer) {
                e.target.classList.add("correct");
                setLock(true)
                setScore(score + 1)
            } else {
                e.target.classList.add("wrong")
                setLock(true) 
                options[question.answer - 1].current.classList.add("correct")
            }
        }
    }

    const nextQuestion = () => {
        if (lock == true) {
            if (index === quizData.length - 1) {
                steResult(true)
                return
            }
            setIndex(++index)
            setQuestion(quizData[index])
            setLock(false)
            options.map((option) => {
                option.current.classList.remove("correct")
                option.current.classList.remove("wrong")
            })
        }
    }

  return (
    <div className='container'>
        <h1>Quiz App</h1>
        <hr />
        { result ? <div>
            <h3>Score: {score} / 5</h3><br />
            <button onClick={()=>{window.location.reload()}}>Restart</button>
        </div> : <>
        <h2>{ index + 1 }. { question.question }</h2>
        <ul>
            <li ref={option1} onClick={(e)=>{checkAnswer(e,1)}}>{ question.option2 }</li>
            <li ref={option2} onClick={(e)=>{checkAnswer(e,2)}}>{ question.option1 }</li>
            <li ref={option3} onClick={(e)=>{checkAnswer(e,3)}}>{ question.option3 }</li>
            <li ref={option4} onClick={(e)=>{checkAnswer(e,4)}}>{ question.option4 }</li>
        </ul>
        <button onClick={nextQuestion}>Next</button>
        <div className="index">{index + 1} of { quizData.length } questions</div></> }
    </div>
  )
}

export default QuizComponent