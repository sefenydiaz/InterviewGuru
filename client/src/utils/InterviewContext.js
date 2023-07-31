import { createContext, useContext, useState } from 'react';

//set up context
const InterviewContext = createContext();

export const useInterviewContext = () => useContext(InterviewContext)

export const InterviewProvider = (props) => {
  const [questionId, setQuestionId] = useState()

  const updateId = (newId) => {
    setQuestionId(newId) 
    
  }
  return (
    <InterviewContext.Provider 
    value={{ questionId, updateId}}  >
      {props}
      </InterviewContext.Provider>
  )
}

