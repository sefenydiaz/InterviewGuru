import { useState } from 'react';
import { useInterviewContext } from '../utils/InterviewContext'


 const Questions = () => {
    const { updateQuestion, updateId, question, setQuestion, userResponse, setUserResponse } = useInterviewContext()

    // Define state to track the user's input
    const [inputValue, setInputValue] = useState('');

  // Function to handle user input
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Update the userResponse in the InterviewContext with the user's input
    setUserResponse(inputValue);

    // Clear the input field after submission
    setInputValue('');
  };


    return(
        <div>
            <h2> Question:</h2>
            <p>{question.text} </p>
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Your answer"
                />
                <button type="submit">Submit</button>
            </form>
            <p>Your Response: {userResponse} </p>
        </div>
    )

}

export default Questions
