import { createContext, useContext, useState } from 'react';

//set up context
const InterviewContext = createContext();

export const useInterviewContext = () => useContext(InterviewContext)

export const InterviewProvider = (props) => {

  const [question, setQuestion] = useState()

  const updateId = (newId) => {
    setQuestion({...question, id: newId})
    
  }

  const updateQuestion = (newQuestion) => {
    setQuestion({...question, text: newQuestion})
  }

  const [userResponse, setUserResponse] = useState()



  return (
    <InterviewContext.Provider 
    value={{ updateQuestion, updateId, question, setQuestion, userResponse, setUserResponse}}  >
      {props.children}
      </InterviewContext.Provider>
  )
}

