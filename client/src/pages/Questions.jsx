import { useState } from "react";
import { useInterviewContext } from "../utils/InterviewContext";
import { useMutation, gql } from "@apollo/client";
import { useGlobalData } from "../utils/GlobalDataContext";
import { useNavigate } from "react-router-dom";
import Auth from "../utils/auth";

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

const ADD_QUESTION_TO_USER = gql`
  mutation AddAnswer(
    $id: String!
    $answer: String!
    $userId: String!
    $questionId: String!
  ) {
    addAnswer(_id: $id, answer: $answer) {
      _id
      question
      answer
      industry
      role
      experience
    }
    addQuestionToUser(userId: $userId, questionId: $questionId) {
      _id
      name
      email
      password
      questions {
        _id
        question
        answer
        feedback
        industry
        role
        experience
      }
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

  const [addQuestionToUser, { data, loading, error }] =
    useMutation(ADD_QUESTION_TO_USER);

  // Function to handle user input
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Update the userResponse in the InterviewContext with the user's input
    setUserResponse(inputValue);

    const { data } = await addQuestionToUser({
      variables: {
        id: globalData._id,
        answer: inputValue,
        userId: Auth.getProfile().data._id,
        questionId: globalData._id,
      },
    });

    console.log(data);

    updateGlobalData(data.addAnswer);
    console.log(globalData);

    navigate("/feedback");
  };

  return (
    <div>
      <h2 data-test="question-header">Question:</h2>
      <p data-test="question-data" id="ai-prompt">
        {globalData.question}
      </p>
      <form onSubmit={handleSubmit}>
        <FormControl data-test="answer-form">
          <FormLabel>Answer:</FormLabel>
          <Input
            placeholder="Write your answer here..."
            onChange={handleInputChange}
            name="answer"
            value={inputValue}
          />
        </FormControl>
        <Button data-test="submit-button" type="submit" my={3}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Questions;
