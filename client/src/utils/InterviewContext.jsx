import { createContext, useContext, useState } from 'react';

//set up context
const InterviewContext = createContext();

export const useInterviewContext = () => useContext(InterviewContext)


/*
export const InterviewProvider = (props) => {

  const [question, setQuestion] = useState('')
  const [userResponse, setUserResponse] = useState('')

  const updateId = (newId) => {
    setQuestion({...question, id: newId})
    
  }

  const updateQuestion = (newQuestion) => {
    setQuestion({...question, text: newQuestion})
  }

  
  */

  const initialState = {
    id: null,
    text: '',
  }

  export const InterviewProvider = ({ children }) => {
    const [question, setQuestion] = useState(initialState);
    const [userResponse, setUserResponse] = useState('');
  
    const updateId = (newId) => {
      setQuestion((prevQuestion) => ({ ...prevQuestion, id: newId }));
    };
  
    const updateQuestion = (newQuestion) => {
      setQuestion((prevQuestion) => ({ ...prevQuestion, text: newQuestion }));
    };

//use reducer to keep values simple
//actions for each update

  return (
    <InterviewContext.Provider 
    value={{ updateQuestion, updateId, question, setQuestion, userResponse, setUserResponse}}  >
      {children}
      </InterviewContext.Provider>
  )
}

