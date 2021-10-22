import React, { useState } from 'react'
import { questions } from './mock'
// {
//     questionText: 'What is the capital of France?',
//     answerOptions: [
//         { answerText: 'New York', isCorrect: false },
//         { answerText: 'London', isCorrect: false },
//         { answerText: 'Paris', isCorrect: true },
//         { answerText: 'Dublin', isCorrect: false },
//     ],
// }

export const Quiz = () => {
    console.log(questions,"questions")
    const [currentQuestions,setCurrentQuestions]=useState(0);
    const [showanswers,setshowanswers]=useState(false);
    const [score,setscore]=useState(0)
    const handleanswers=(isCorrect)=>{
        if(isCorrect){
            setscore(score+1)
        }
        console.log(isCorrect,"iscorrect")
        const nextquestion=currentQuestions+1;
        if(nextquestion<questions.length){
            setCurrentQuestions(nextquestion)
        }else{
            setshowanswers(true)
        }
    }
    return (

        <div>
            {showanswers?
           <div className='score-section'>
           You scored {score} out of {questions.length}
       </div>
       :
       <>
       <div className='question-section'>
       <div className='question-count'>
                <h1>For questions</h1>
                <span>Question {currentQuestions + 1}</span>/{questions.length}
            </div>
            <div className='question-text'>{questions[currentQuestions].questionText}</div>
            <div className='answer-section'>
                {questions[currentQuestions].answerOptions.map(ansuers=>{
               return <button onClick={()=>handleanswers(ansuers.isCorrect)}>{ansuers.answerText}</button>
                })}
            </div>
            </div>
            </>
                }
            
        </div>
    )
}
