import { useState } from "react";
import { useInterviewContext } from "../utils/InterviewContext";
import { useMutation, gql } from "@apollo/client";
import { useGlobalData } from "../utils/GlobalDataContext";
import { useNavigate } from "react-router-dom";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Select,
  Input,
  Button,
  Container,
} from "@chakra-ui/react";

const ADD_ANSWER = gql`
  mutation AddAnswer($id: String!, $answer: String!) {
    addAnswer(_id: $id, answer: $answer) {
      _id
      question
      industry
      role
      experience
      answer
    }
  }
`;

const Questions = () => {
  const {
    updateQuestion,
    updateId,
    question,
    setQuestion,
    userResponse,
    setUserResponse,
  } = useInterviewContext();

  const { globalData, updateGlobalData } = useGlobalData();
  const navigate = useNavigate();

  // Define state to track the user's input
  const [inputValue, setInputValue] = useState("");

  const [addAnswer] = useMutation(ADD_ANSWER);

  // Function to handle user input
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Update the userResponse in the InterviewContext with the user's input
    setUserResponse(inputValue);

    const { data } = await addAnswer({
      variables: {
        id: globalData._id,
        answer: inputValue,
      },
    });

    console.log(data);

    updateGlobalData(data.addAnswer);

    navigate("/feedback");
  };

  return (
    <div>
      <h2> Question:</h2>
      <p id="ai-prompt">{globalData.question}</p>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Answer:</FormLabel>
          <Input
            placeholder="Write your answer here..."
            onChange={handleInputChange}
            name="answer"
            value={inputValue}
          />
        </FormControl>
        <Button type="submit" my={3}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Questions;
